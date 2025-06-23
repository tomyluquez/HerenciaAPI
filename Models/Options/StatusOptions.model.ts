import { ActivationStatusEnum } from "../../Enums/activationStatusEnum"
import { NameAndId } from "../../Interfaces/NameAndId.interface"

export class StatusOptions {
    private Items: NameAndId[]

    constructor() {
        this.Items = [
            {
                Id: ActivationStatusEnum.Active,
                Name: 'Activo'
            },
            {
                Id: ActivationStatusEnum.Inactive,
                Name: 'Inactivo'
            }
        ]
    }

    get items() {
        return this.Items
    }
}