"use client";
import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";
import {
  addToWishList,
  removeFromWishList,
} from "@/store/slices/wishListSlice";
import { toggleWishlistProduct } from "@/actions/wishlist";

export function useToggleWishlist(productId: string) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  const wishListIds = useAppSelector((state) => state.wishList);

  const isWishlisted = useMemo(
    () => wishListIds.includes(productId),
    [wishListIds, productId]
  );

  const onHeartClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isWishlisted) {
        dispatch(removeFromWishList(productId));
      } else {
        dispatch(addToWishList(productId));
      }

      toggleWishlistProduct(userId, productId);
    },
    [dispatch, isWishlisted, productId, userId]
  );

  return { isWishlisted, onHeartClick };
}
