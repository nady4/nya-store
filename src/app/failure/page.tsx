"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/PaymentStatus.scss";

export default function FailurePage() {
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
    <div className="payment-page failure-page">
      <h1>❌ Pago rechazado</h1>
      <p>
        El pago no se pudo completar. Podés intentar nuevamente o usar otro
        medio de pago.
      </p>

      <div className="payment-info">
        {paymentId && <p>ID de pago: {paymentId}</p>}
        {externalReference && <p>N° de orden: {externalReference}</p>}
        {status && <p>Estado informado por Mercado Pago: {status}</p>}
      </div>

      <div className="payment-actions">
        <Link href="/cart">🔁 Volver al carrito</Link>
        <Link href="/">🏠 Ir al inicio</Link>
      </div>
    </div>
  );
}
