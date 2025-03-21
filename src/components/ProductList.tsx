"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useSession } from "next-auth/react";
import { setCategories } from "@/store/slices/categorySlice";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";

function ProductList() {
  const dispatch = useAppDispatch();
  const wishListIds = useAppSelector((state) => state.wishList);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const products = useAppSelector((state) => state.products);
  const filteredProducts = useFilteredProducts(products);

  useEffect(() => {
    const categories = [...new Set(products.map((p) => p.category))];
    dispatch(setCategories(categories));
  }, [products, dispatch]);

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>Loading Products...</p>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard
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
