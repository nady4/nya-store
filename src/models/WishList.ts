import Product from "./Product.ts";
import { v4 as uuidv4 } from "uuid";

class WishList {
    id: string;
    products: Product[];
    name: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string = uuidv4(),
        products: Product[],
        name: string,
        photo: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.products = products;
        this.name = name;
        this.photo = photo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default WishList;
