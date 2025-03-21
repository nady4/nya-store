"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserWishlist } from "@/actions/wishlist";
import ProductList from "@/components/ProductList";
import SearchBar from "@/components/SearchBar";
import { useAppDispatch } from "@/store/hooks";
import { setProducts } from "@/store/slices/productsSlice";

export default function WishlistPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchWishlist() {
      if (session?.user?.id) {
        setLoading(true);
        const wishlistProducts = await getUserWishlist(session.user.id);
        dispatch(setProducts(wishlistProducts || []));
        setLoading(false);
      }
    }
    fetchWishlist();
  }, [session, dispatch]);

  return (
    <div className="home-container">
      <h1>My Wishlist</h1>
      <SearchBar />
      {loading ? (
        <div>Loading your wishlist...</div>
      ) : (
        <ProductList isWishlistPage={true} />
      )}
    </div>
  );
}
