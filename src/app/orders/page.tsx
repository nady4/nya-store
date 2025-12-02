import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/auth";
import prisma from "@/libs/prisma";
import Link from "next/link";
import "@/styles/Orders.scss";

async function retryOrder(orderId: string) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const userId = session.user.id as string;

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
      status: "pending",
    },
    include: {
      orderItems: true,
    },
  });

  if (!order) {
    redirect("/orders");
  }

  await prisma.cart.deleteMany({
    where: { userId },
  });

  if (order.orderItems.length) {
    await prisma.cart.createMany({
      data: order.orderItems.map((item) => ({
        userId,
        productId: item.productId,
        quantity: item.quantity,
      })),
    });
  }

  redirect("/cart");
}

async function cancelOrder(orderId: string) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const userId = session.user.id as string;

  await prisma.order.updateMany({
    where: {
      id: orderId,
      userId,
      status: "pending",
    },
    data: {
      status: "cancelled",
    },
  });

  redirect("/orders");
}

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id as string },
    orderBy: { createdAt: "desc" },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!orders.length) {
    return (
      <div className="orders-page">
        <h1>Mis órdenes 🧾</h1>
        <p>No tenés órdenes todavía.</p>
        <Link href="/">🛍️ Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>Mis órdenes 🧾</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Orden #{order.id.slice(0, 8)}</span>
              <span className="order-status">
                Estado:{" "}
                <strong>
                  {order.status === "approved"
                    ? "✅ Aprobada"
                    : order.status === "pending"
                    ? "⏳ Pendiente"
                    : order.status === "rejected"
                    ? "❌ Rechazada"
                    : order.status === "cancelled"
                    ? "🚫 Cancelada"
                    : order.status}
                </strong>
              </span>
            </div>

            <div className="order-meta">
              <span>
                Fecha:{" "}
                {order.createdAt.toLocaleString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="order-total">
                Total: ${order.total.toFixed(2)}
              </span>
            </div>

            <div className="order-items">
              {order.orderItems.map((item) => (
                <div key={item.id} className="order-item">
                  <span className="order-item-name">{item.product.name}</span>
                  <span className="order-item-qty">
                    Cantidad: {item.quantity}
                  </span>
                  <span className="order-item-subtotal">
                    Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {order.status === "pending" && (
              <div className="order-actions">
                <form action={retryOrder.bind(null, order.id)}>
                  <button type="submit" className="order-retry-button">
                    Reintentar pago
                  </button>
                </form>
                <form action={cancelOrder.bind(null, order.id)}>
                  <button type="submit" className="order-cancel-button">
                    Cancelar orden
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="orders-actions">
        <Link href="/">🛍️ Seguir comprando</Link>
      </div>
    </div>
  );
}
