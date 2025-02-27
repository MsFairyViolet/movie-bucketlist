import { useState, useEffect } from "react";
import MovieInfoCard from "./MovieInfoCard"
import MovieCard from "./MovieCard"
import moviesData from "../data/movies.json"

const groupMoviesBySeries = (movies) => {
    const seriesMap = {}
    const standalone = []

    movies.forEach(movie => {
        if (!seriesMap[movie.series_id]){
            seriesMap[movie.series_id] = []
        }
        seriesMap[movie.series_id].push(movie)
    })

    const series = []
    Object.values(seriesMap).forEach(group => {
        if (group.length === 1){
            standalone.push(group[0])
        } else {
            series.push(group)
        }
    })
    return { series, standalone }
}

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

    const [selectedMovie, setSelectedMovie] = useState(null)

    const showMovieInfo = (movie) => {
        setSelectedMovie(movie)
    }

    const closeMovieInfo = () => {
        setSelectedMovie(null)
    }

    return (
        <div className="movie-list-container">
            <div className="search-bar">
                <input placeholder="Search title, year (YYYY), or director..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="info-card">{selectedMovie !== null ? <MovieInfoCard movie={selectedMovie} closeMovieInfo={closeMovieInfo}/> : null}</div>
            <div>
                {filteredMovies.length > 0 ? (
                    <div className="movie-list">
                        {filteredMovies.map((movie) => {
                            return <MovieCard key={movie.id} movie={movie} showMovieInfo={showMovieInfo}/>
                        })}
                    </div>
                ) : (
                    <p className="no-results">No movies found</p>
                )}
            </div>
        </div>
    )
}