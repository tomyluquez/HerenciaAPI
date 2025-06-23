import { IMenuVM } from "../Interfaces/Menu.interface";
import { ResponseMessages } from "./ResponseMessages.model";

export class MenuVM extends ResponseMessages {
    Items: IMenuVM[];
    constructor() {
        super();
        this.Items = [];
    }
}
