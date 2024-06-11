import Address from "./Address.ts";
import Order from "./Order.ts";
import Cart from "./Cart.ts";
import WishList from "./WishList.ts";
import { v4 as uuidv4 } from "uuid";

class User {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    addresses: Address[];
    cart: Cart;
    orders: Order[];
    wishLists: WishList[];
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string = uuidv4(),
        name: string,
        username: string,
        email: string,
        password: string,
        addresses: Address[],
        cart: Cart,
        orders: Order[],
        wishLists: WishList[],
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.addresses = addresses;
        this.cart = cart;
        this.orders = orders;
        this.wishLists = wishLists;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default User;
