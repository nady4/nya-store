"use client";
import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setCategories } from "@/store/slices/categorySlice";
import { useFilterProducts } from "@/hooks/useFilterProducts";
import CatalogCard from "./CatalogCard";
import "../styles/Catalog.scss";

function ProductList() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const wishListIds = useAppSelector((state) => state.wishList);
  const products = useAppSelector((state) => state.products);
  const filteredProducts = useFilterProducts(products);
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories, dispatch]);

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>Loading Products...</p>
      ) : (
        filteredProducts.map((product) => (
          <CatalogCard
            key={product.id}
            {...product}
            wishListIds={wishListIds}
            userId={userId as string}
          />
        ))
      )}
    </div>
  );
}

export default ProductList;
