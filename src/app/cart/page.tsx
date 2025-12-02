"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getCartProducts, updateCartQuantity } from "@/actions/cart";
import { ProductType } from "@/types";
import "@/styles/Cart.scss";

interface CartItem extends ProductType {
  quantity: number;
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!session?.user?.id) return;

    async function loadCart() {
      setLoading(true);
      try {
        if (status !== "authenticated") return;
        if (!session?.user?.id) return;

        const products = await getCartProducts(session.user.id);

        setCart(products);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, [status, session]);

  const handleIncreaseQuantity = (
    productId: string,
    currentQuantity: number
  ) => {
    const newQuantity = currentQuantity + 1;

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    if (session?.user?.id) {
      updateCartQuantity(session.user.id, productId, newQuantity);
    }
  };

  const handleDecreaseQuantity = (
    productId: string,
    currentQuantity: number
  ) => {
    const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    if (session?.user?.id) {
      updateCartQuantity(session.user.id, productId, newQuantity);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading || status === "loading")
    return <p className="empty">Cargando...</p>;

  if (cart.length === 0)
    return <p className="empty">🛒 Tu carrito está vacío</p>;

  return (
    <div className="cart">
      <h2>Purchase Order</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <Image
            src={item.photo}
            alt={item.name}
            width={100}
            height={100}
            style={{ borderRadius: "8px" }}
          />
          <span className="name">{item.name}</span>
          <div className="quantity">
            <button
              onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
            >
              -
            </button>
            <span>x{item.quantity}</span>
            <button
              onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
            >
              +
            </button>
          </div>
          <span className="price">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}

      <div className="cart-total">Total: ${total.toFixed(2)}</div>

      <div className="button-container">
        <button className="confirm-button">Confirm Order</button>
      </div>
    </div>
  );
}
