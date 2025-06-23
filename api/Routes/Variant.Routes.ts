import { Router } from "express";
import { getFilteringOptionsProductStock, getProductVariants, getProductsStock, updateStock } from "../Controllers/Variant.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth-Middlewares";
import { UserRoleEnum } from "../../Enums/UserRoleEnum";

const router: Router = Router();

router.get("/getProductVariants", getProductVariants);
router.get("/getProductsStock", getProductsStock);
router.get("/getFilteringOptionsProductStock", getFilteringOptionsProductStock);
router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin]));
router.put("/updateStock", updateStock);

export { router as RouterVariants };
