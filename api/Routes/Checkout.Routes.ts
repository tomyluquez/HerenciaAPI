import { Router } from "express";
import { findDiscountCoupon, getCheckoutInfo } from "../Controllers/Checkout.Controller";

const router: Router = Router();

router.get("/", getCheckoutInfo).get("/DiscountCoupon", findDiscountCoupon);

export { router as RouterCheckout };
