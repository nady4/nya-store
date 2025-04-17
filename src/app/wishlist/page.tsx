"use client";
import { useLoadWishlistProducts } from "@/hooks/useLoadWishlistProducts";
import { useLoadWishListIds } from "@/hooks/useLoadWishListIds";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/Catalog";

export default function WishlistPage() {
  useLoadWishlistProducts();
  useLoadWishListIds();

  return (
    <div className="home-container">
      <SearchBar />
      <ProductList />
    </div>
  );
}
