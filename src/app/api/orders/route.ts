import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              title: body.title,
              quantity: body.quantity,
              unit_price: body.price,
            },
          ],
          back_urls: {
            success: `${process.env.NEXTAUTH_URL}/success`,
            failure: `${process.env.NEXTAUTH_URL}/failure`,
            pending: `${process.env.NEXTAUTH_URL}/pending`,
          },
          auto_return: "approved",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Mercado Pago error:", error);
      return NextResponse.json(
        { error: "Error creating order" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
