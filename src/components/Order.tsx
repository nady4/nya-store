"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";
import { getCartProducts } from "@/actions/cart";
import { ProductType } from "@/types";
import "../styles/Order.scss";

interface CartItem extends ProductType {
  quantity: number;
}

function Order() {
  const { data: session } = useSession();
  const cartIds = useAppSelector((state) => state.cart);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      if (!session?.user?.id) return;

      setLoading(true);
      const products = await getCartProducts(session.user.id);

      // Count quantities from cartIds
      const cartWithQuantities = products.map((product) => {
        const quantity = cartIds.filter((id) => id === product.id).length;
        return { ...product, quantity };
      });

      setCart(cartWithQuantities);
      setLoading(false);
    }

    loadCart();
  }, [session?.user?.id, cartIds]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <p className="empty">Cargando...</p>;
  if (cart.length === 0)
    return <p className="empty">🛒 Tu carrito está vacío</p>;

  return (
    <div className="order">
      <h2>Purchase Order</h2>
      {cart.map((item) => (
        <div key={item.id} className="order-item">
          <Image
            src={item.photo}
            alt={item.name}
            width={100}
            height={100}
            style={{ borderRadius: "8px" }}
          />
          <span className="name">{item.name}</span>
          <span className="quantity">x: {item.quantity}</span>
          <span className="price">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}

      <div className="order-total">Total: ${total.toFixed(2)}</div>

      <div className="button-container">
        <button className="confirm-button"> Confirm Order</button>
      </div>
    </div>
  );
}

export default Order;
