"use client";
import Image from "next/image";
import { tomorrow, silkscreen } from "@/app/fonts";
import { cart } from "../../public/assets/icons";
import { ProductType } from "@/types";

const ProductCard = ({ product }: { product: ProductType }) => (
  <>
    <div className="left">
      <Image src={product.photo} alt={product.name} height={300} width={300} />
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
        <button className={silkscreen.className + " button"}>
          <Image src={cart} className="button-icon" alt="cart icon" />
          Add to Cart
        </button>
      </div>
    </div>
  </>
);

export default ProductCard;
