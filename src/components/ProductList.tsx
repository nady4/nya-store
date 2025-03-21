"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useSession } from "next-auth/react";
import { setCategories } from "@/store/slices/categorySlice";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";
import { ProductType } from "@/types";
import { useFilteredProducts } from "@/hooks/useFilteredProducts"; // Import the new hook

function ProductList({ products }: { products: ProductType[] }) {
  const dispatch = useAppDispatch();
  const wishListIds = useAppSelector((state) => state.wishList);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const filteredProducts = useFilteredProducts(products);

  useEffect(() => {
    const categories = [...new Set(products.map((p) => p.category))];
    dispatch(setCategories(categories));
  }, [products, dispatch]);

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
          wishListIds={wishListIds}
          userId={userId as string}
        />
      ))}
    </div>
  );
}

export default ProductList;
