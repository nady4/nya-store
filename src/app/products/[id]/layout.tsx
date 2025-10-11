"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useInitializeWishList } from "@/hooks/useInitializeWishList";
import { useInitializeCart } from "@/hooks/useInitializeCart";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  useInitializeWishList(userId);
  useInitializeCart(userId);

  return <>{children}</>;
};

export default DefaultLayout;
