import Address from "./Address.ts";
import Order from "./Order.ts";
import Cart from "./Cart.ts";
import WishList from "./WishList.ts";

interface User {
    id: string;
    name: string;
    addresses: Address[];
    orders: Order[];
    cart?: Cart;
    wishLists: WishList[];
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export default User;
