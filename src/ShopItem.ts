/**
 * Модель данных товара магазина.
 */
import {Description} from "./Descriptions";

export enum ItemCondition {
    newInBox = "New In Box",
    usedNoBox = "Used No Box",
    dollOnly = "Doll only"
}

export class ShopItem {
    /**
     * Идентификатор товара.
     */
    public id: number;

    /**
     * Название товара.
     */
    public title: string;

    /**
     * Цена товара.
     */
    public price: number;

    /**
     * Адрес изображения.
     */
    public imageSrc: string;

    /**
     * Короткое описание.
     */
    public brief: string;

    public year: string;

    public sellerLocation: string;

    public condition_text: string;

    /**
     * Цвет.
     */
    public condition: ItemCondition;

    /**
     * Полное описание.
     */
    public description: Description[];

    constructor(
        id: number,
        title: string,
        price: number,
        imageSrc: string,
        brief: string,
        year: string,
        sellerLocation: string,
        description: Description[],
        condition: ItemCondition,
        condition_text: string
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageSrc = imageSrc;
        this.brief = brief;
        this.year = year;
        this.sellerLocation = sellerLocation;
        this.description = description;
        this.condition = condition;
        this.condition_text = condition_text;
    }
}
