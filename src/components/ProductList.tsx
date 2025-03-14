import { PrismaClient } from "@prisma/client";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";

const prisma = new PrismaClient();

async function ProductList() {
  const products = await prisma.product.findMany();

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

export default ProductList;
