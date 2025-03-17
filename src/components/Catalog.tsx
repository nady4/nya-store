import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";
import { ProductType } from "@/types";

function Catalog({ products }: { products: ProductType[] }) {
  return (
    <div className="home-container">
      <SearchBar />
      <ProductList products={products} />
    </div>
  );
}

export default Catalog;
