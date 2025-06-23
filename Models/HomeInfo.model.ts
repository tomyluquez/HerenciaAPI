import { CategoryListVM } from "./Category/CategotyList.model";
import { PromotionalProductsVM } from "./Product/PromotionalProducts.model";
import { ResponseMessages } from "./ResponseMessages.model";

export class HomeInfoResponse extends ResponseMessages {
    Categories!: CategoryListVM
    PromotionalProducts!: PromotionalProductsVM

    constructor() {
        super();
    }

}