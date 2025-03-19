"use client";
import { useSession } from "next-auth/react";
import Catalog from "@/components/Catalog";
import { getUserWishlist } from "@/actions/wishlist";
import { useEffect, useState } from "react";
import { ProductType } from "@/types";

export default function WishlistPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    async function fetchWishlist() {
      if (session?.user?.id) {
        const wishlistProducts = await getUserWishlist(session.user.id);
        setProducts(wishlistProducts);
      }
    }

    fetchWishlist();
  }, [session]);

  if (products) {
    return <Catalog products={products} />;
  }
  return <div>Loading...</div>;
}
