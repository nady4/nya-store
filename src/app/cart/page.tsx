"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getCartProducts } from "@/actions/cart";
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

        const cartWithQuantities: CartItem[] = products.map((product) => ({
          ...product,
          quantity: 1,
        }));

        setCart(cartWithQuantities);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, [status, session]);

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
          <span className="quantity">x{item.quantity}</span>
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
