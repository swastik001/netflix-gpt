import React from "react";

const VideoTitle = ({ title, posterPath, overview }) => {
  return (
    <div className=" w-screen aspect-video pt-[20%]  px-24 absolute text-white bg-gradient-to-r from-black  ">
      <h1 className="text-6xl font-bold">{title}</h1>
      {/* <img
        className="rounded-full w-32 h-32 "
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
      /> */}
      <p className="py-7 text-lg w-1/4">{overview.slice(0, 100)}...</p>
      <div>
        <button className="bg-white px-12 py-4 rounded-md text-xl text-black  rounded-lg hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className=" mx-2 bg-gray-500  px-12 py-4 rounded-md text-xl text-white  rounded-lg hover:bg-opacity-80">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
