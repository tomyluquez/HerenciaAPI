import { ISizeListVM } from "../../Interfaces/Size/SizeList.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class SizeVM extends ResponseMessages {
    Item: ISizeListVM;

    constructor() {
        super();
        this.Item = {} as ISizeListVM;
    }
}
