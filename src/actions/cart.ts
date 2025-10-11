"use server";
import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { ProductType } from "@/types";

export async function toggleCartProduct(userId: string, productId: string) {
  if (!userId) throw new Error("Missing userId");
  if (!productId) throw new Error("Missing productId");

  const existingCart = await prisma.wishList.findFirst({
    where: { userId, productId },
  });

  if (existingCart) {
    await prisma.wishList.delete({ where: { id: existingCart.id } });
  } else {
    await prisma.wishList.create({
      data: {
        userId,
        productId,
      },
    });
  }

  revalidatePath("/");
}

export async function getCartIds(userId: string) {
  if (!userId) throw new Error("Missing userId");

  try {
    const cartItems = await prisma.wishList.findMany({
      where: { userId },
      select: { productId: true },
    });

    return cartItems.map((item) => item.productId);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return [];
  }
}

export async function getCartProducts(userId: string): Promise<ProductType[]> {
  if (!userId) throw new Error("Missing userId");

  try {
    const cartItems = await prisma.wishList.findMany({
      where: { userId },
      select: { productId: true },
    });

    const productIds = cartItems.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    return products as ProductType[];
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return [];
  }
}
