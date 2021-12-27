import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {ShopItem} from "./ShopItem";
import "./SingleItemComponent.scss";
import {DataServiceInstance} from "./DataService";
import {Link, useParams} from "react-router-dom";
import {cartService} from "./CartService";
import {cartItemFromShopItem} from "./CartItem";
import {CheckboxDescription, Description, ImageDescription, TextDescription} from "./Descriptions";
import {CommentItem} from "./CommentItem";
import {faArrowLeft, faGlobeAmericas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Состояние компоненты "Страница товара"
interface SingleItemComponentState {
    item: ShopItem | null;
    comments: CommentItem[];
}

/**
 * Страница товара
 */
export function SingleItemComponent() {
    // itemId из URL-адреса. Пример /item/1, itemId == 1
    let {itemId} = useParams();

    let textAreaRef = useRef<HTMLTextAreaElement>(null);

    let [state, changeState] = useState<SingleItemComponentState>({
        item: null,
        comments: []
    });

    useEffect(() => {
        // Один раз загружаем информацию о товаре
        if (itemId) {
            let itemPromise = DataServiceInstance.getItem(+itemId);

            let commentsPromise = DataServiceInstance.getAllComments(+itemId);

            Promise.all([itemPromise, commentsPromise]).then(([item, comments]) => {
                changeState({
                    item: item,
                    comments: comments
                })
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

    function renderText(desc: TextDescription) {
        return (
          <p>{desc.text}</p>
        );
    }


    function renderImage(desc: ImageDescription) {
        return (
          <img className="description-image" src={desc.imageSrc}/>
        );
    }

    function renderCheckbox(desc: CheckboxDescription) {
        return (
            <div>
                <Form>
                    {
                        desc.variant.map(checkBox => {
                            return (
                                <Form.Check name={desc.name} type={"checkbox"} label={checkBox}/>
                            )
                        })
                    }
                </Form>
            </div>
        );
    }

    function renderDescriptions(descriptions: Description[]) {
        if (!descriptions) {
            return (<div></div>);
        }

        return descriptions.map((description: Description) => {
            if (description.type === "text") {
                return renderText(description as TextDescription);
            } else if (description.type === "image") {
                return renderImage(description as ImageDescription);
            } else if (description.type === "checkbox") {
                return renderCheckbox(description as CheckboxDescription);
            }
        });
    }

    async function submitComment() {
        let current: HTMLTextAreaElement | null = textAreaRef.current;

        if (!current) {
            return;
        }

        let textContent = current.value;

        if (!textContent) {
            return;
        }

        let itemId = state.item?.id;

        if (!itemId) {
            return;
        }

        await DataServiceInstance.submitComment(itemId, textContent);

        current.value = "";

        state.comments.push({
            text: textContent,
            shopItemId: 0
        });

        changeState({
            ...state,
            comments: state.comments
        });
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
                    <Col style={{marginTop:24}}>
                        <Link className={"backLink"} to={"/"}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Back to Dolls
                        </Link>
                        <p><img className={"item-image"} src={item.imageSrc}/></p>
                    </Col>
                    <Col style={{marginTop:56}}>
                        <h2 style={{marginBottom: 48}}>{item.title}</h2>
                        <p><b>Condition: </b>{item.condition_text}</p>
                        <p><b>Year: </b> {item.year}</p>
                        <p><b>Seller location: </b>{item.sellerLocation}</p>
                        <b>Description </b>
                        <p style={{marginBottom:36}}>{item.brief}</p>

                        <span><b style={{fontSize:24}}>${item.price}</b></span> <Button style={{marginLeft: 16}} onClick={() => addToCart()} variant="custom">Add to cart</Button> <Link style={{marginLeft: 16}} to={"/cart"}>Go to Cart</Link>
                    </Col>
                </Row>

            </Container>
        );
    }

    return renderItem(item);
}
