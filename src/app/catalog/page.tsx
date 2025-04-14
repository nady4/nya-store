"use client";
import { useFetchData } from "@/hooks/useFetchData";
import { useGetWishListIds } from "@/hooks/useGetWishListIds";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";

export default function Catalog() {
  useFetchData();
  useGetWishListIds();

  return (
    <div className="home-container">
      <SearchBar />
      <ProductList />
    </div>
  );
}
