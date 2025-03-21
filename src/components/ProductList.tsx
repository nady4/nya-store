"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useSession } from "next-auth/react";
import { setCategories } from "@/store/slices/categorySlice";
import { useFilterProducts } from "@/hooks/useFilterProducts";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";

function ProductList({ isWishlistPage = false }) {
  const dispatch = useAppDispatch();
  const wishListIds = useAppSelector((state) => state.wishList);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const products = useAppSelector((state) => state.products);
  const filteredProducts = useFilterProducts(products);

  useEffect(() => {
    const categories = [...new Set(products.map((p) => p.category))];
    dispatch(setCategories(categories));
  }, [products, dispatch]);

  // If this is the wishlist page and we have no products to display
  if (isWishlistPage && products.length === 0) {
    return <p>Your wishlist is empty. Add some products to see them here!</p>;
  }

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
