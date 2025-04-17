"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { initializeWishList } from "@/store/slices/wishListSlice";
import { getWishlistIds } from "@/actions/wishlist";

export const useLoadWishListIds = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        const wishlistIds = await getWishlistIds(userId);
        dispatch(initializeWishList(wishlistIds));
      }
    };

    if (status === "authenticated") {
      fetchWishlist();
    }
  }, [userId, status, dispatch]);
};
