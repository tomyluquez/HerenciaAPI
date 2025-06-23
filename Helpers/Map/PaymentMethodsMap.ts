import PaymentMethod from "../../Database/Models/PaymentMethod.model";
import { IPaymentsMethodsVM } from "../../Interfaces/PaymentMethods.interface";

export const mapPaymentMethodsDBToVM = (payments: PaymentMethod): IPaymentsMethodsVM => {
    return {
        Id: payments.Id,
        Name: payments.Name,
        Disccount: payments.Discount
    };
};