import DiscountCoupon from "../../Database/Models/DiscountCoupon.model";
import PaymentMethod from "../../Database/Models/PaymentMethod.model";
import ShippingMethod from "../../Database/Models/ShippingMethod.model";
import { ConfigEnum } from "../../Enums/ConfigEnum";
import { Errors } from "../../Enums/Errors.enum";
import { Success } from "../../Enums/SuccessEnum";
import { mapPaymentMethodsDBToVM } from "../../Helpers/Map/PaymentMethodsMap";
import { mapShippingMethodsDBToVM } from "../../Helpers/Map/ShippingMethodMap";
import { CheckoutInfoVM } from "../../Models/Checkout/Checkout.model";
import { DiscountCouponVM } from "../../Models/DiscountCoupon.model";
import { getFreeShippinhFromConfigRepository } from "./Config.Repository";

export const getCheckoutInfoRepository = async (): Promise<CheckoutInfoVM> => {
    const response = new CheckoutInfoVM();

    const paymentsMethods = await PaymentMethod.findAll();
    const shippingsMethods = await ShippingMethod.findAll();
    const freeShipping = await getFreeShippinhFromConfigRepository(ConfigEnum.FREE_DELIVERY_ID);

    response.setMinTotalToFreeShipping(Number(freeShipping.Value));
    response.setPaymentsMethods(paymentsMethods.map(mapPaymentMethodsDBToVM));
    response.setShippingMethods(shippingsMethods.map(mapShippingMethodsDBToVM));

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
