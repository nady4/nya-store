"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { initializeCart } from "@/store/slices/cartSlice";
import { getCartIds } from "@/actions/cart";

export const useLoadCartIds = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        const cartIds = await getCartIds(userId);
        dispatch(initializeCart(cartIds));
      }
    };

    if (status === "authenticated") {
      fetchCart();
    }
  }, [userId, status, dispatch]);
};
