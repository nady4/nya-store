"use server";
import prisma from "@/libs/prisma";
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
