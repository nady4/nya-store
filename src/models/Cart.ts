import Order from "./Order.ts";
import CartItem from "./CartItem.ts";
import { v4 as uuidv4 } from "uuid";

class Cart {
    id: string;
    order?: Order;
    cartItems: CartItem[];
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string = uuidv4(),
        order?: Order,
        cartItems: CartItem[] = [],
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.order = order;
        this.cartItems = cartItems;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Cart;
