// useInitializeCart.ts
"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { initializeCart } from "@/store/slices/cartSlice";
import { getCartIds } from "@/actions/cart";

export function useInitializeCart(userId?: string) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!userId || initialized.current) return;

    initialized.current = true;

    getCartIds(userId).then((ids) => {
      dispatch(initializeCart(ids));
    });
  }, [dispatch, userId]);
}
