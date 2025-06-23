import { IConfigVM } from "../../Interfaces/Config/Config.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class ConfigVM extends ResponseMessages {
    Items: IConfigVM[];
    TotalItems: number;
    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
}
