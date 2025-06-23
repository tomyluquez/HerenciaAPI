import DiscountCoupon from "../../Database/Models/DiscountCoupon.model";
import PaymentMethod from "../../Database/Models/PaymentMethod.model";
import ShippingMethod from "../../Database/Models/ShippingMethod.model";
import { Errors } from "../../Enums/Errors.enum";
import { Success } from "../../Enums/SuccessEnum";
import { mapPaymentMethodsDBToVM } from "../../Helpers/Map/PaymentMethodsMap";
import { mapShippingMethodsDBToVM } from "../../Helpers/Map/ShippingMethodMap";
import { CheckoutInfoVM } from "../../Models/Checkout/Checkout.model";
import { DiscountCouponVM } from "../../Models/DiscountCoupon.model";

export const getCheckoutInfoRepository = async (): Promise<CheckoutInfoVM> => {
    const response = new CheckoutInfoVM();

    const paymentsMethods = await PaymentMethod.findAll();
    const shippingsMethods = await ShippingMethod.findAll();

    response.PaymentsMethods = paymentsMethods.map(mapPaymentMethodsDBToVM);
    response.ShippingMethods = shippingsMethods.map(mapShippingMethodsDBToVM);

    return response;
};

export const findDiscountCouponRepository = async (couponName: string): Promise<DiscountCouponVM> => {
    const response = new DiscountCouponVM();

    const coupon = await DiscountCoupon.findOne({ where: { Name: couponName, IsActive: true } });

    if (coupon) {
        response.Discount = coupon.Discount;
        response.DiscountCouponId = coupon.Id;
        response.setSuccess(Success.DiscountCouponFound);
    } else {
        response.setError(Errors.DiscountCouponNotFound)
    }

    return response;
};
