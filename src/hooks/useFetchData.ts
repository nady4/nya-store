"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getProduct, getProducts } from "../actions/products";
import { setProducts } from "../store/slices/productsSlice";
import { ProductType, UseFetchDataReturn } from "../types";

export const useFetchData = (id?: string): UseFetchDataReturn => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [internalProducts, setInternalProducts] = useState<
    ProductType[] | null
  >(null);
  const [internalLoading, setInternalLoading] = useState(true);
  const [internalError, setInternalError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData() {
      setInternalLoading(true);
      setInternalError(null);

      try {
        if (id) {
          const productData = await getProduct(id);
          if (signal.aborted) return;
          setProduct(productData);
        } else {
          const productsData = await getProducts();
          if (signal.aborted) return;

          if (Array.isArray(productsData)) {
            dispatch(setProducts(productsData));
            setInternalProducts(productsData);
          } else {
            console.error(
              "Received non-array data for products:",
              productsData
            );
            throw new Error("Invalid data format received for products.");
          }
        }
      } catch (err: unknown) {
        if (signal.aborted) {
          console.log("Fetch aborted");
          return;
        }
        let errorMessage = "An unexpected error occurred";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }

        // Update internal error state
        if (id) {
          setInternalError(`Failed to load product: ${errorMessage}`);
          console.error("Error fetching product:", err);
          setProduct(null); // Ensure product is null on error
        } else {
          setInternalError(`Failed to load products: ${errorMessage}`);
          console.error("Error fetching products:", err);
          setInternalProducts(null); // Ensure products are null on error
        }
      } finally {
        // Only set loading to false if the fetch wasn't aborted prematurely
        if (!signal.aborted) {
          setInternalLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [id, dispatch]);

  return useMemo(() => {
    return id
      ? {
          product,
          products: null,
          loading: internalLoading,
          error: internalError,
        }
      : {
          product: null,
          products: internalProducts,
          loading: internalLoading,
          error: internalError,
        };
  }, [id, internalProducts, internalLoading, internalError, product]);
};
