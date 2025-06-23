import { NameAndId } from "../../Interfaces/NameAndId.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class FilteringOptionsPriceListVM extends ResponseMessages {
    Categories: NameAndId[];

    constructor() {
        super();
        this.Categories = [];
    }

    addCategories(categories: NameAndId[]) {
        this.Categories = categories;
    }

}