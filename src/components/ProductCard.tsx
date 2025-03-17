import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/types";
import { silkscreen, tomorrow } from "@/app/fonts";
import heart from "../../public/assets/icons/heart.svg";

const ProductCard: React.FC<ProductType> = ({ id, name, price, photo }) => {
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
        <Image
          src={heart}
          alt="heart"
          width={30}
          height={30}
          className="product-heart"
        />
        <h2 className={tomorrow.className + " product-title"}>{name}</h2>
        <p className={silkscreen.className + " product-price"}>
          ${price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
