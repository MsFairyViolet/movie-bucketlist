import { useState, useEffect } from "react";
import moviesData from "../data/movies.json"
import InfoCard from "./InfoCard";
import MovieGraphic from "./MovieGraphic";

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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    // //Data from Mock JSON
    // useEffect(() => {
    //     setMovies(moviesData);
    // }, []);

    //Data from API
    useEffect(() => {
        fetch("/api/movies")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch movies")
                }
                return response.json()
            })
            .then((data) => {
                setMovies(data)
                setLoading(false)
            })
            .catch((error) => {
                console.log("Error fetching movies: ", error)
                setError(error.message)
                setLoading(false)
            })
    }, [])

    //Search Functionality
    const filteredMovies = searchQuery
        ? movies.filter((movie) => {
            const query = searchQuery.toLowerCase().trim()

            return (
                movie.title.toLowerCase().includes(query) ||
                movie.director.toLowerCase().includes(query) ||
                movie.year.toString() === query ||
                movie.genres.toString().toLowerCase().includes(query)
            )
        })
        : movies;

    //Info Functionality
    const [selectedInfo, setSelectedInfo] = useState(null)

    const showInfo = (movie) => {
        setSelectedInfo(movie)
    }

    const closeInfo = () => {
        setSelectedInfo(null)
    }

    //Watched-color functionality
    const [movieColor, setMovieColor] = useState({})

    const colors = [
        "bright-red-orange", "vivid-orange", "bright-yellow", "vivid-green",
        "electric-cyan", "vibrant-blue", "strong-purple", "deep-magenta",
        "warm-coral", "rich-indigo", "teal", "lime-green"
    ];

    const getMovieColor = (item) => {
        if (!movieColor[item]) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setMovieColor(prev => ({ ...prev, [item]: randomColor }));
            return randomColor;
        }
        return movieColor[item];
    };

    const groupedMovies = groupMoviesBySeries(filteredMovies)

    return (
        <div className="movie-list-container">
            <div className="search-bar">
                <input className="search-text" placeholder="Search title, year (YYYY), genre or director..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                {searchQuery ? <button className="clear-search-btn" onClick={(e) => setSearchQuery("")}>✕</button> : null}
            </div>
            <div className="info-card">{selectedInfo !== null ? <InfoCard item={selectedInfo} allMovies={movies} closeInfo={closeInfo} color={getMovieColor(selectedInfo.id)} /> : null}</div>
            <div>
                {loading ? (
                    <p className="status-message">Loading Movies</p>
                ) : error ? (
                    <p className="status-message">Error: {error}</p>
                ) :
                    filteredMovies.length > 0 ? (
                        <div className="movie-list">
                            {groupedMovies.map(item => (
                                <MovieGraphic key={item.series_id || item.id} item={item} showInfo={showInfo} color={getMovieColor(item.id)} />
                            ))}
                        </div>
                    ) : (
                        <p className="status-message">No movies found</p>
                    )}
            </div>
        </div>
    )
}
