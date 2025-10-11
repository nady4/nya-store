"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { setProducts } from "@/store/slices/productsSlice";
import { getCartProducts } from "@/actions/cart";

export const useLoadCartProducts = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchCart() {
      if (session?.user?.id) {
        const cartProducts = await getCartProducts(session.user.id);
        dispatch(setProducts(cartProducts));
      }
    }

    fetchCart();
  }, [session, dispatch]);
};
