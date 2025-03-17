"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setCategories } from "@/store/slices/categorySlice";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";
import { ProductType } from "@/types";

function ProductList({ products }: { products: ProductType[] }) {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.searchTerm.searchTerm);
  const { activeCategories } = useAppSelector((state) => state.category);
  const minPrice = useAppSelector((state) => state.price.min);
  const maxPrice = useAppSelector((state) => state.price.max);

  useEffect(() => {
    const categories = [...new Set(products.map((p) => p.category))];
    dispatch(setCategories(categories));
  }, [products, dispatch]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      activeCategories[product.category] &&
      product.price >= minPrice &&
      product.price <= maxPrice
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
