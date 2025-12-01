"use client";
import { useEffect } from "react";
import { useLoadPageData } from "@/hooks/useLoadPageData";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";

export default function CatalogPage() {
  const { loading } = useLoadPageData("catalog");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="home-container">
      <SearchBar />
      <ProductList isLoadingExternal={loading} />
    </div>
  );
}
