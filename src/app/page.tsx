"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useInitData } from "@/hooks/useInitData";
import { initializeCart } from "@/store/slices/cartSlice";
import { initializeWishList } from "@/store/slices/wishListSlice";
import { getCartIds } from "@/actions/cart";
import { getWishlistIds } from "@/actions/wishlist";

const initializationTasks = [
  { action: getCartIds, initializer: initializeCart },
  { action: getWishlistIds, initializer: initializeWishList },
];

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;

  useInitData(userId, initializationTasks);

  useEffect(() => {
    if (status === "loading") return;
    if (userId) {
      router.replace("/catalog");
    } else {
      router.replace("/auth/signin");
    }
  }, [userId, status, router]);

  return null;
}
