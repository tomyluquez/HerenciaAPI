import ShippingMethod from "../../Database/Models/ShippingMethod.model";
import { IShippingMethodsVM } from "../../Interfaces/ShippingMethods.interface";

export const mapShippingMethodsDBToVM = (shiiping: ShippingMethod): IShippingMethodsVM => {
    return {
        Id: shiiping.Id,
        Name: shiiping.Name,
        Value: shiiping.value,
        Price: shiiping.Price
    };
};