"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { setProducts } from "@/store/slices/productsSlice";
import { getWishListProducts } from "@/actions/wishlist";

export const useLoadWishlistProducts = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchWishlist() {
      if (session?.user?.id) {
        const wishlistProducts = await getWishListProducts(session.user.id);
        dispatch(setProducts(wishlistProducts));
      }
    }

    fetchWishlist();
  }, [session, dispatch]);
};
