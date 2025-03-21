"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getProduct } from "@/actions/products";
import { ProductType } from "@/types";
import cart from "@/../public/assets/icons/cart.svg";

function ProductPage() {
  const id = usePathname().split("/")[2];
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const productData = await getProduct(id);
        setProduct(productData);
      } catch (err) {
        setError("Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-item">
        <div>Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-item">
        <div>{error || "Product not found"}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="product-item">
        <Image
          src={product.photo}
          alt={product.name}
          height={100}
          width={100}
        />
        <h2>{product.name}</h2>
        <p>${product.price}</p>
        <button>
          <Image src={cart} alt="cart icon" /> Add to Cart
        </button>
      </div>
      <div className="related-products"></div>
    </div>
  );
}

export default ProductPage;
