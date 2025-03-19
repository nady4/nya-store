"use client";
import { WishlistProvider } from "@/components/WishlistProvider";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";
import { ProductType } from "@/types";

function Catalog({ products }: { products: ProductType[] }) {
  return (
    <WishlistProvider>
      <div className="home-container">
        <SearchBar />
        <ProductList products={products} />
      </div>
    </WishlistProvider>
  );
}

export default Catalog;
