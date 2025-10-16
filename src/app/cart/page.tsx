"use client";
import { useAppSelector } from "@/store/hooks";
import { useLoadPageData } from "@/hooks/useLoadPageData";
import ProductList from "@/components/ProductList";
import CheckoutButton from "@/components/CheckoutButton";
import "@/styles/Cart.scss";

export default function CartPage() {
  const { loading } = useLoadPageData("cart");
  const products = useAppSelector((state) => state.products);
  const isCartEmpty = !loading && products.length === 0;

  return (
    <div className="cart-container">
      <div style={{ height: "50px" }}></div>
      <ProductList isLoadingExternal={loading} />
      {!loading && !isCartEmpty && (
        <CheckoutButton title="Cart" price={1000} quantity={1} />
      )}
    </div>
  );
}
