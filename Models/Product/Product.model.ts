import { IProduct } from "../../Interfaces/Product/product";
import { ResponseMessages } from "../ResponseMessages.model";

export class Products extends ResponseMessages {
    Items: IProduct[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }

    addProduct(product: IProduct) {
        this.Items.push(product);
    }
}