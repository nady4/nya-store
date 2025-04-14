"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFetchData } from "@/hooks/useFetchData";
import cart from "@/../public/assets/icons/cart.svg";
import "../../../styles/Product.scss";

function ProductPage() {
  const id = usePathname().split("/")[2];
  const { product, loading, error } = useFetchData(id);

  if (loading) {
    return (
      <div className="item">
        <div>Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="item">
        <div>{error || "Product not found"}</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="item">
        <div className="left">
          <Image
            src={product.photo}
            alt={product.name}
            height={300}
            width={300}
          />
        </div>
        <div className="right">
          <div className="top">
            <h2 className="name">{product.name}</h2>
            <p className="category">{product.category}</p>
            <p className="price">${product.price.toFixed(2)}</p>
          </div>
          <div className="bottom">
            <button className="button">
              <Image src={cart} className="button-icon" alt="cart icon" /> Add
              to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="related-products"></div>
    </div>
  );
}

export default ProductPage;
