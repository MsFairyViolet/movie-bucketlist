import { useState, useEffect } from "react";
import MovieInfoCard from "./MovieInfoCard"
import MovieCard from "./MovieCard"
import moviesData from "../data/movies.json"
import SeriesCard from "./SeriesCard";

function groupMoviesBySeries(movies) {
    const grouped = movies.reduce((acc, movie) => {
        if (!movie || !movie.series_id) {
            return acc;
        }
        if (!acc[movie.series_id]) {
            acc[movie.series_id] = [];
        }
        acc[movie.series_id].push(movie);
        return acc;
    }, {});

    return Object.values(grouped)
        .filter(group => group.length > 0)
        .map(group =>
            group.length === 1 ? group[0] : { series_id: group[0].series_id, movies: group }
        );
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

    const groupedMovies = groupMoviesBySeries(filteredMovies)

    return (
        <div className="movie-list-container">
            <div className="search-bar">
                <input placeholder="Search title, year (YYYY), or director..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="info-card">{selectedMovie !== null ? <MovieInfoCard movie={selectedMovie} closeMovieInfo={closeMovieInfo} /> : null}</div>
            <div>
                {filteredMovies.length > 0 ? (
                    <div className="movie-list">
                        {groupedMovies.map(item =>
                            Array.isArray(item.movies) && item.movies.length > 0 ? (
                                <SeriesCard key={`series-${item.series_id}`} series={item} showMovieInfo={showMovieInfo} />
                            ) : (
                                <MovieCard key={item.id} movie={item} showMovieInfo={showMovieInfo}/>
                            )
                        )}
                    </div>
                ) : (
                    <p className="no-results">No movies found</p>
                )}
            </div>
        </div>
    )
}