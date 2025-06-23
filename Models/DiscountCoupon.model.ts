import { ResponseMessages } from "./ResponseMessages.model";

export class DiscountCouponVM extends ResponseMessages {
    Discount?: number;
    DiscountCouponId?: number;

    constructor() {
        super();
        this.Discount = 0;
        this.DiscountCouponId = 0;
    }
}
