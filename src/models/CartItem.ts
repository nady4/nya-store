import Product from "./Product";
import { v4 as uuidv4 } from "uuid";

class CartItem {
    id: string;
    product: Product;
    quantity: number;
    paymentMethodDiscount: number;
    quantityDiscount: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string = uuidv4(),
        product: Product,
        quantity: number,
        paymentMethodDiscount: number,
        quantityDiscount: number,
        total: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.paymentMethodDiscount = paymentMethodDiscount;
        this.quantityDiscount = quantityDiscount;
        this.total = total;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default CartItem;
