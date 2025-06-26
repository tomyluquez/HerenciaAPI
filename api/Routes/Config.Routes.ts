import { Router } from "express";
import { getCompanyInfo, getConfig, getDiscountCoupons, getMenu, saveCompanyInfo, saveConfigInfo, saveCoupon } from "../Controllers/Config.Controller"
import { authenticate, authorizeRole } from "../Middlewares/Auth-Middlewares";
import { UserRoleEnum } from "../../Enums/UserRoleEnum";

const router = Router();

router.get("/companyInfo", getCompanyInfo).get("/menuInfo", getMenu);

router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin]));

router.post("/companyInfo", saveCompanyInfo).post("/saveConfig", saveConfigInfo).get("/getConfig", getConfig).post("/saveCoupon", saveCoupon)
    .get("/getDiscountCoupons", getDiscountCoupons);

export { router as RouterConfig };
