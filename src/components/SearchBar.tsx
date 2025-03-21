"use client";
import Image from "next/image";
import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSearchTerm } from "@/store/slices/searchTermSlice";
import { toggleCategory } from "@/store/slices/categorySlice";
import { tomorrow } from "@/app/fonts";
import PriceFilter from "./PriceFilter";
import search from "../../public/assets/icons/search.svg";
import "../styles/SearchBar.scss";

function SearchBar() {
  const dispatch = useAppDispatch();
  const { categories, activeCategories } = useAppSelector(
    (state) => state.category
  );
  const searchTerm = useAppSelector((state) => state.searchTerm);

  const onCategoriesClick = useCallback(
    (category: string) => {
      dispatch(toggleCategory(category));
    },
    [dispatch]
  );

  return (
    <div className="search-bar">
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`${tomorrow.className} category-button ${
              activeCategories[category] ? "active" : ""
            }`}
            onClick={() => onCategoriesClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="search-box">
        <input
          type="text"
          className={`${tomorrow.className} search-input`}
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <button
          className="search-button"
          onClick={() => dispatch(setSearchTerm(searchTerm))}
        >
          <Image src={search} alt="search icon" height={20} />
        </button>
      </div>
      <PriceFilter />
    </div>
  );
}

export default SearchBar;
