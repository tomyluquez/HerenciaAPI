import { ActivationStatusEnum } from "../Enums/activationStatusEnum";
import { UserRoleEnum } from "../Enums/UserRoleEnum";

export const convertedFilters = (param: any): string[] => {
    const params = typeof param === "string" ? param : "";
    const pararmsArray = params ? params.split(",") : [];
    return pararmsArray;
};

export const convertedStatusFilter = (status: string | undefined): boolean | undefined => {
    if (!status || (status !== "active" && status !== "inactive")) {
        return undefined;
    } else {
        return status === "active" ? true : false;
    }
};

export const convertedStringToBoolean = (status: string): boolean => {
    return status === "true" ? true : false;
};

export const convertedStatusNumberFilter = (status: number | undefined): boolean | undefined => {
    if (status === undefined || (status !== ActivationStatusEnum.Active && status !== ActivationStatusEnum.Inactive)) {
        return undefined;
    } else {
        return status === ActivationStatusEnum.Active ? true : false;
    }
};

export const convertedUserRoleFilter = (userRole: number): boolean => {
    if (!userRole || (userRole !== UserRoleEnum.Admin && userRole !== UserRoleEnum.Customer)) {
        return false;
    } else {
        return userRole === UserRoleEnum.Admin ? true : false;
    }
};
