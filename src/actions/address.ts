"use server";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { revalidatePath } from "next/cache";
import { AddressType } from "@/types";

export async function getAddress(id: string): Promise<AddressType | null> {
  try {
    if (!id) {
      console.error("Error fetching address: Missing id");
      return null;
    }
    const address = await prisma.address.findUnique({ where: { id } });
    return address;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
}

export async function getAddresses(): Promise<AddressType[]> {
  try {
    const addresses = await prisma.address.findMany();
    return addresses;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
}

export async function updateAddress(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const street = formData.get("street") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const postalCode = formData.get("postalCode") as string;
  const country = formData.get("country") as string;

  if (!street || !city || !postalCode || !country)
    throw new Error("Missing required fields");

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      address: {
        upsert: {
          create: { street, city, state, postalCode, country },
          update: { street, city, state, postalCode, country },
        },
      },
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}
