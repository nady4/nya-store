"use server";
import prisma from "@/libs/prisma";
import { ProductType } from "@/types";

export async function getProduct(id: string): Promise<ProductType> {
  try {
    if (!id) throw new Error("Missing id");
    const product = await prisma.product.findUnique({ where: { id } });
    return product as ProductType;
  } catch (error) {
    console.error("Error fetching product:", error);
    return {} as ProductType;
  }
}

export async function getProducts(): Promise<ProductType[]> {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
