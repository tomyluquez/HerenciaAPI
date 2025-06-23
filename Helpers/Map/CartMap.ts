import CartItems from "../../Database/Models/CartItems.model";
import { AddItemCartDTO } from "../../Interfaces/Cart/AddItemToCart.interface";
import { ICartItemsVM } from "../../Interfaces/Cart/CartItems.interface";
import { UpdateQuantityItemCartDTO } from "../../Interfaces/Cart/UpdateQuantityItemCart.interface";

export const mapCartItemsDBToVM = (cartItemDB: CartItems): ICartItemsVM => {
    return {
        Id: cartItemDB.Id,
        ProductName: cartItemDB.Variant.Product.Name,
        Quantity: cartItemDB.Quantity,
        Price: cartItemDB.Variant.Product.Price,
        SizeName: cartItemDB.Variant.Size!.Name,
        SizeId: cartItemDB.Variant.Size!.Id,
        Stock: cartItemDB.Variant.Stock,
        VariantId: cartItemDB.Variant.Id,
        UrlImage: cartItemDB.Variant.Product.Images && cartItemDB.Variant.Product.Images.length > 0 ? cartItemDB.Variant.Product.Images[0].Url : ""
    };
};

export const mapItemCartBodyToDTO = (variantId: number, cartId: number, quantity: number): AddItemCartDTO => {
    return {
        VariantId: variantId,
        CartId: cartId,
        Quantity: quantity
    };
};

export const mapUpdateQuantityItemCartBodyToDTO = (itemId: number, quantity: number, action: number): UpdateQuantityItemCartDTO => {
    return {
        Quantity: +quantity,
        ItemId: +itemId,
        Action: +action
    };
};
