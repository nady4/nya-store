"use client";
import { useLoadCartProducts } from "@/hooks/useLoadCartProducts";
import { useLoadCartIds } from "@/hooks/useLoadCartIds";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/Catalog";

export default function CartPage() {
  useLoadCartProducts();
  useLoadCartIds();

  return (
    <div className="home-container">
      <SearchBar />
      <ProductList />
    </div>
  );
}
