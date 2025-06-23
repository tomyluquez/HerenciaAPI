import { ICompanyInfoVM } from "../../Interfaces/Company/CompanyInfo.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class CompanyInfoVM extends ResponseMessages {
    Items: ICompanyInfoVM[];
    constructor() {
        super();
        this.Items = [];
    }
}
