import User from "./User";
import Payment from "./Payment";
import Shipment from "./Shipment";
import Cart from "./Cart";

interface Order {
    id: string;
    payment: Payment;
    shipment: Shipment;
    cart: Cart;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export default Order;
