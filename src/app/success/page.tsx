"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "@/styles/PaymentStatus.scss";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");

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
