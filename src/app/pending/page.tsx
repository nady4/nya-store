"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "@/styles/PaymentStatus.scss";

export default function PendingPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");

  return (
    <div className="payment-page pending-page">
      <h1>⏳ Pago en revisión</h1>
      <p>
        Tu pago está siendo procesado. Esto puede demorar unos minutos según el
        medio de pago elegido.
      </p>

      <div className="payment-info">
        {paymentId && <p>ID de pago: {paymentId}</p>}
        {externalReference && <p>N° de orden: {externalReference}</p>}
        {status && <p>Estado informado por Mercado Pago: {status}</p>}
      </div>

      <div className="payment-actions">
        <Link href="/orders">📦 Ver mis órdenes</Link>
        <Link href="/">🏠 Ir al inicio</Link>
      </div>
    </div>
  );
}
