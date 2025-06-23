import { ICategoryVM } from "../../Interfaces/Category/CategoryVM.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class CategoryVM extends ResponseMessages {
    Item: ICategoryVM | null;

    constructor() {
        super();
        this.Item = null;
    }

    AddCategory(category: ICategoryVM) {
        this.Item = category;
    }
}
