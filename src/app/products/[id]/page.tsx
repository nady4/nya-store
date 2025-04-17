"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGetProduct } from "@/hooks/useGetProduct";
import { useToggleWishlist } from "@/hooks/useToggleWishlist";
import ProductCard from "@/components/ProductCard";
import RelatedProducts from "@/components/RelatedProducts";
import { heart, heartFilled } from "../../../../public/assets/icons";
import "../../../styles/Product.scss";

function ProductPage() {
  const id = usePathname().split("/")[2];
  const { product, relatedProducts, loading, error } = useGetProduct(id);
  const { isWishlisted, onHeartClick } = useToggleWishlist(id);

  if (loading || !product) return <div className="item">Loading...</div>;
  if (error) return <div className="item">{error.message}</div>;

  return (
    <div className="page">
      <div className="item">
        <ProductCard product={product} />
        <div className="right">
          <button className="heart-button" onClick={onHeartClick}>
            <Image
              src={isWishlisted ? heartFilled : heart}
              alt="heart"
              width={40}
              height={40}
              className="heart"
            />
          </button>
        </div>
      </div>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}

export default ProductPage;
