import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

export default function MovieList({ title, movies = [] }) {
  const scrollerRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amt = Math.round(el.clientWidth * 0.9); // page-like jump
    el.scrollBy({ left: dir * amt, behavior: "smooth" });
  };

  return (
    <section className="px-6">
      <h2 className="text-3xl py-4 text-white">{title}</h2>

      <div className="group relative">
        {/* Left arrow */}
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByAmount(-1)}
          disabled={atStart}
          className={`absolute left-0 top-0 h-full w-12 hidden md:flex items-center justify-center
            bg-gradient-to-r from-black/70 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity
            ${atStart ? "pointer-events-none opacity-0" : ""}`}
        >
          <svg
            className="w-14 h-8 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByAmount(1)}
          disabled={atEnd}
          className={`absolute right-0 top-0 h-full w-12 hidden md:flex items-center justify-center
            bg-gradient-to-l from-black/70 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity
            ${atEnd ? "pointer-events-none opacity-0" : ""}`}
        >
          <svg
            className="w-14 h-8 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L12.17 12z" />
          </svg>
        </button>

        {/* Scroll area */}
        <div
          ref={scrollerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div className="flex gap-4 w-max pr-8">
            {movies &&
              movies.map((m) => (
                <div key={m.id} className="shrink-0">
                  <MovieCard posterPath={m.poster_path} movie={m} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
