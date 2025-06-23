import { OrderStatusEnum } from "../../Enums/OrderStatusEnum"
import { NameAndId } from "../../Interfaces/NameAndId.interface"

export class OrderStatusOptions {
    private Items: NameAndId[]

    constructor() {
        this.Items = [
            {
                Id: OrderStatusEnum.All,
                Name: 'Todos'
            },
            {
                Id: OrderStatusEnum.Canceled,
                Name: 'Cancelado'
            },
            {
                Id: OrderStatusEnum.Delivered,
                Name: 'Entregado'
            },
            {
                Id: OrderStatusEnum.Pending,
                Name: 'Pendiente'
            },
            {
                Id: OrderStatusEnum.Preparation,
                Name: 'En preparación'
            },
            {
                Id: OrderStatusEnum.Prepared,
                Name: 'Preparado'
            }
        ]
    }

    get items() {
        return this.Items
    }
}