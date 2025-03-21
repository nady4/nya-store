import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import {
  addToWishList,
  removeFromWishList,
} from "@/store/slices/wishListSlice";
import { useCallback, useMemo } from "react";
import { toggleWishlistProduct } from "@/actions/wishlist";
import { silkscreen, tomorrow } from "@/app/fonts";
import { ProductCardProps } from "@/types";
import heart from "../../public/assets/icons/heart.svg";
import heartFilled from "../../public/assets/icons/heartFilled.svg";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  photo,
  wishListIds,
  userId,
}) => {
  const dispatch = useAppDispatch();

  const isWishlisted = useMemo(
    () => wishListIds.includes(id),
    [wishListIds, id]
  );

  const onHeartClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isWishlisted) {
        dispatch(removeFromWishList(id));
      } else {
        dispatch(addToWishList(id));
      }
      toggleWishlistProduct(userId, id);
    },
    [dispatch, id, isWishlisted, userId]
  );

  return (
    <Link href={`/products/${id}`} passHref>
      <div className="product-card">
        <Image
          src={photo}
          alt={name}
          width={200}
          height={200}
          className="product-image"
        />
        <button className="product-heart-button" onClick={onHeartClick}>
          <Image
            src={isWishlisted ? heartFilled : heart}
            alt="heart"
            width={40}
            height={40}
            className="product-heart"
          />
        </button>
        <h2 className={`${tomorrow.className} product-title`}>{name}</h2>
        <p className={`${silkscreen.className} product-price`}>
          ${price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
