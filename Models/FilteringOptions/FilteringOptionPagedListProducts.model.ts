import { NameAndId } from "../../Interfaces/NameAndId.interface";
import { StatusOptions } from "../Options/StatusOptions.model";
import { ResponseMessages } from "../ResponseMessages.model";

export class FilteringOptionsPagedListProductVM extends ResponseMessages {
    Categories: NameAndId[];
    Status: NameAndId[];

    constructor() {
        super();
        this.Categories = [];
        this.Status = new StatusOptions().items;
    }

    addCategories(categories: NameAndId[]) {
        this.Categories = categories;
    }

}