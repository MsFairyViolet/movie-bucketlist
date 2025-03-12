import { useState, useEffect } from "react";
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

    //Data from API
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
    async function clickToWatch(item) {

        const seriesMovies = movies.filter(movie => movie.series_id === item.series_id);
        const isSeries = seriesMovies.length > 1;

        const isWatched = isSeries ? !seriesMovies.some(movie => !movie.watched) : item.watched;

        if(isWatched){
            console.log("Already watched, no patch send")
            return
        }

        try {
            const response = await fetch(`/api/movies/${item.id}/watched`, {
                method: "PATCH",
                headers: { "Content-Tpe": "application/json" },
                body: getMovieColor(item)
            })

            if (!response.ok) {
                throw new Error(`Failed to update movie: ${response.statusText}`)
            }

            const data = await response.json()
            console.log("Movie updated:", data)
            fetchMovies()
            return data
        } catch (error) {
            console.log("Error updating movie:", error)
        }
    }

    //Info
    const [selectedInfo, setSelectedInfo] = useState(null)

    const showInfo = (movie) => {
        setSelectedInfo(movie)
    }

    const closeInfo = () => {
        setSelectedInfo(null)
    }

    //Watched-color
    const colors = [
        "bright-red-orange", "vivid-orange", "bright-yellow", "vivid-green",
        "electric-cyan", "vibrant-blue", "strong-purple", "deep-magenta",
        "warm-coral", "rich-indigo", "teal", "lime-green"
    ];

    const getMovieColor = (item) => {
        const seriesMovies = movies.filter(movie => movie.series_id === item.series_id)
        const isSeries = seriesMovies.length > 1

        if(isSeries){
            const existingColor = seriesMovies.find(movie => movie.color)?.color

            if(existingColor){
                return existingColor
            }
        }

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return randomColor
    };

    const groupedMovies = groupMoviesBySeries(filteredMovies)

    return (
        <div className="movie-list-container">
            <div className="search-bar">
                <input className="search-text" placeholder="Search title, year (YYYY), genre or director..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                {searchQuery ? <button className="clear-search-btn" onClick={(e) => setSearchQuery("")}>✕</button> : null}
            </div>
            <div className="info-card">{selectedInfo !== null ? <InfoCard item={selectedInfo} allMovies={movies} closeInfo={closeInfo}/> : null}</div>
            <div>
                {loading ? (
                    <p className="status-message">Loading Movies...</p>
                ) : error ? (
                    <p className="status-message">Error: {error}</p>
                ) :
                    filteredMovies.length > 0 ? (
                        <div className="movie-list">
                            {groupedMovies.map(item => (
                                <MovieGraphic key={item.series_id || item.id} item={item} showInfo={showInfo} clickToWatch={clickToWatch} />
                            ))}
                        </div>
                    ) : (
                        <p className="status-message">No movies found</p>
                    )}
            </div>
        </div>
    )
}
