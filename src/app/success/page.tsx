"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/PaymentStatus.scss";

export default function SuccessPage() {
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [externalReference, setExternalReference] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    setPaymentId(searchParams.get("payment_id"));
    setStatus(searchParams.get("status"));
    setExternalReference(searchParams.get("external_reference"));
  }, []);

  return (
    <div className="payment-page success-page">
      <h1>🎉 ¡Pago exitoso!</h1>
      <p>Tu pago fue procesado correctamente.</p>

      <div className="payment-info">
        {paymentId && <p>ID de pago: {paymentId}</p>}
        {externalReference && <p>N° de orden: {externalReference}</p>}
        {status && <p>Estado informado por Mercado Pago: {status}</p>}
      </div>

      <div className="payment-actions">
        <Link href="/orders">📦 Ver mis órdenes</Link>
        <Link href="/">🛍️ Volver a la tienda</Link>
      </div>
    </div>
  );
}
