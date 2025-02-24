import { useState, useEffect } from "react";
import MovieCard from "./MovieCard"
import moviesData from "../data/movies.json"


export default function MovieList() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        setMovies(moviesData)
    }, [])

    return (
        <div className="movie-list-container">
            <h2>MovieList</h2>
            <div className="movie-list">
                {movies.map((movie) => {
                    return <MovieCard key={movie.id} title={movie.title} year={movie.year} director={movie.director} />
                })}
            </div>
        </div>
    )
}