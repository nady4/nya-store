import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    let data;

    if (contentType?.includes("application/json")) {
      data = await request.json();
    } else if (contentType?.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
    } else {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: data.email as string },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      data.password as string,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const { ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error during signin:", error);
    return NextResponse.json(
      { error: "An error occurred during signin" },
      { status: 500 }
    );
  }
}
