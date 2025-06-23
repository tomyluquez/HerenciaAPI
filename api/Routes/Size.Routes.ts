import { Router } from "express";
import { authenticate, authorizeRole } from "../Middlewares/Auth-Middlewares";
import { UserRoleEnum } from "../../Enums/UserRoleEnum";
import { getFilteringOptionsSizeList, getSizeById, getSizesList, saveSize } from "../Controllers/Size.Controller";
import { changeStatus } from "../Controllers/Category.controller";

const router = Router();

router.get("/sizeList", getSizesList).get("/size", getSizeById).get("/getFilteringOptionsSizeList", getFilteringOptionsSizeList)

router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin]));

router.put("/changeStatus", changeStatus).post("/saveSize", saveSize);

export { router as RouterSizes };
