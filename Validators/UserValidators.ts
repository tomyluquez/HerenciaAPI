import { getUserIdByEmailRepository } from "../api/Repositories/User.Repository";

export const validateIfExistsUserWhitEmail = async (email: string, userId = 0): Promise<boolean> => {
    const existingUser = await getUserIdByEmailRepository(email.toLowerCase());

    if (!existingUser) return false;

    return existingUser !== userId;
};
