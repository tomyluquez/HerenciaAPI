import { Router } from "express";
import { getCompanyInfo, getConfig, getMenu, saveCompanyInfo, saveConfigInfo } from "../Controllers/Config.Controller"
import { authenticate, authorizeRole } from "../Middlewares/Auth-Middlewares";
import { UserRoleEnum } from "../../Enums/UserRoleEnum";

const router = Router();

router.get("/companyInfo", getCompanyInfo).get("/menuInfo", getMenu);

router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin]));

router.post("/companyInfo", saveCompanyInfo).post("/configInfo", saveConfigInfo).get("/getConfig", getConfig);

export { router as RouterConfig };
