"use client";
import { useAppSelector } from "@/store/hooks";
import { ProductListProps } from "@/types";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";

function ProductList({ products }: ProductListProps) {
  const { activeCategories } = useAppSelector((state) => state.category);

  const filteredProducts = products.filter(
    (product) => activeCategories[product.category]
  );

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          photo={product.photo}
        />
      ))}
    </div>
  );
}

export default ProductList;
