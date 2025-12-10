import '../App.css';
import { useState, useEffect, useContext, use } from 'react';
import { Play, User } from "lucide-react";
import Searchh from '../components/Search';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import Featured from '../components/Featured';
import { Link } from "react-router-dom";

function Homepage(){
  const [searchTerm, setSeacrchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [featured, setFeatured] = useState([]);
  const isLoggedIn = !!localStorage.getItem("access")

  // All Movies
  useEffect ( () =>{
    fetch('http://127.0.0.1:8000/api/movies/')
    .then(response => response.json())
    .then((data) => {
      setMovies(data.results || [])
      setIsloading(false)
    })
    .catch((err => 
      {console.error(err);
      setIsloading(false);
    }));
  }, [])

  // Popular Movies
  useEffect( () => {
    fetch('http://127.0.0.1:8000/api/movies/popular')
    .then(res => res.json())
    .then(data => setPopular(data.results ?? data));
  }, []);

  // Top Rated Movies
  useEffect( () => {
    fetch('http://127.0.0.1:8000/api/movies/top_rated')
    .then(res => res.json())
    .then(data => setTopRated(data.results ?? data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/featured")
    .then(res => res.json())
    .then(data => setFeatured(data.results ?? data));
  }, []);
  
  if (!movies) return <div className="text-white p-10">Loading...</div>;
  
  return(
      <div className="min-h-screen bg-grey " >
        <header className="fixed top-0 left-0 right-0 z-50 bg-grey/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="size-8 text-red-600 fill-600" />
                <span className="text-white">DreamyBull</span>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="text-white/70 hover:text-white transition-colors">Movies</a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">TV Shows</a>
                { !isLoggedIn ? <Link to={`/Login`} className="text-white/70 hover:text-white transition-colors">Login</Link> : <Link to={`/user`} className="text-white/70 hover:text-white transition-colors"><User/></Link>}
              </nav>
            </div>
          </div>
        </header>
        <div className='wrapper pt-[90px]'>
          <header>
            <Searchh onResults={(searched) => setSeacrchTerm(searched)}/>
          </header>
          <Featured movie={featured}/>
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {popular.slice(0, 10).map((movie, index) => (
                <li key={movie.id} className = 'top-rated'>
                <p>{index + 1}</p>
                <img src={ `http://127.0.0.1:8000${movie.poster}`} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
          <section className='trending'>
            <h2>Top Rated Movies</h2>
            <ul>
              {topRated.slice(0, 10).map((movie, index) => (
                <li key={movie.id} className = 'top-rated'>
                <p>{index + 1}</p>
                <img src={ `http://127.0.0.1:8000${movie.poster}`} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
{/* Valerius is your daddy */}
          <section className='all-movies'>
            <h2 className='mt-20'>All Movies</h2>
            {isloading ? (
              <p><Spinner/></p>
            ) : errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <ul>
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
          )}
          </section>
        </div>
      </div>
  );
}

export default Homepage;
