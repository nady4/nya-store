import ProductCard from "./ProductCard";
import { ProductsProps } from "@/types";
import "../styles/ProductList.scss";

async function ProductList({ products }: ProductsProps) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

export default ProductList;
