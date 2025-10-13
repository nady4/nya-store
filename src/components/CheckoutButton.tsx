"use client";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { silkscreen } from "@/app/fonts";

export default function CheckoutButton({
  title,
  price,
  quantity,
}: {
  title: string;
  price: number;
  quantity: number;
}) {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string, {
      locale: "es-AR",
    });
  }, []);

  const handleCheckout = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, quantity }),
    });

    const data = await res.json();
    if (data.id) setOrderId(data.id);
  };

  return (
    <div className="checkout-container">
      <button
        className={`checkout-button 
                    ${silkscreen.className}`}
        onClick={handleCheckout}
      >
        Pagar con Mercado Pago
      </button>
      {orderId && <Wallet initialization={{ preferenceId: orderId }} />}
    </div>
  );
}
