import {ShopItem} from "./ShopItem";


export const DATA_URL = "http://localhost:4000";

export class DataService {

    async getData(): Promise<ShopItem[]> {
        let responsePromise: Promise<Response> = fetch(`${DATA_URL}/items`);
        let response: Response = await responsePromise;

        let jsonPromise: Promise<any> = response.json();

        let data = await jsonPromise as ShopItem[];

        return data;
    }

    async getItem(id: number): Promise<ShopItem> {
        let responsePromise: Promise<Response> = fetch(`${DATA_URL}/items/${id}`);

        return await (await responsePromise).json() as ShopItem;
    }

}

export const DataServiceInstance = new DataService();
