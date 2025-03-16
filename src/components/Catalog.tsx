// components/Catalog.tsx
"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCategories } from "@/store/slices/categorySlice";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";
import { CatalogProps } from "@/types";

function Catalog({ products }: CatalogProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const categories = [...new Set(products.map((p) => p.category))];
    dispatch(setCategories(categories));
  }, [products, dispatch]);

  return (
    <div className="home-container">
      <SearchBar products={products} />
      <ProductList products={products} />
    </div>
  );
}

export default Catalog;
