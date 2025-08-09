import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../ulits/moviesSlice";
import { API_OPTIONS } from "../ulits/constant";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const getNowPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };
  useEffect(() => {
    !popularMovies && getNowPopularMovies();
  }, []);
};
export default usePopularMovies;
