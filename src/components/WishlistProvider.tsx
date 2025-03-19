"use client";

import { useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { initializeWishList } from "@/store/slices/wishListSlice";
import { getUserWishlistIds } from "@/actions/wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        const wishlistItems = await getUserWishlistIds(userId);
        dispatch(initializeWishList(wishlistItems));
      }
    };

    if (status === "authenticated") {
      fetchWishlist();
    }
  }, [userId, status, dispatch]);

  return <>{children}</>;
}
