import Card from "./Card.ts";
import Order from "./Order.ts";

interface Payment {
    id: string;
    paymentMethod: string;
    order: Order;
    card: Card;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export default Payment;
