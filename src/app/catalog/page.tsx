"use client";
import { useLoadProducts } from "@/hooks/useLoadProducts";
import { useLoadWishListIds } from "@/hooks/useLoadWishListIds";
import SearchBar from "@/components/SearchBar";
import Catalog from "@/components/Catalog";

export default function CatalogPage() {
  useLoadProducts();
  useLoadWishListIds();

  return (
    <div className="home-container">
      <SearchBar />
      <Catalog />
    </div>
  );
}
