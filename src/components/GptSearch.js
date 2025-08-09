import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../ulits/constant";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10 inset-0">
        <img
          alt="hero-banner"
          className="w-full h-screen object-cover"
          src={BG_URL}
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
