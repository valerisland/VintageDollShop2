/**
 * Модель данных товара магазина.
 */
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

    constructor(id: number, title: string, price: number, imageSrc: string, brief: string) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageSrc = imageSrc;
        this.brief = brief;
    }
}
