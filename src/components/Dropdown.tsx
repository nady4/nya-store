"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  menu,
  cart,
  house,
  heart,
  truck,
  gear,
  logout,
} from "../../public/assets/icons";
import "@/styles/Dropdown.scss";

export default function Dropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      buttonRef.current &&
      event.target instanceof Element &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="dropdown-wrapper right-content">
      <button
        ref={buttonRef}
        className="dropdown-switch"
        onClick={toggleDropdown}
      >
        <Image src={menu} alt="Menu" height={60} />
      </button>
      <div
        className={`dropdown-container ${isOpen ? "open" : "closed"}`}
        ref={dropdownRef}
      >
      <Link href="/wishlist">
        <Image src={heart} alt="Wishlist" />
        <h3>Wishlist</h3>
      </Link>
      <Link href="/cart">
        <Image src={cart} alt="Cart" />
        <h3>Cart</h3>
      </Link>
        <Link href="/orders">
          <Image src={truck} alt="Orders" />
          <h3>Orders</h3>
        </Link>
        <Link href="/address">
          <Image src={house} alt="Address" />
          <h3>Address</h3>
        </Link>
        <Link href="/settings">
          <Image src={gear} alt="Settings" />
          <h3>Settings</h3>
        </Link>
        <a onClick={() => signOut({ callbackUrl: "/" })}>
          <Image src={logout} alt="Logout" height={26} />
          <h3>Logout</h3>
        </a>
      </div>
    </div>
  );
}
