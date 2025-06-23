import { Op } from "sequelize";
import { UserProfileVM } from "../../Models/User/UserProfile.model";
import User from "../../Database/Models/User.model";
import Order from "../../Database/Models/Order.model";
import PaymentMethod from "../../Database/Models/PaymentMethod.model";
import ShippingMethod from "../../Database/Models/ShippingMethod.model";
import OrderStatus from "../../Database/Models/OrderStatus.model";
import { mapUserProfileDBToVM } from "../../Helpers/Map/UserMap";
import { Errors } from "../../Enums/Errors.enum";
import sequelize from "../../Database/connection";
import { UserRegisterDTO } from "../../Interfaces/User/UserRegister.interface";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { Success } from "../../Enums/SuccessEnum";
import { UserLoginDTO } from "../../Interfaces/User/UserLogin.interface";
import { UserTokenVM } from "../../Models/User/UserToken.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const getUserProfileRepository = async (UserId: number): Promise<UserProfileVM> => {
    const response = new UserProfileVM();

    const userProfileDB = await User.findOne({
        where: { Id: UserId },
        attributes: ["Id", "Name", "Image", "Email", "DateCreated", "Phone", "Addres"],
        include: [
            {
                model: Order,
                as: "Orders",
                attributes: ["OrderNumber", "DateCreated", "Total"],
                include: [
                    {
                        model: PaymentMethod,
                        as: "PaymentMethod",
                        attributes: ["Name"]
                    },
                    {
                        model: ShippingMethod,
                        as: "ShippingMethod",
                        attributes: ["Name"]
                    },
                    {
                        model: OrderStatus,
                        as: "OrderStatus"
                    }
                ]
            }
        ]
    });
    if (userProfileDB) {
        response.Item = mapUserProfileDBToVM(userProfileDB);
    } else {
        response.setError(Errors.UserProfile);
    }

    return response;
};

export const getUserIdByEmailRepository = async (Email: string): Promise<number> => {
    const userBM = await User.findOne({
        where: {
            [Op.and]: [sequelize.where(sequelize.fn("LOWER", sequelize.col("Email")), Email)]
        },
        attributes: ["Id"]
    });
    if (userBM) {
        return userBM.Id!;
    } else {
        return 0;
    }
};

export const getUserIdByNameRepository = async (name: string): Promise<number> => {
    const userBM = await User.findOne({
        where: {
            [Op.and]: [sequelize.where(sequelize.fn("LOWER", sequelize.col("Name")), name)]
        },
        attributes: ["Id"]
    });
    if (userBM) {
        return userBM.Id!;
    } else {
        return 0;
    }
};

export const getUserByNameRepository = async (name: string): Promise<User> => {
    const userBM = await User.findOne({
        where: {
            [Op.and]: [sequelize.where(sequelize.fn("LOWER", sequelize.col("Name")), name)]
        },
        attributes: ["Id", "Name", "Email"]
    });
    if (userBM) {
        return userBM;
    } else {
        return new User();
    }
};

export const registerUserRepository = async (newUser: UserRegisterDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    const newUserDB = await User.create(newUser);
    if (newUserDB) {
        response.setSuccess(Success.UserRegister);
    } else {
        response.setError(Errors.UserRegister);
    }
    return response;
};

export const loginUserRepository = async (loginUser: UserLoginDTO): Promise<UserTokenVM> => {
    const response = new UserTokenVM();

    const userDB = await User.findOne({ where: { Email: loginUser.Email } });

    if (!userDB) {
        response.setError(Errors.UserEmailAndPassLogin);
        return response;
    }
    const isMatchPass = await bcrypt.compare(loginUser.Password, userDB.Password);
    if (!isMatchPass) {
        response.setError(Errors.UserEmailAndPassLogin);
        return response;
    }

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: userDB.Id, username: userDB.Name, role: userDB.Role }, secretKey!, { expiresIn: "15d" });
    response.Token = token;
    response.Role = userDB.Role;
    response.CustomerName = userDB.Name;
    response.setSuccess(Success.UserLogin);

    return response;
};
