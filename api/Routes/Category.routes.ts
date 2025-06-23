import { Router } from "express";
import { changeStatus, getAllCategories, getCategoryById, getFilteringOptionsCategoryList, saveCategory } from "../Controllers/Category.controller";
import { UserRoleEnum } from "../../Enums/UserRoleEnum";
import { authenticate, authorizeRole } from "../Middlewares/Auth-Middlewares";

const router: Router = Router();

router.get("/", getAllCategories)
    .get("/category", getCategoryById)
    .get("/getFilteringOptionsCategoryList", getFilteringOptionsCategoryList);

router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin]));

router.put("/changeStatus", changeStatus)
    .post("/saveCategory", saveCategory);

export { router as RouterCategories };
