"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { silkscreen } from "@/app/fonts";
import { cat, signin } from "../../public/assets/icons";
import Dropdown from "./Dropdown";
import "@/styles/Navbar.scss";

function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className={`${silkscreen.className} navbar-container`}>
      <h1 className="left-content">Nya Store</h1>
      <Link href="/" className="center-content">
        <Image src={cat} alt="Home" height={60} />
      </Link>
      {session ? (
        <Dropdown />
      ) : (
        <Link href="/auth/signin" className="right-content">
          <Image src={signin} alt="Sign in" height={50} />
        </Link>
      )}
    </nav>
  );
}

export default NavBar;
