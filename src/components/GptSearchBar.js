import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { lang } from "../ulits/languageContant"; // keeping your path
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../ulits/constant";
import { addGptMovieResults } from "../ulits/gptSlice";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const languageKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [err, setErr] = useState("");

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    try {
      setErr("");

      const q = (searchText.current?.value || "").trim();
      if (!q) {
        setErr("Type what kind of movies you want (mood/genre/examples).");
        return;
      }

      // Create Gemini model with JSON array schema
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "array",
            items: { type: "string" }, // Only array of strings
          },
        },
      });

      // Prompt Gemini to only return movie titles
      const prompt = `
You are a movie curator. Based on this user input:
"${q}"

Suggest exactly 5 well-known movies.
Return ONLY a JSON array of movie titles.
Example: ["The Godfather", "Inception", "Titanic", "The Dark Knight", "Avatar", "Forrest Gump", "Gladiator", "The Matrix"]
`;

      const result = await model.generateContent(prompt);

      // Parse the JSON array
      const gptMovies = JSON.parse(result.response.text());

      // this will give promise array right?why??todo
      const promiseArray = gptMovies.map(
        async (movie) => await searchMovieTMDB(movie)
      );

      const tmdbResults = await Promise.all(promiseArray);
      dispatch(
        addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (e) {
      console.error(e);
      setErr("Couldn’t fetch suggestions-" + e.message);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={
            lang[languageKey]?.GptSearchPlaceholder ?? "What kind of movies?"
          }
        />
        <button
          className="bg-red-700 text-white py-2 px-4 rounded-lg col-span-3 m-4"
          onClick={handleGptSearchClick}
          type="button"
        >
          {lang[languageKey]?.search ?? "Search"}
        </button>
        {err && (
          <div className="col-span-12 text-red-400 px-4 pb-4 -mt-2 text-sm">
            {err}
          </div>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
