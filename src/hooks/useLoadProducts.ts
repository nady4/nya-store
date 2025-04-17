"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../actions/products";
import { setProducts } from "../store/slices/productsSlice";

export const useLoadProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getProducts();
        dispatch(setProducts(products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [dispatch]);
};
