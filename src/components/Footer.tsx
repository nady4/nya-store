import pixelHeart from "../../public/assets/icons/pixelHeart.svg";
import Image from "next/image";
import { silkscreen } from "@/app/fonts";
import "@/styles/Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <a href="https://github.com/nady4/nya-store">
        <h3 className={`${silkscreen.className} footer-text`}>
          Made with <Image src={pixelHeart} alt="pixel heart" height={20} /> by{" "}
          nady4
        </h3>
      </a>
    </div>
  );
}

export default Footer;
