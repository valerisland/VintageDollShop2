import React, {useEffect, useState} from "react";
import {ShopItem} from "./ShopItem";
import {DataServiceInstance} from "./DataService";
import {CartItem, cartItemFromShopItem} from "./CartItem";
import "./CartItemComponent.scss";
import {Button, Card, Col, Row} from "react-bootstrap";
import {cartService} from "./CartService";



// Входные данные компоненты элемента корзины
interface CartItemComponentProps {
    // Элемент корзины
    cartItem: CartItem;
}

// Состояние компоненты
interface CartItemComponentState {
    // Товар
    item: ShopItem | null;
}



// Компонента элемента корзины
export function CartItemComponent(props: CartItemComponentProps) {

    let [state, changeState] = useState<CartItemComponentState>({
        item: null
    });

    useEffect(() => {
        DataServiceInstance.getItem(props.cartItem.id).then(value => {
            changeState({
                item: value
            });
        });
    }, []);


    return (
        <Card className="cart-item">
            <Row>
                <Col xs={4}>
                    <img  src={state.item?.imageSrc}/>
                </Col>
                <Col xs={8}>
                    <Card.Body>
                        <Card.Title>{state.item?.title}</Card.Title>
                        <Card.Text>
                            <div style={{marginTop: 40}}>
                                Quantity: <b>{props.cartItem.quantity}</b>
                            </div>
                            <div style={{marginTop: 16}}>
                                {
                                // То же самое что
                                // let itemPrice = 0;
                                // if (state.item != null) {
                                //     itemPrice = props.cartItem.quantity * state.item.price;
                                // }
                                //
                                // Price: ${itemPrice}
                                }

                                Price: <b>${props.cartItem.quantity * (state.item?.price ?? 0)}</b>
                            </div>

                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}
