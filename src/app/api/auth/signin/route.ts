import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error during signin:", error);
    return NextResponse.json(
      { error: "An error occurred during signin" },
      { status: 500 }
    );
  }
}
