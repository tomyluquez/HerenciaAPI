import { NameAndId } from "../../Interfaces/NameAndId.interface";
import { StatusOptions } from "../Options/StatusOptions.model";
import { ResponseMessages } from "../ResponseMessages.model";

export class FilteringOptionsProductStockVM extends ResponseMessages {
    Categories: NameAndId[];
    Sizes: NameAndId[];
    Status: NameAndId[];
    RelatedProducts: NameAndId[];

    constructor() {
        super();
        this.Categories = [];
        this.Sizes = [];
        this.RelatedProducts = [];
        this.Status = new StatusOptions().items;
    }

    addCategories(categories: NameAndId[]) {
        this.Categories = categories;
    }

    addSizes(sizes: NameAndId[]) {
        this.Sizes = sizes;
    }

    addRelatedProducts(relatedProducts: NameAndId[]) {
        this.RelatedProducts = relatedProducts;
    }
}