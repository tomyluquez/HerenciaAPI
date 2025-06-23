import { Router } from "express";
import { authenticate, authorizeRole } from "../Middlewares/Auth-Middlewares";
import { UserRoleEnum } from "../../Enums/UserRoleEnum";
import { AddItemToCart, deleteItemsToCart, getCartItemsByUserId, updateQuantityCartItem } from "../Controllers/Cart.Controller";

const router: Router = Router();

router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]));

router.get("/cartItems", getCartItemsByUserId)
    .post("/cartItem", AddItemToCart)
    .delete("/cartItem", deleteItemsToCart)
    .post("/cartItems", updateQuantityCartItem);

export { router as RouterCart };
