"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { setProducts } from "@/store/slices/productsSlice";
import { initializeCart } from "@/store/slices/cartSlice";
import { initializeWishList } from "@/store/slices/wishListSlice";
import { getProducts } from "@/actions/products";
import { getCartProducts, getCartIds } from "@/actions/cart";
import { getWishListProducts, getWishlistIds } from "@/actions/wishlist";
import { ProductType } from "@/types";

type PageType = "catalog" | "cart" | "wishlist";

// Caches
let productsCache: ProductType[] | null = null;
let cartProductsCache: ProductType[] | null = null;
let cartIdsCache: string[] | null = null;
let wishlistProductsCache: ProductType[] | null = null;
let wishlistIdsCache: string[] | null = null;

// Promises
let productsFetchPromise: Promise<ProductType[]> | null = null;
let cartProductsFetchPromise: Promise<ProductType[]> | null = null;
let cartIdsFetchPromise: Promise<string[]> | null = null;
let wishlistProductsFetchPromise: Promise<ProductType[]> | null = null;
let wishlistIdsFetchPromise: Promise<string[]> | null = null;

export const useLoadPageData = (pageType: PageType) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const userId = session?.user?.id;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        if (pageType === "catalog") {
          // Load all products
          if (productsCache) {
            dispatch(setProducts(productsCache));
          } else if (productsFetchPromise) {
            const products = await productsFetchPromise;
            dispatch(setProducts(products));
          } else {
            productsFetchPromise = getProducts();
            const products = await productsFetchPromise;
            productsCache = products;
            dispatch(setProducts(products));
            productsFetchPromise = null;
          }

          // Load wishlist IDs if authenticated
          if (status === "authenticated" && userId) {
            if (wishlistIdsCache) {
              dispatch(initializeWishList(wishlistIdsCache));
            } else if (wishlistIdsFetchPromise) {
              const ids = await wishlistIdsFetchPromise;
              dispatch(initializeWishList(ids));
            } else {
              wishlistIdsFetchPromise = getWishlistIds(userId);
              const ids = await wishlistIdsFetchPromise;
              wishlistIdsCache = ids;
              dispatch(initializeWishList(ids));
              wishlistIdsFetchPromise = null;
            }
          }
        } else if (pageType === "cart") {
          if (status === "unauthenticated") {
            dispatch(setProducts([]));
            setLoading(false);
            return;
          }

          if (!userId || status !== "authenticated") {
            return;
          }

          // Load cart IDs
          if (cartIdsCache) {
            dispatch(initializeCart(cartIdsCache));
          } else if (cartIdsFetchPromise) {
            const ids = await cartIdsFetchPromise;
            dispatch(initializeCart(ids));
          } else {
            cartIdsFetchPromise = getCartIds(userId);
            const ids = await cartIdsFetchPromise;
            cartIdsCache = ids;
            dispatch(initializeCart(ids));
            cartIdsFetchPromise = null;
          }

          // Load cart products
          if (cartProductsCache) {
            dispatch(setProducts(cartProductsCache));
          } else if (cartProductsFetchPromise) {
            const products = await cartProductsFetchPromise;
            dispatch(setProducts(products));
          } else {
            cartProductsFetchPromise = getCartProducts(userId);
            const products = await cartProductsFetchPromise;
            cartProductsCache = products;
            dispatch(setProducts(products));
            cartProductsFetchPromise = null;
          }
        } else if (pageType === "wishlist") {
          if (status === "unauthenticated") {
            dispatch(setProducts([]));
            setLoading(false);
            return;
          }

          if (!userId || status !== "authenticated") {
            return;
          }

          // Load wishlist IDs
          if (wishlistIdsCache) {
            dispatch(initializeWishList(wishlistIdsCache));
          } else if (wishlistIdsFetchPromise) {
            const ids = await wishlistIdsFetchPromise;
            dispatch(initializeWishList(ids));
          } else {
            wishlistIdsFetchPromise = getWishlistIds(userId);
            const ids = await wishlistIdsFetchPromise;
            wishlistIdsCache = ids;
            dispatch(initializeWishList(ids));
            wishlistIdsFetchPromise = null;
          }

          // Load wishlist products
          if (wishlistProductsCache) {
            dispatch(setProducts(wishlistProductsCache));
          } else if (wishlistProductsFetchPromise) {
            const products = await wishlistProductsFetchPromise;
            dispatch(setProducts(products));
          } else {
            wishlistProductsFetchPromise = getWishListProducts(userId);
            const products = await wishlistProductsFetchPromise;
            wishlistProductsCache = products;
            dispatch(setProducts(products));
            wishlistProductsFetchPromise = null;
          }
        }
      } catch (error) {
        console.error(`Error loading ${pageType} data:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pageType, userId, status, dispatch]);

  return { loading };
};
