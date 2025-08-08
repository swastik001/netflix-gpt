import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSearchSuggestions from "./GptSearchSuggestions";
import { BG_URL } from "../ulits/constant";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10 inset-0">
        <img
          alt="hero-banner"
          className="w-full h-screen object-cover"
          src={BG_URL}
        />
      </div>
      <GptSearchBar />
      <GptSearchSuggestions />
    </div>
  );
};

export default GptSearch;
