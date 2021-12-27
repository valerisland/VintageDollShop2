import React, {useEffect, useState} from 'react';
import {ItemCondition, ShopItem} from "./ShopItem";
import {Col, Container, Form, Row} from "react-bootstrap";
import {ListItemComponent} from "./ListItemComponent";
import {DataServiceInstance} from "./DataService";
import "./MainComponent.scss";

/**
 * Состояние компоненты главная страница
 */
interface MainComponentState {
    items: ShopItem[];
    condition: string | null;
}

/**
 * Главная страница
 */
export function MainComponent() {
    let [state, changeState] = useState<MainComponentState>({
        items: [],
        condition: null
    });

    useEffect(() => {
        // Один раз загружаем все товары
        DataServiceInstance.getData(state.condition).then(value => {
            changeState({
                items: value,
                condition: state.condition
            });
        });
    }, [state.condition]);

    function onConditionInputChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let value: string = event.target.value;

        changeState({
            ...state,
            condition: value
        });
    }

    let items = state.items;

    return (
      <Container>
          <Row>
              <h2 style={{marginTop: 24}}>Dolls</h2>
          </Row>
          <Row>
              <Col xs={3}>
                  <Form.Select style={{marginBottom: 20, marginTop: 24}} defaultValue={""} className="condition-select" onChange={event => onConditionInputChange(event)}>
                      {
                          Object.keys(ItemCondition).map(condition => {
                            // @ts-ignore
                            let humanReadable = ItemCondition[condition]

                            return (
                                <option key={condition} value={condition}>
                                    {humanReadable}
                                </option>
                            );
                          })
                      }
                      <option value="">All</option>
                  </Form.Select>
              </Col>
          </Row>

          <Row>
              {
                  items.map((item: ShopItem) => {
                      return (
                          <Col xs={3} key={item.id}>
                              <ListItemComponent item={item}/>
                          </Col>
                      )
                  })
              }
          </Row>
      </Container>
    );
}
