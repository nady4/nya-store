"use client";
import { useGetWishlistProducts } from "@/hooks/useGetWishListProducts";
import { useGetWishListIds } from "@/hooks/useGetWishListIds";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";

export default function WishlistPage() {
  useGetWishlistProducts();
  useGetWishListIds();

  return (
    <div className="home-container">
      <SearchBar />
      <ProductList />
    </div>
  );
}
