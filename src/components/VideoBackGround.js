import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackGround = ({ movieId }) => {
  const trailerVideo = useSelector((s) => s.movies?.trailerVideo);
  useMovieTrailer(movieId);

  if (!trailerVideo?.key) return null;

  const src =
    `https://www.youtube.com/embed/${trailerVideo.key}` +
    `?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}` +
    `&modestbranding=1&rel=0&playsinline=1`;

  return (
    <div className="w-screen">
      <iframe
        key={trailerVideo.key} // forces re-mount if key changes
        className="w-screen aspect-video"
        src={src}
        title="Trailer"
        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
};

export default VideoBackGround;
