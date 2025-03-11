"use client";
import Link from "next/link";
import Image from "next/image";
import cat from "../../public/assets/cat.svg";
import Dropdown from "./Dropdown";
import { silkscreen } from "@/app/fonts";
import "@/styles/Navbar.scss";

function NavBar() {
  return (
    <div className={`${silkscreen.className} navbar-container`}>
      <h1>Nya Store</h1>
      <Link href="/">
        <Image src={cat} alt="cat" height={60} />
      </Link>
      <Dropdown />
    </div>
  );
}

export default NavBar;
