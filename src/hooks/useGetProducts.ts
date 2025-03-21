"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../store/slices/productsSlice";
import { getProducts } from "../actions/products";

export const useGetProducts = () => {
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
