import Cart from "../../Database/Models/Cart.Model";
import CartItems from "../../Database/Models/CartItems.model";
import Product from "../../Database/Models/Product.model";
import ProductImages from "../../Database/Models/ProductImages.model";
import Size from "../../Database/Models/Size.model";
import Variant from "../../Database/Models/Variant.model";
import { ActionCartItemEnum } from "../../Enums/ActionCartEnum";
import { Errors } from "../../Enums/Errors.enum";
import { Success } from "../../Enums/SuccessEnum";
import { mapCartItemsDBToVM } from "../../Helpers/Map/CartMap";
import { AddItemCartDTO } from "../../Interfaces/Cart/AddItemToCart.interface";
import { UpdateQuantityItemCartDTO } from "../../Interfaces/Cart/UpdateQuantityItemCart.interface";
import { UserCartItemsVM } from "../../Models/Cart/UserCartItems.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { getVariantByIdRepository } from "./Variant.Repository";

export const getCartItemsByUserIdRepository = async (userId: number): Promise<UserCartItemsVM> => {
    const response = new UserCartItemsVM();

    let userCart = await Cart.findOne({
        where: { UserId: userId, IsFinish: false }
    });

    if (!userCart) {
        userCart = await Cart.create({ UserId: userId });
    }

    const cartItemsDB = await CartItems.findAll({
        where: { CartId: userCart.Id },
        include: [
            {
                model: Variant,
                as: "Variant",
                attributes: ["Id", "Stock"],
                include: [
                    {
                        model: Size,
                        as: "Size",
                        attributes: ["Name", "Id"]
                    },
                    {
                        model: Product,
                        as: "Product",
                        attributes: ["Name", "Price"],
                        include: [
                            {
                                model: ProductImages,
                                as: "Images",
                                attributes: ["Url"]
                            }
                        ]
                    }
                ]
            }
        ]
    });

    if (cartItemsDB.length > 0) {
        response.Items = cartItemsDB.map(mapCartItemsDBToVM);
        response.CartId = userCart.Id;
    } else {
        response.setWarning(Errors.CartEmpty);
    }
    return response;
};

export const addItemCartRepository = async (bodyParams: AddItemCartDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    const variant = await getVariantByIdRepository(bodyParams.VariantId);
    const item = await getItemCartByICartIdRepository(bodyParams.CartId, bodyParams.VariantId);

    if (!variant) {
        response.setError(Errors.Variant);
        return response;
    }

    if (!item) {
        const newCartItem = await CartItems.create({
            Quantity: bodyParams.Quantity,
            UnitPrice: variant.Product!.Price,
            TotalPrice: variant.Product!.Price * bodyParams.Quantity,
            CartId: bodyParams.CartId,
            VariantId: bodyParams.VariantId
        });

        if (!newCartItem) {
            response.setError(Errors.CartItem);
        } else {
            response.setSuccess(Success.AddCartItem);
        }
    } else {
        return await updateQuantityCartItemRepository({
            Quantity: bodyParams.Quantity,
            ItemId: item.Id,
            Action: ActionCartItemEnum.Add
        });
    }

    return response;
};
export const deleteItemToCartRepository = async (itemId: number): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    await CartItems.destroy({ where: { Id: itemId } });
    response.setSuccess(Success.RemoveCartItem);
    return response;
};

export const getItemCartByIdRepository = async (itemId: number): Promise<CartItems | null> => {
    return await CartItems.findOne({ where: { Id: itemId } });
};

export const getQuantityItemCartRepository = async (Id: number): Promise<number> => {
    const item = await CartItems.findOne({ where: { Id }, attributes: ["Quantity"] });
    return item?.Quantity || 0;
};

export const getItemCartByICartIdRepository = async (cartId: number, variantId: number): Promise<CartItems | null> => {
    return await CartItems.findOne({
        where: { CartId: cartId, VariantId: variantId }
    });
};

export const updateQuantityCartItemRepository = async (bodyParams: UpdateQuantityItemCartDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    const item = await getItemCartByIdRepository(bodyParams.ItemId);

    // Calcular la nueva cantidad en función de la acción
    const newQuantity =
        bodyParams.Action === ActionCartItemEnum.Add
            ? item!.Quantity + bodyParams.Quantity // Sumar cantidad
            : item!.Quantity - bodyParams.Quantity; // Restar cantidad

    const newTotalPrice = (item!.TotalPrice = item!.UnitPrice * newQuantity);

    const [affectedRows] = await CartItems.update({ Quantity: newQuantity, TotalPrice: newTotalPrice }, { where: { Id: item!.Id } });

    if (!affectedRows) {
        response.setError(Errors.CartItem);
    } else {
        response.setSuccess(Success.UpdateQuantityCartItem);
    }

    return response;
};

export const getCartIdByUserId = async (userId: number): Promise<number> => {
    let cart = await Cart.findOne({
        where: { UserId: userId, IsFinish: false }
    });
    if (!cart) {
        cart = await Cart.create({ UserId: userId });
    }

    return cart.Id;
};

export const finishCartByCartIdRepository = async (cartId: number): Promise<ResponseMessages> => {
    let response = new ResponseMessages();
    try {
        const [affectedRows] = await Cart.update({ IsFinish: true }, { where: { Id: cartId } });

        if (!affectedRows) {
            response.setError(Errors.CartItem);
        }
    } catch (error) {
        response.setError(Errors.CartItem);
    }
    return response;
}