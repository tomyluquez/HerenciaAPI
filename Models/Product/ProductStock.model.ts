import { IProductsStock } from "../../Interfaces/Product/ProductStock.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class ProductStockVM extends ResponseMessages {
    Items: IProductsStock[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }

    addItems(items: IProductsStock[]) {
        this.Items = items;
        this.TotalItems = items.length;
    }

    setTotalItems(totalItems: number) {
        this.TotalItems = totalItems;
    }

    getTotalItems() {
        return this.TotalItems;
    }
}
