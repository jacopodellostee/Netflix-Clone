import React from "react";

export default function SearchResultItem({ item, onClick }) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const year = date ? `(${new Date(date).getFullYear()})` : "";

  return (
    <div 
      className="flex items-center gap-3 p-3 cursor-pointer hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-0 bg-black" 
      onClick={() => onClick(item)}
    >
      <img
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
            : "https://via.placeholder.com/50x75?text=No+Img"
        }
        alt={title}
        className="w-[40px] h-[60px] object-cover rounded shadow-sm flex-shrink-0"
      />
      <div className="flex flex-col min-w-0"> {/* min-w-0 aiuta col text-truncate */}
        <span className="text-sm font-semibold text-white truncate pr-2">
            {title} <span className="text-zinc-500 font-normal ml-1">{year}</span>
        </span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">
            {item.media_type === 'movie' ? 'Film' : 'TV Series'}
        </span>
      </div>
    </div>
  );
}