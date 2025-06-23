import { Router } from "express";
import { changeStatusOrder, getFilteringOptionsOrderList, getOrderDetailById, getOrderDetailByOrderNumber, getOrders, getOrderStatus, saveOrder } from "../Controllers/Order.controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth-Middlewares";
import { UserRoleEnum } from "../../Enums/UserRoleEnum";

const router = Router();

// Rutas sin autenticación
router.get("/getFilteringOptionsOrderList", getFilteringOptionsOrderList);

// Rutas que requieren autenticación y rol de Admin o Customerc
router.get("/getOrders", authenticate, authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]), getOrders);
router.get("/getOrderDetailById", authenticate, authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]), getOrderDetailById);
router.get("/getOrderDetailByOrderNumber", authenticate, authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]), getOrderDetailByOrderNumber);
router.get("/getOrderStatus", authenticate, authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]), getOrderStatus);
router.post("/saveOrder", authenticate, authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]), saveOrder);

// Rutas que requieren autenticación y rol de Admin
router.put("/changeStatusOrder", authenticate, authorizeRole([UserRoleEnum.Admin]), changeStatusOrder);

export { router as RouterOrders };
