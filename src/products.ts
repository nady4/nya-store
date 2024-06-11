import Product from "./models/Product";
import { v4 as uuidv4 } from "uuid";

const products = [
    new Product(
        uuidv4(),
        "Smartphone",
        "Latest model with all advanced features.",
        699.99,
        "https://example.com/images/smartphone.jpg"
    ),
    new Product(
        uuidv4(),
        "Laptop",
        "High performance laptop for all your needs.",
        999.99,
        "https://example.com/images/laptop.jpg"
    ),
    new Product(
        uuidv4(),
        "Headphones",
        "Noise-cancelling over-ear headphones.",
        199.99,
        "https://example.com/images/headphones.jpg"
    ),
    new Product(
        uuidv4(),
        "Smartwatch",
        "Track your fitness and stay connected.",
        149.99,
        "https://example.com/images/smartwatch.jpg"
    ),
    new Product(
        uuidv4(),
        "Tablet",
        "Portable and powerful tablet for work and play.",
        399.99,
        "https://example.com/images/tablet.jpg"
    ),
];

export default products;
