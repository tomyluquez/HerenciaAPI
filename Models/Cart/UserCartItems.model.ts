import { ICartItemsVM } from "../../Interfaces/Cart/CartItems.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class UserCartItemsVM extends ResponseMessages {
    Items: ICartItemsVM[];
    TotalItems: number;
    CartId: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
        this.CartId = 0;
    }

    addItems(items: ICartItemsVM[]) {
        this.Items = items;
        this.TotalItems = items.length;
    }
}
