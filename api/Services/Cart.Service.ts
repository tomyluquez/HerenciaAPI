import { ActionCartItemEnum } from "../../Enums/ActionCartEnum";
import { Errors } from "../../Enums/Errors.enum";
import { AddItemCartDTO } from "../../Interfaces/Cart/AddItemToCart.interface";
import { UpdateQuantityItemCartDTO } from "../../Interfaces/Cart/UpdateQuantityItemCart.interface";
import { UserCartItemsVM } from "../../Models/Cart/UserCartItems.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { hasStockValidator, substractQuantityValidator } from "../../Validators/CartValidators";
import { addItemCartRepository, deleteItemToCartRepository, getCartItemsByUserIdRepository, getItemCartByIdRepository, updateQuantityCartItemRepository } from "../Repositories/Cart.Repository";

export const getCartItemsByUserIdService = async (userId: number): Promise<UserCartItemsVM> => {
    //comprobar primero si el usuario existe, sino, devolver error de que no existe el usuario.
    return await getCartItemsByUserIdRepository(userId);
};

export const addItemCartService = async (bodyParams: AddItemCartDTO): Promise<ResponseMessages> => {
    //comprobar si hay stock suficiente.
    const hasStock = await hasStockValidator(bodyParams.VariantId, bodyParams.CartId, bodyParams.Quantity);
    if (!hasStock) {
        const response = new ResponseMessages();
        response.setError(Errors.HasNotStock);
        return response;
    }
    return await addItemCartRepository(bodyParams);
};

export const deleteItemToCartService = async (itemId: number): Promise<ResponseMessages> => {
    return await deleteItemToCartRepository(itemId);
};

export const updateQuantityCartItemService = async (bodyParams: UpdateQuantityItemCartDTO): Promise<ResponseMessages> => {
    const itemCart = await getItemCartByIdRepository(bodyParams.ItemId);
    if (!itemCart) {
        const response = new ResponseMessages();
        response.setError(Errors.CartItemNotFound);
        return response;
    }
    console.log(itemCart)

    if (bodyParams.Action === ActionCartItemEnum.Add) {
        const hasStock = await hasStockValidator(itemCart.VariantId, itemCart.CartId, bodyParams.Quantity);
        if (!hasStock) {
            const response = new ResponseMessages();
            response.setError(Errors.HasNotStock);
            return response;
        }
    }

    if (bodyParams.Action === ActionCartItemEnum.Substract) {
        const rest = await substractQuantityValidator(itemCart.Id, bodyParams.Quantity);
        if (rest < 0) {
            const response = new ResponseMessages();
            response.setError(Errors.NotSubstract);
            return response;
        }
        if (rest === 0) {
            return await deleteItemToCartRepository(bodyParams.ItemId);
        }
    }

    return await updateQuantityCartItemRepository(bodyParams);
};
