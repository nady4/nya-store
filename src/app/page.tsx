"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useInitializeWishList } from "@/hooks/useInitializeWishList";
import { useInitializeCart } from "@/hooks/useInitializeCart";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;

  useInitializeWishList(userId);
  useInitializeCart(userId);

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
