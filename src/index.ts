import User from "./models/User.ts";
import Address from "./models/Address.ts";
import Cart from "./models/Cart.ts";
import WishList from "./models/WishList.ts";
import products from "./products.ts";
import { v4 as uuidv4 } from "uuid";

const nadya = new User(
    uuidv4(),
    "Nadya",
    "nady4",
    "nadyajerochim@gmail.com",
    "password123",
    [new Address("Liberty 1369", "Burzaco", "Buenos Aires", "1312")],
    new Cart(uuidv4()),
    [],
    [
        new WishList(
            uuidv4(),
            products,
            "My wish list",
            "https://example.com/images/wishlist.jpg",
            new Date(),
            new Date()
        ),
    ],
    new Date(),
    new Date()
);

console.log(nadya);
