import { IDiscountCoupon } from "../../Interfaces/DiscountCoupon.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class DiscountCouponPagedListVM extends ResponseMessages {
    Items: IDiscountCoupon[];
    TotalItems: number;
    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0
    }
}