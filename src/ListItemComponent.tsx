import React from 'react';
import {ShopItem} from "./ShopItem";
import {Button, Card} from "react-bootstrap";
import "./ListItemComponent.scss";
import {Link} from "react-router-dom";
import {cartService} from "./CartService";
import {cartItemFromShopItem} from "./CartItem";
import {faOpencart} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faGlobe,
    faGlobeAmericas,
    faGlobeEurope,
    faLocationArrow,
    faSearchLocation
} from "@fortawesome/free-solid-svg-icons";

/**
 * Входные параметры компоненты "элемент списка на главной странице"
 */
interface ListItemComponentProps {
    // Товар
    item: ShopItem;
}

/**
 * Элемент списка товаров на главной странице
 * @param props Входные параметры.
 */
export function ListItemComponent(props: ListItemComponentProps) {
    let item = props.item;

    // Функция для обработки нажатия на кнопку "добавить в корзину"
    function addToCart(item: ShopItem) {
        cartService.addCartItem(cartItemFromShopItem(item));
    }

    return (
        <Card className={"list-item"} style={{ width: '18rem', borderColor: "white"}}>
            <Card.Img  src={item.imageSrc} className="card-image"/>
            <Card.Body className="card-body">
                <Card.Title>
                    <Link className="item-name" to={"/item/" + item.id}>
                        {item.title}
                    </Link>
                </Card.Title>
                <Card.Text style={{marginBottom: 5}}>
                    Condition: {item.condition_text}
                </Card.Text>
                <Card.Text style={{marginBottom: 5}}>
                    Year: {item.year}
                </Card.Text>
                <Card.Text>
                    <FontAwesomeIcon icon={faGlobeAmericas} />  {item.sellerLocation}
                </Card.Text>
                <div><b style={{fontSize: '24px'}}>${item.price} <b style={{marginLeft: 90}} className="add-to-cart"><Button onClick={() => addToCart(item)} variant="custom">Add to cart</Button></b></b></div>


            </Card.Body>
        </Card>
    );
}
