"use client";
import { useLoadPageData } from "@/hooks/useLoadPageData";
import ProductList from "@/components/ProductList";
import CheckoutButton from "@/components/CheckoutButton";
import "@/styles/Cart.scss";

export default function CartPage() {
  const { loading } = useLoadPageData("cart");

  return (
    <div className="cart-container">
      <div style={{ height: "50px" }}></div>
      <ProductList isLoadingExternal={loading} />
      <CheckoutButton title="Cart" price={1000} quantity={1} />
    </div>
  );
}
