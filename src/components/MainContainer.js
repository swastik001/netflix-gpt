import React from "react";
import { useSelector } from "react-redux";
import VideoBackGround from "./VideoBackGround";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  //   isko bolte hain early return
  //   agar movies null hai to return kar do
  if (!movies) return;

  const mainMovie = movies[1];
  const { original_title, overview, poster_path, id } = mainMovie;
  return (
    <div>
      <VideoTitle
        title={original_title}
        posterPath={poster_path}
        overview={overview}
      />
      <VideoBackGround movieId={id} />
    </div>
  );
};

export default MainContainer;
