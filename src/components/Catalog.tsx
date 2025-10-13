"use client";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setCategories } from "@/store/slices/categorySlice";
import { useFilterProducts } from "@/hooks/useFilterProducts";
import { silkscreen } from "@/app/fonts";
import CatalogCard from "./CatalogCard";
import "../styles/Catalog.scss";

function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const [loading, setLoading] = useState(true);

  const filteredProducts = useFilterProducts(products);
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  useEffect(() => {
    if (products.length > 0) setLoading(false);
  }, [products]);

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories, dispatch]);

  if (loading)
    return (
      <p className={`${silkscreen.className} status`}>Loading Products...</p>
    );

  if (!loading && filteredProducts.length === 0)
    return (
      <p className={`${silkscreen.className} status`}>No products found</p>
    );

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <CatalogCard key={product.id} {...product} />
      ))}
    </div>
  );
}

export default ProductList;
