import Image from "next/image";
import Link from "next/link";
import { useToggleWishlist } from "@/hooks/useToggleWishlist";
import { silkscreen, tomorrow } from "@/app/fonts";
import { CatalogCardProps } from "@/types";
import { heart, heartFilled } from "../../public/assets/icons";

const CatalogCard: React.FC<CatalogCardProps> = ({
  id,
  name,
  price,
  photo,
}) => {
  const { isWishlisted, onHeartClick } = useToggleWishlist(id);

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

export default CatalogCard;
