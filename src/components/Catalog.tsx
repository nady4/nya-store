"use client";
import { WishlistProvider } from "@/components/WishlistProvider";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";

function Catalog() {
  return (
    <WishlistProvider>
      <div className="home-container">
        <SearchBar />
        <ProductList />
      </div>
    </WishlistProvider>
  );
}

export default Catalog;
