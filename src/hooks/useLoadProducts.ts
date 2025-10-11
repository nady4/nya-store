"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../actions/products";
import { setProducts } from "../store/slices/productsSlice";
import { ProductType } from "../types";

let productsCache: ProductType[] | null = null;

export const useLoadProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (productsCache) {
      dispatch(setProducts(productsCache));
      return;
    }

    async function fetchProducts() {
      const products = await getProducts();
      productsCache = products;
      dispatch(setProducts(products));
    }

    fetchProducts();
  }, [dispatch]);
};
