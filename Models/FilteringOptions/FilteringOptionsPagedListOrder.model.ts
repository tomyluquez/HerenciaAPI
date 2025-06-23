import { OrderStatusEnum } from "../../Enums/OrderStatusEnum";
import { NameAndId } from "../../Interfaces/NameAndId.interface";
import { OrderStatusOptions } from "../Options/OrderStatusOptions.model";
import { ResponseMessages } from "../ResponseMessages.model";

export class FilteringOptionsOrderPagedListVM extends ResponseMessages {
    Status: NameAndId[];
    OnlyOptions: boolean;

    constructor(onlyOptions: boolean) {
        super();
        this.Status = new OrderStatusOptions().items;
        this.OnlyOptions = onlyOptions;

        if (this.OnlyOptions) {
            this.Status = this.Status.filter(x => x.Id !== OrderStatusEnum.All);
        }
    }
}