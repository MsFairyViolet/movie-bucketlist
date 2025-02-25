import { useState, useEffect } from "react";
import MovieCard from "./MovieCard"
import moviesData from "../data/movies.json"


export default function MovieList() {

    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        setMovies(moviesData);
    }, []);


    const filteredMovies = searchQuery
        ? movies.filter((movie) => {
            const query = searchQuery.toLowerCase().trim()
            return (
                movie.title.toLowerCase().includes(query) ||
                movie.director.toLowerCase().includes(query) ||
                movie.year.toString() === query 
            );
        })
        : movies;

    return (
        <div  className="movie-list-container">
            <div className="search-bar">
                <input placeholder="Search title, year (YYYY), or director..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
            <div>
                {filteredMovies.length > 0 ? (
                    <div className="movie-list">
                        {filteredMovies.map((movie) => {
                            return <MovieCard key={movie.id} movie={movie} />
                        })}
                    </div>
                ) : (
                    <p className="no-results">No movies found</p>
                )}
            </div>
        </div>
    )
}