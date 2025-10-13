"use client";
import Image from "next/image";
import { useToggleCartProduct } from "@/hooks/useToggleData";
import { tomorrow, silkscreen } from "@/app/fonts";
import { cart } from "../../public/assets/icons";
import { ProductType } from "@/types";

function ProductCard({ product }: { product: ProductType }) {
  const { isInCart, onCartClick } = useToggleCartProduct(product.id);

  return (
    <>
      <div className="left">
        <Image
          src={product.photo}
          alt={product.name}
          height={300}
          width={300}
        />
      </div>
      <div className="center">
        <div className="top">
          <h2 className={tomorrow.className + " name"}>{product.name}</h2>
          <p className={tomorrow.className + " category"}>{product.category}</p>
          <p className={silkscreen.className + " price"}>
            ${product.price.toFixed(2)}
          </p>
        </div>
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
        </div>
      </div>
    </>
  );
}

export default ProductCard;
