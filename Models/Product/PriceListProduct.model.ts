import { IPriceListProducts } from "../../Interfaces/Product/PriceListProduct.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class PriceListProductsVM extends ResponseMessages {
    Items: IPriceListProducts[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
}
