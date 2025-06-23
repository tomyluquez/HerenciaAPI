import { IOrderVM } from "../../Interfaces/Order/OrderVM.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class OrderVM extends ResponseMessages {
    Items: IOrderVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
    setTotalItems(totalItems: number) {
        this.TotalItems = totalItems;
    }
}
