"use client";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useGetWishListIds } from "@/hooks/useGetWishListIds";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";

export default function Catalog() {
  useGetProducts();
  useGetWishListIds();

  return (
    <div className="home-container">
      <SearchBar />
      <ProductList />
    </div>
  );
}
