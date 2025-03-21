"use client";
import Image from "next/image";
import { silkscreen } from "@/app/fonts";
import { pixelHeart } from "../../public/assets/icons";
import "@/styles/Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://github.com/nady4/nya-store"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className={`${silkscreen.className} footer-text`}>
          Made with <Image src={pixelHeart} alt="Love" height={20} /> by nady4
        </h3>
      </a>
    </footer>
  );
}

export default Footer;
