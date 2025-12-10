import { Star } from "lucide-react";
import { Link } from "react-router-dom"

const MovieCard = ({ movie }) => {
  const { id, title, poster, release_date, genre, rating } = movie;

  return (
    <Link to={`/movies/${id}/`} style={{ textDecoration: "none", color: "inherit" }}>
      <div  className="cursor-pointer">
        <div className="movie-card h-[auto]">
          <img src={poster} alt={title}/>
          <div className="mt-4">
            <strong><h3>{title}</h3></strong>

            {/* Rating + Year */}
            <div className="content">
              <div className="rating">
                <Star className="size-4 fill-yellow-500 text-yellow-500"/>
                <p>{rating ? rating.toFixed(1) : 'N/A'}</p>
              </div>

              <span>•</span>
              <p className="year">
                {release_date ? release_date : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
