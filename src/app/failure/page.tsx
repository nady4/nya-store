"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "@/styles/PaymentStatus.scss";

export default function FailurePage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");

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
