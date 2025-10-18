"use client";
import { useAppSelector } from "@/store/hooks";
import { useLoadPageData } from "@/hooks/useLoadPageData";
import Order from "@/components/Order";
import "@/styles/Cart.scss";
import AddressPage from "../address/page";

export default function CartPage() {
  const { loading } = useLoadPageData("cart");
  const products = useAppSelector((state) => state.products);
  const isCartEmpty = !loading && products.length === 0;

  return (
    <div className="cart-container">
      {isCartEmpty ? (
        <p className="status">Your cart is empty</p>
      ) : (
        <>
          <Order />
          <AddressPage />
        </>
      )}
    </div>
  );
}
