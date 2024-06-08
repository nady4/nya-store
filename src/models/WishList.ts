import User from "./User.ts";
import Product from "./Product.ts";

interface WishList {
    id: string;
    products: Product[];
    name: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;
}

export default WishList;
