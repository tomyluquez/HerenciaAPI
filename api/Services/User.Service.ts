import { Errors } from "../../Enums/Errors.enum";
import { UserLoginDTO } from "../../Interfaces/User/UserLogin.interface";
import { UserRegisterDTO } from "../../Interfaces/User/UserRegister.interface";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { UserProfileVM } from "../../Models/User/UserProfile.model";
import { UserTokenVM } from "../../Models/User/UserToken.model";
import { validateIfExistsUserWhitEmail } from "../../Validators/UserValidators";
import { getUserIdByNameRepository, getUserProfileRepository, loginUserRepository, registerUserRepository } from "../Repositories/User.Repository";

export const getUserProfileService = async (userId: number): Promise<UserProfileVM> => {
    return await getUserProfileRepository(userId);
};

export const getUserProfileByUserNameService = async (userName: string): Promise<UserProfileVM> => {
    const userId = await getUserIdByNameRepository(userName);
    return await getUserProfileRepository(userId);
};

export const registerUserService = async (newUser: UserRegisterDTO): Promise<ResponseMessages> => {
    const existingUserWhitEmail = await validateIfExistsUserWhitEmail(newUser.Email);

    if (existingUserWhitEmail) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingEMail);
        return response;
    }

    return await registerUserRepository(newUser);
};

export const loginUserService = async (loginUser: UserLoginDTO): Promise<UserTokenVM> => {
    return await loginUserRepository(loginUser);
};
