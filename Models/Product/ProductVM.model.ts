import { IProductVM } from "../../Interfaces/Product/Product.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class ProductVM extends ResponseMessages {
    Items: IProductVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }

    addProduct(product: IProductVM) {
        this.Items.push(product);
    }
}
