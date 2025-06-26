import { RelatedProductAttributes } from "../Database/Models/RelatedProducts.Model";

class ProductHelper {


    public prepareRelatedProducts(productId: number, relatedProducts: number[]): RelatedProductAttributes[] {
        return relatedProducts.map((relatedProductId) => {
            return { Id: 0, ProductId: productId, RelatedProductId: relatedProductId };
        });
    }
}

export const productHelper = new ProductHelper();