import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {ShopItem} from "./ShopItem";
import "./SingleItemComponent.scss";
import {DataServiceInstance} from "./DataService";
import {useParams} from "react-router-dom";
import {cartService} from "./CartService";
import {cartItemFromShopItem} from "./CartItem";

// Состояние компоненты "Страница товара"
interface SingleItemComponentState {
    item: ShopItem | null;
}

/**
 * Страница товара
 */
export function SingleItemComponent() {
    // itemId из URL-адреса. Пример /item/1, itemId == 1
    let {itemId} = useParams();

    let [state, changeState] = useState<SingleItemComponentState>({item: null});

    useEffect(() => {
        // Один раз загружаем информацию о товаре
        if (itemId) {
            DataServiceInstance.getItem(+itemId).then(value => {
                changeState({
                    item: value
                });
            });
        }
    }, []);

    let item = state.item;

    /**
     * Функция обработки добавления в корзину
     */
    function addToCart() {
        if (item != null) {
            cartService.addCartItem(cartItemFromShopItem(item));
        }
    }

    /**
     * Отрисовка элемента
     * @param item
     */
    function renderItem(item: ShopItem | null) {
        if (!item) {
            return (<div></div>);
        }

        return (
            <Container>
                <Row>
                    <Col>
                        <img className={"item-image"} src={item.imageSrc}/>
                    </Col>
                    <Col>
                        <h1>{item.title}</h1>
                        <p>{item.brief}</p>
                        <span><b>${item.price}</b></span> <Button onClick={() => addToCart()} variant={"success"}>Add to cart</Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return renderItem(item);
}
