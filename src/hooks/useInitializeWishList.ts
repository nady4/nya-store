// useInitializeWishList.ts
"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { initializeWishList } from "@/store/slices/wishListSlice";
import { getWishlistIds } from "@/actions/wishlist";

export function useInitializeWishList(userId?: string) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!userId || initialized.current) return;

    initialized.current = true;

    getWishlistIds(userId).then((ids) => {
      dispatch(initializeWishList(ids));
    });
  }, [dispatch, userId]);
}
