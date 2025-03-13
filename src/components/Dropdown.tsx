import Link from "next/link";
import Image from "next/image";
import user from "../../public/assets/user.svg";
import cart from "../../public/assets/cart.svg";
import heart from "../../public/assets/heart.svg";
import truck from "../../public/assets/truck.svg";
import gear from "../../public/assets/gear.svg";
import logout from "../../public/assets/logout.svg";
import "@/styles/Dropdown.scss";
import { useRef, useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function Dropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        event.target instanceof Element &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-wrapper right-content">
      <Image
        ref={buttonRef}
        src={user}
        alt="user icon"
        height={40}
        className="dropdown-switch"
        onClick={toggleDropdown}
      />
      <div
        className={`dropdown-container ${isOpen ? "open" : "closed"}`}
        ref={dropdownRef}
      >
        <Link href="/cart">
          <Image src={cart} alt="cart button" />
          <h3>Cart</h3>
        </Link>
        <Link href="/orders">
          <Image src={truck} alt="orders button" />
          <h3>Orders</h3>
        </Link>
        <Link href="/wishlists">
          <Image src={heart} alt="wishlists button" />
          <h3>Wishlists</h3>
        </Link>
        <Link href="/userconfig">
          <Image src={gear} alt="user configuration button" />
          <h3>Settings</h3>
        </Link>
        <a onClick={() => signOut()}>
          <Image src={logout} alt="logout button" height={26} />
          <h3>Logout</h3>
        </a>
      </div>
    </div>
  );
}
