import { IOrderStatusVM } from "../../Interfaces/Order/OrderStatus.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class OrderStatusVM extends ResponseMessages {
    Items: IOrderStatusVM[];

    constructor() {
        super();
        this.Items = [];
    }
}
