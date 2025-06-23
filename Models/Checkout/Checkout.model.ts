import { IPaymentsMethodsVM } from "../../Interfaces/PaymentMethods.interface";
import { IShippingMethodsVM } from "../../Interfaces/ShippingMethods.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class CheckoutInfoVM extends ResponseMessages {
    PaymentsMethods: IPaymentsMethodsVM[];
    ShippingMethods: IShippingMethodsVM[];
    SubtotalToPaid: number;

    constructor() {
        super();
        this.PaymentsMethods = [];
        this.ShippingMethods = [];
        this.SubtotalToPaid = 0;
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
