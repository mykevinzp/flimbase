import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Footer from "./Footer";
import Navigation from "./Navigation";

import './App.css';
import SearchIcon from './search.svg';


const API_URL = ' http://www.omdbapi.com/?i=tt3896198&apikey=577e2177';


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }
    useEffect(() => {
        searchMovies('')
    }, []);


    return (
        <div className="app-wrapper">
            <Navigation />
            <div className="app">
                <h1>FilmBase</h1>
                <p>search for any movie</p>

                <div className="search">
                    <input
                        placeholder="search for movies"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img
                        src={SearchIcon}
                        alt="serach"
                        onClick={() => searchMovies(searchTerm)}
                    />
                </div>
                {
                    movies?.length > 0 ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>search for a movie</h2>
                        </div>
                    )
                }
            </div>

            <Footer />
        </div>
    );

}

export default App;