"use client";
import { useLoadCartProducts } from "@/hooks/useLoadCartProducts";
import { useLoadCartIds } from "@/hooks/useLoadCartIds";
import ProductList from "@/components/Catalog";
import CheckoutButton from "@/components/CheckoutButton";
import "@/styles/Cart.scss";

export default function CartPage() {
  useLoadCartProducts();
  useLoadCartIds();

  return (
    <div className="cart-container">
      <div style={{ height: "50px" }}></div>
      <ProductList />
      <CheckoutButton title="Cart" price={1000} quantity={1} />
    </div>
  );
}
