import Cart from "./Cart";
import Product from "./Product";

interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    paymentMethodDiscount: number;
    quantityDiscount: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

export default CartItem;
