import { IOrderDetailVM } from "../../Interfaces/Order/OrderDetail.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class OrderDetailVM extends ResponseMessages {
    Items: IOrderDetailVM;

    constructor() {
        super();
        this.Items = {} as IOrderDetailVM;
    }

}