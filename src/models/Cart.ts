import User from "./User.ts";
import Order from "./Order.ts";
import CartItem from "./CartItem.ts";

interface Cart {
    id: string;
    order?: Order;
    cartItems: CartItem[];
    createdAt: Date;
    updatedAt: Date;
}

export default Cart;
