import { useEffect } from "react";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Featured = ({movie}) => {

    if (!movie) return null;

    const { id, title, poster, release_date, genre, rating, duration, overview} = movie;
    return(
    <div className="relative h-[90vh] mt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={`http://127.0.0.1:8000${poster}`}
          alt={title}
          className="w-full h-full object-cover object-center rounded-lg"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl md:max-w-2xl">
          <h1 className="text-5xl md:text-6xl mb-4">{title}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-white/80">
            <span className="flex items-center gap-1">
              ⭐ {rating}
            </span>
            <span>{release_date}</span>
            <span>{duration}</span>

          </div>
          <p className="text-lg text-white/90 mb-8 max-w-xl">
            {overview}
          </p>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <Play className="size-5 fill-white" />
              Play Now
            </button>
            <button
            
              className="flex items-center gap-2 px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors"
            >
               <Link to={`/movies/${id}/`} style={{ textDecoration: "none", color: "inherit" }}>
              <Info className="size-5" />
              More Info
              </Link> 
            </button>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Featured;