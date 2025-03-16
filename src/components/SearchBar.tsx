"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import search from "../../public/assets/icons/search.svg";
import PriceFilter from "./PriceFilter";
import { tomorrow } from "@/app/fonts";
import { ProductsType } from "@/types";
import "../styles/SearchBar.scss";

function SearchBar({ products }: ProductsType) {
  // Memoizar categorías para que no se recalculen en cada render
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const [activeCategories, setActiveCategories] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    setActiveCategories((prev) => {
      const newActiveCategories = { ...prev };

      categories.forEach((category) => {
        if (!(category in newActiveCategories)) {
          newActiveCategories[category] = true;
        }
      });

      return newActiveCategories;
    });
  }, [categories]);

  const onButtonClick = (category: string) => {
    setActiveCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="search-bar">
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={
              tomorrow.className +
              " category-button" +
              ` ${activeCategories[category] ? "active" : ""}`
            }
            onClick={() => onButtonClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="search-box">
        <input type="text" className={tomorrow.className + " search-input"} />
        <button className="search-button">
          <Image src={search} alt="search icon" height={20} />
        </button>
      </div>
      <PriceFilter min={0} max={100} step={1} />
    </div>
  );
}

export default SearchBar;
