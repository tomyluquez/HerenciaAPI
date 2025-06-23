import { NameAndId } from "../../Interfaces/NameAndId.interface";
import { StatusOptions } from "../Options/StatusOptions.model";
import { ResponseMessages } from "../ResponseMessages.model";

export class FilteringOptionsCategoryListVM extends ResponseMessages {
    Status: NameAndId[];

    constructor() {
        super();
        this.Status = new StatusOptions().items;
    }

}