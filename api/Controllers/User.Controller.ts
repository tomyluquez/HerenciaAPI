import { Request, Response } from "express";
import { getUserProfileByUserNameService, getUserProfileService, loginUserService, registerUserService } from "../Services/User.Service";
import { UserProfileVM } from "../../Models/User/UserProfile.model";
import { Errors } from "../../Enums/Errors.enum";
import { mapUserLoginBodyToDTO, mapUserRegisterBodyToDTO } from "../../Helpers/Map/UserMap";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { UserTokenVM } from "../../Models/User/UserToken.model";

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.query;
    try {
        if (!userId) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getUserProfileService(+userId);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new UserProfileVM();
        response.setError(error.message || Errors.UserProfile);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const getUserProfileByUserName = async (req: Request, res: Response): Promise<void> => {
    const { userName } = req.query;
    try {
        if (!userName) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getUserProfileByUserNameService(userName as string);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new UserProfileVM();
        response.setError(error.message || Errors.UserProfile);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { userName, email, password, role, phone } = req.body;
    try {
        if (!userName) throw new Error(Errors.UserNameRequired);
        if (!email) throw new Error(Errors.UserEmailRequired);
        if (!password) throw new Error(Errors.UserPassRequired);
        const newUser = mapUserRegisterBodyToDTO(userName, email, password, Number(role), Number(phone));
        const response = await registerUserService(newUser);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.UserRegister);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        if (!email) throw new Error(Errors.UserEmailRequired);
        if (!password) throw new Error(Errors.UserPassRequired);
        const loginUser = mapUserLoginBodyToDTO(email, password);
        const response = await loginUserService(loginUser);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new UserTokenVM();
        response.setError(error.message || Errors.UserLogin);
        res.status(error.message ? 400 : 500).send(response);
    }
};
