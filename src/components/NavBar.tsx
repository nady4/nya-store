"use client";
import Link from "next/link";
import Image from "next/image";
import cat from "../../public/assets/cat.svg";
import Dropdown from "./Dropdown";
import signin from "../../public/assets/signin.svg";
import { useSession } from "next-auth/react";
import { silkscreen } from "@/app/fonts";
import "@/styles/Navbar.scss";

function NavBar() {
  const { data: session } = useSession();

  return (
    <div className={`${silkscreen.className} navbar-container`}>
      <h1 className="left-content">Nya Store</h1>
      <Link href="/" className="center-content">
        <Image src={cat} alt="cat" height={60} />
      </Link>
      {session ? (
        <Dropdown />
      ) : (
        <Link href="/auth/signin" className="right-content">
          <Image src={signin} alt="sign" height={50} />
        </Link>
      )}
    </div>
  );
}

export default NavBar;
