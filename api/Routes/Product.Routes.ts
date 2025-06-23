import { Router } from "express";
import { authenticate, authorizeRole } from "../Middlewares/Auth-Middlewares";
import { UserRoleEnum } from "../../Enums/UserRoleEnum";
import { getPromocionalProducts } from "../Controllers/Product.Controller";

const router: Router = Router();

router.get("/promotional", getPromocionalProducts)
// .get("/getProductsToSale", getProductsToSale)
// .get("/product", getProductById)
// .get("/getFilteringOptionsPagedListProduct", getFilteringOptionsPagedListProduct)
// .get("/getFilteringOptionsPriceList", getFilteringOptionsPriceList)
// .get("/getHomeInfo", getHomeInfo);

// router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin]));

// router.put("/product", changeStatuts)
//     .post("/saveProduct", saveProduct)
//     .get("/pagedList", getProductsPagedLists)
//     .get("/getPriceListProducts", getPriceListProducts)
//     .put("/updatePriceProduct", updatePriceProduct)
//     .put("/updateAllProductsPrice", updateAllProductsPrice);

export { router as RouterProducts };
