import { IMG_CDN_URL } from "../ulits/constant";

const MovieCard = ({ posterPath, movie }) => {
  if (!posterPath) return null; // Handle case where posterPath is not available
  return (
    <div className="w-48 pr-4">
      <img
        alt={"movie card" + "-" + movie.title}
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard;
