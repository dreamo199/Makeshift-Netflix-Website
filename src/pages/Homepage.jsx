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
  const [results, setResults] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const isLoggedIn = !!localStorage.getItem("access")

  // All Movies
  useEffect ( () =>{
    async function loadMovies() {
    const res = await fetch('http://127.0.0.1:8000/api/movies/')
    const data = await res.json();
      setMovies(data.results || [])
      setResults(data.results)
      setNextPage(data.next)
      setPrevPage(data.previous)
      console.log(data.next)
      setIsloading(false)
    }
    loadMovies();
  }, [])
  
  const handleSearch = async(query) => {
      
          if (query.trim() == ""){
            setResults(movies);
            return;
          }
      
          const res = await fetch(`http://127.0.0.1:8000/api/search/movie/?search=${query}`);
          const data = await res.json();
          setResults(data.results || []);
          console.log(data)
        }

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
            <Searchh onSearch={handleSearch}/>
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
          <section className='all-movies'>
            <h2 className='mt-20'>All Movies</h2>
            {isloading ? (
              <p><Spinner/></p>
            ) : errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <ul>
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
          )}
          </section>
          <div className='flex justify-center gap-4 mt-6'>
            <button disabled={!prevPage} onClick={ async () => {
          const res = await fetch(prevPage);
          const data = await res.json();
          setMovies(data.results)
          setNextPage(data.next)
          setPrevPage(data.previous)
        }} className='px-4 py-2 rounded-md text-white ${nextPage ? "bg-blue-600 : bg-gray-600 opacity-50"}'>
          Previous
        </button>
        <button disabled={!nextPage} onClick={() => loadMovies(nextPagel)} className='px-4 py-2 rounded-md text-white ${nextPage ? "bg-blue-600 : bg-gray-600 opacity-50"}'>
          Next
        </button>
          </div>
        </div>
      </div>
  );
}

export default Homepage;
