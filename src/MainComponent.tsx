import React, {useEffect, useState} from 'react';
import {ShopItem} from "./ShopItem";
import {Col, Container, Row} from "react-bootstrap";
import {ListItemComponent} from "./ListItemComponent";
import {DataServiceInstance} from "./DataService";

/**
 * Состояние компоненты главная страница
 */
interface MainComponentState {
    items: ShopItem[];
}

/**
 * Главная страница
 */
export function MainComponent() {
    let [state, changeState] = useState<MainComponentState>({items: []});

    useEffect(() => {
        // Один раз загружаем все товары
        DataServiceInstance.getData().then(value => {
            changeState({
                items: value
            });
        });
    }, []);

    let items = state.items;

    return (
      <Container>
          <Row>
              {
                  items.map((item: ShopItem) => {
                      return (
                          <Col key={item.id}>
                              <ListItemComponent item={item}/>
                          </Col>
                      )
                  })
              }
          </Row>
      </Container>
    );
}
