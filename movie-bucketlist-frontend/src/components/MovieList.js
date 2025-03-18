import { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import MovieGraphic from "./MovieGraphic";
import ConfirmationWindow from "./ConfirmationWindow";

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
    const [selectedInfo, setSelectedInfo] = useState(null)
    const [showConfirmation, setConfirmation] = useState(null)
    const [selectedMovie, setSelectedMovie] = useState(null)

    //Data from API
    const fetchMovies = () => {
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
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    //Search
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

    //Click-to-Watch
    const confirmWatch = (item) => {
        const seriesMovies = movies.filter(movie => movie.series_id === item.series_id);
        const isSeries = seriesMovies.length > 1;

        const isWatched = isSeries ? !seriesMovies.some(movie => !movie.watched) : item.watched;

        if (isWatched) {
            console.log("Already watched, no confirmation needed")
            setConfirmation(false)
            return
        }
        setSelectedMovie(item)
        setConfirmation(true)
    }

    async function clickToWatch(item) {
        try {
            setLoading(true)
            const response = await fetch(`/api/movies/${item.id}/watched`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: getMovieColor(item)
            })

            if (!response.ok) {
                throw new Error(`Failed to update movie: ${response.statusText}`)
            }

            const data = await response.json()
            fetchMovies()
            setConfirmation(false)
            return data
        } catch (error) {
            console.log("Error updating movie:", error)
            setConfirmation(false)
        }
    }

    //Info
    const showInfo = (movie) => {
        setSelectedInfo(movie)
    }

    const closeInfo = () => {
        setSelectedInfo(null)
    }

    //Watched-color
    const colors = [
        "bright-red-orange", "vivid-orange", "warm-coral", "bright-yellow",
        "electric-cyan", "vibrant-blue", "vivid-green", "lime-green", "teal", "strong-purple", "deep-magenta",
        , "rich-indigo"
    ];

    const getMovieColor = (item) => {
        const seriesMovies = movies.filter(movie => movie.series_id === item.series_id);
        const isSeries = seriesMovies.length > 1;

        if (isSeries) {
            const existingColor = seriesMovies.find(movie => movie.color)?.color
            if (existingColor) {
                return existingColor
            }
        }
        return colors[Math.floor(Math.random() * colors.length)]
    };

    const groupedMovies = groupMoviesBySeries(filteredMovies)

    return (
        <div className="movie-list-container">
            <div className="search-bar">
                <input className="search-text" placeholder="Search title, year, genre or director..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                {searchQuery ? <button className="clear-search-btn" onClick={(e) => setSearchQuery("")}>✕</button> : null}
            </div>
            {showConfirmation && (
                <div className="confirmation-window"><ConfirmationWindow movie={selectedMovie} onConfirm={() => clickToWatch(selectedMovie)} onCancel={() => setConfirmation(false)} />
                </div>
            )}
            <div className="info-card">{selectedInfo !== null ? <InfoCard item={selectedInfo} allMovies={movies} closeInfo={closeInfo} /> : null}</div>
            <div>
                {loading ? (
                    <p className="status-message">Loading Movies...</p>
                ) : error ? (
                    <p className="status-message">Error: {error}</p>
                ) :
                    filteredMovies.length > 0 ? (
                        <div className="movie-list">
                            {groupedMovies.map(item => (
                                <MovieGraphic key={item.id || item.movies[0].id} item={item} showInfo={showInfo} confirmWatch={confirmWatch} />
                            ))}
                        </div>
                    ) : (
                        <p className="status-message">No movies found</p>
                    )}
            </div>
        </div>
    )
}
