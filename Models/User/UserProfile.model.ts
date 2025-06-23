import { IUserProfileVM } from "../../Interfaces/User/UserProfile.interface";
import { ResponseMessages } from "../ResponseMessages.model";

export class UserProfileVM extends ResponseMessages {
    Item: IUserProfileVM;

    constructor() {
        super();
        this.Item = {} as IUserProfileVM;
    }
}
