import { useState, useEffect } from "react";
import moviesData from "../data/movies.json"
import InfoCard from "./InfoCard";
import MovieGraphic from "./MovieGraphic";
import ColorPalette from "./ColorPalette";

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
                movie.year.toString() === query ||
                movie.genre.toString().toLowerCase().includes(query)
            )
        })
        : movies;

    const [selectedInfo, setSelectedInfo] = useState(null)

    const showInfo = (movie) => {
        setSelectedInfo(movie)
    }

    const closeInfo = () => {
        setSelectedInfo(null)
    }

    const groupedMovies = groupMoviesBySeries(filteredMovies)

    return (
        <div className="movie-list-container">
            <ColorPalette/>
            <div className="search-bar">
                <input placeholder="Search title, year (YYYY), genre or director..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="info-card">{selectedInfo !== null ? <InfoCard item={selectedInfo} closeInfo={closeInfo} /> : null}</div>
            <div>
                {filteredMovies.length > 0 ? (
                    <div className="movie-list">
                        {groupedMovies.map(item => (
                            <MovieGraphic key={item.series_id || item.id} item={item} showInfo={showInfo} />
                        ))}
                    </div>
                ) : (
                    <p className="no-results">No movies found</p>
                )}
            </div>
        </div>
    )
}
