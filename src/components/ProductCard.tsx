import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToWishList,
  removeFromWishList,
} from "@/store/slices/wishListSlice";
import { toggleWishlist } from "@/actions/wishlist";
import { ProductType } from "@/types";
import { silkscreen, tomorrow } from "@/app/fonts";
import heart from "../../public/assets/icons/heart.svg";
import heartFilled from "../../public/assets/icons/heartFilled.svg";

const ProductCard: React.FC<ProductType> = ({ id, name, price, photo }) => {
  const wishList = useAppSelector((state) => state.wishList);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const onHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (userId)
      if (wishList.includes(id)) {
        dispatch(removeFromWishList(id));
        toggleWishlist(userId, id);
      } else {
        dispatch(addToWishList(id));
        toggleWishlist(userId, id);
      }
  };

  return (
    <Link href={`/products/${id}`} passHref>
      <div className="product-card" key={id}>
        <Image
          src={photo}
          alt={name}
          width={200}
          height={200}
          className="product-image"
        />
        <button className="product-heart-button" onClick={onHeartClick}>
          <Image
            src={wishList.includes(id) ? heartFilled : heart}
            alt="heart"
            width={40}
            height={40}
            className="product-heart"
          />
        </button>
        <h2 className={tomorrow.className + " product-title"}>{name}</h2>
        <p className={silkscreen.className + " product-price"}>
          ${price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
