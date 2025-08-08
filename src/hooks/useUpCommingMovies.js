import { useDispatch } from "react-redux";
import { addNowPlayingMovies, addUpCommingMovies } from "../ulits/moviesSlice";
import { API_OPTIONS } from "../ulits/constant";
import { useEffect } from "react";

const useUpCommingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpCommingMovies(json.results));
  };
  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};
export default useUpCommingMovies;
