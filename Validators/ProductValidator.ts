import { getProductIdByNameRepository } from "../api/Repositories/Product.Repository";

export const existingProductWhitName = async (name: string, productId = 0): Promise<boolean> => {
    const existingProduct = await getProductIdByNameRepository(name.toLowerCase());
    if (!existingProduct) return false;
    return existingProduct !== productId;
};