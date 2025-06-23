import { ResponseMessages } from "../ResponseMessages.model";

export class SaveOrderResponse extends ResponseMessages {
    OrderNumber: number = 0;
    CustomerName: string = "";
    CustomerEmail: string = "";

    constructor() {
        super();
    }
}