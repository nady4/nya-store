import Payment from "./Payment";
import Shipment from "./Shipment";
import Cart from "./Cart";
import { v4 as uuidv4 } from "uuid";

class Order {
    id: string;
    payment: Payment;
    shipment: Shipment;
    cart: Cart;
    status: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string = uuidv4(),
        payment: Payment,
        shipment: Shipment,
        cart: Cart,
        status: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.payment = payment;
        this.shipment = shipment;
        this.cart = cart;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Order;
