"use client";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import { toggleCartProduct } from "@/actions/cart";

export function useToggleCartProduct(productId: string) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  const cartIds = useAppSelector((state) => state.cart);
  const isInCart = cartIds.includes(productId);

  const onCartClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isInCart) {
        dispatch(removeFromCart(productId));
      } else {
        dispatch(addToCart(productId));
      }

      toggleCartProduct(userId, productId); // async
    },
    [dispatch, isInCart, productId, userId]
  );

  return { isInCart, onCartClick };
}
