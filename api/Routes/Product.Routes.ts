import { Router } from "express";
import { authenticate, authorizeRole } from "../Middlewares/Auth-Middlewares";
import { UserRoleEnum } from "../../Enums/UserRoleEnum";
import {
    getPromocionalProducts,
    getProductsToSale,
    getProductById,
    getFilteringOptionsPagedListProduct,
    getFilteringOptionsPriceList,
    getHomeInfo,
    changeStatuts,
    saveProduct,
    getProductsPagedLists,
    getPriceListProducts,
    updatePriceProduct,
    updateAllProductsPrice,
} from "../Controllers/Product.Controller";

const router: Router = Router();

// ✅ Rutas públicas (sin auth)
router.get("/promotional", getPromocionalProducts);
router.get("/getProductsToSale", getProductsToSale);
router.get("/product", getProductById);
router.get("/getFilteringOptionsPagedListProduct", getFilteringOptionsPagedListProduct);
router.get("/getFilteringOptionsPriceList", getFilteringOptionsPriceList);
router.get("/getHomeInfo", getHomeInfo);

// ✅ Middleware aplicado desde este punto
router.use(authenticate, authorizeRole([UserRoleEnum.Admin]));

// ✅ Rutas protegidas (con auth + rol Admin)
router.put("/product", changeStatuts);
router.post("/saveProduct", saveProduct);
router.get("/pagedList", getProductsPagedLists);
router.get("/getPriceListProducts", getPriceListProducts);
router.put("/updatePriceProduct", updatePriceProduct);
router.put("/updateAllProductsPrice", updateAllProductsPrice);

export { router as RouterProducts };
