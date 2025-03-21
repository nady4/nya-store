"use client";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useGetWishlist } from "@/hooks/useGetWishList";

function Catalog() {
  useGetProducts();
  useGetWishlist();

  return (
    <div className="home-container">
      <SearchBar />
      <ProductList />
    </div>
  );
}

export default Catalog;
