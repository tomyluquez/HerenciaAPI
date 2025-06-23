import { Request, Response } from "express";
import { findDiscountCouponService, getCheckoutInfoService } from "../Services/Checkout.Service";
import { CheckoutInfoVM } from "../../Models/Checkout/Checkout.model";
import { Errors } from "../../Enums/Errors.enum";
import { DiscountCouponVM } from "../../Models/DiscountCoupon.model";

export const getCheckoutInfo = async (req: Request, res: Response): Promise<void> => {
    try {

        const response = await getCheckoutInfoService();
        res.status(200).json(response);
    } catch (error: any) {
        const response = new CheckoutInfoVM();
        response.setError(error.message || Errors.CheckoutInfo);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const findDiscountCoupon = async (req: Request, res: Response): Promise<void> => {
    const { couponName } = req.query;
    try {
        if (!couponName) {
            throw new Error(Errors.NameRequired);
        }
        const response = await findDiscountCouponService(String(couponName));
        res.status(200).json(response);
    } catch (error: any) {
        const response = new DiscountCouponVM();
        response.setError(error.message || Errors.CheckoutInfo);
        res.status(error.message ? 400 : 500).send(response);
    }

}
