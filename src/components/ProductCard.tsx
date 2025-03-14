import Image from "next/image";
import Link from "next/link";
import { silkscreen, tomorrow } from "@/app/fonts";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  photo: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, price, photo }) => {
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
        <h2 className={tomorrow.className + " product-title"}>{name}</h2>
        <p className={silkscreen.className + " product-price"}>
          ${price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
