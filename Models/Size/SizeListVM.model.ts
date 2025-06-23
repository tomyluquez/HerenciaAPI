import { ISizeListVM } from "../../Interfaces/Size/SizeList.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class SizeLlistVM extends ResponseMessages {
    Items: ISizeListVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
}
