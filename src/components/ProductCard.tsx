import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useToggleCartProduct, useToggleWishlist } from "@/hooks/useToggleData";
import { heart, heartFilled, cart } from "../../public/assets/icons";
import { silkscreen, tomorrow } from "@/app/fonts";
import { ProductType } from "@/types";
import { updateCartQuantity } from "@/actions/cart";

interface ProductCardProps extends ProductType {
  showRemoveButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  photo,
}) => {
  const { data: session } = useSession();
  const { isWishlisted, onHeartClick } = useToggleWishlist(id);
  const { isInCart, onCartClick } = useToggleCartProduct(id);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isInCart) {
      setQuantity(1);
    }
  }, [isInCart]);

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session?.user?.id) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartQuantity(session.user.id, id, newQuantity);
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session?.user?.id) return;
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    updateCartQuantity(session.user.id, id, newQuantity);
  };

  return (
    <Link href={`/products/${id}`} passHref>
      <div className={"product-card"}>
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
          ${price?.toFixed(2)}
        </p>
        <div className="bottom">
          <button
            className={
              silkscreen.className + " button" + (isInCart ? " isInCart" : "")
            }
            onClick={onCartClick}
          >
            <Image src={cart} className="button-icon" alt="cart icon" />
            {isInCart ? "Remove from cart" : "Add to cart"}
          </button>
          {isInCart && (
            <div className="quantity-controls">
              <button onClick={handleDecreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
