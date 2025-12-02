import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const type = body.type;
    const data = body.data;

    if (type === "payment" && data?.id) {
      const paymentResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      );

      if (paymentResponse.ok) {
        const payment = await paymentResponse.json();

        const status = payment.status as string;
        const externalReference = payment.external_reference as string | null;

        if (externalReference) {
          await prisma.order.update({
            where: { id: externalReference },
            data: { status },
          });
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error", error);
    return NextResponse.json({ received: false }, { status: 200 });
  }
}
