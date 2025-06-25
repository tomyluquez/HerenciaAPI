import { IPaymentsMethodsVM } from "../../Interfaces/PaymentMethods.interface";
import { IShippingMethodsVM } from "../../Interfaces/ShippingMethods.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class CheckoutInfoVM extends ResponseMessages {
    PaymentsMethods: IPaymentsMethodsVM[];
    ShippingMethods: IShippingMethodsVM[];
    SubtotalToPaid: number;
    MinTotalToFreeShipping: number;

    constructor() {
        super();
        this.PaymentsMethods = [];
        this.ShippingMethods = [];
        this.SubtotalToPaid = 0;
        this.MinTotalToFreeShipping = 0;
    }

    setMinTotalToFreeShipping(total: number) {
        this.MinTotalToFreeShipping = total;
    }

    setSubtotalToPaid(total: number) {
        this.SubtotalToPaid = total;
    }

    setShippingMethods(shippingMethods: IShippingMethodsVM[]) {
        this.ShippingMethods = shippingMethods;
    }

    setPaymentsMethods(paymentsMethods: IPaymentsMethodsVM[]) {
        this.PaymentsMethods = paymentsMethods;
    }
}
