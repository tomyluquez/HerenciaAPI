import { getSizeIdByNameRepository } from "../api/Repositories/Size.Repository";
import { getVariantBySizeIdRepository } from "../api/Repositories/Variant.Repository";
import { ISizeListVM } from "../Interfaces/Size/SizeList.interface";

export const validateIfExistsSizeWhitName = async (name: string, SizeId: number): Promise<boolean> => {
    const existingSize = await getSizeIdByNameRepository(name.toLowerCase());

    if (!existingSize) return false;

    return existingSize !== SizeId;
};



export const validateHasProductsWhitSize = async (id: number): Promise<boolean> => {
    const size: ISizeListVM | null = await getVariantBySizeIdRepository(id);
    return !!size;
};
