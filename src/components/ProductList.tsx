import ProductCard from "./ProductCard";
import { ProductsType } from "@/types";
import "../styles/ProductList.scss";

async function ProductList({ products }: ProductsType) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

export default ProductList;
