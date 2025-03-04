import { useState } from "react"

export default function SeriesInfoCard({ series, closeSeriesInfo }) {
    const [selectedMovie, setSelectedMovie] = useState(series.movies[0])

    return (
        <div className="overlay">
            <div className="overlay-content">
                <button className="close-info-btn" onClick={() => closeSeriesInfo()}>X</button>
                <div className="movie-tabs">
                    {series.movies.map((movie, index) =>
                        <button key={movie.id} onClick={() => setSelectedMovie(movie)} className={`tab-btn ${movie.watched ? "watched-style" : "unwatched-style"} ${selectedMovie.id === movie.id ? "active" : ""}`}>{index + 1}</button>)}
                </div>
                <div key={selectedMovie.id} className="movie-details">
                    <p><strong>Title:</strong> {selectedMovie.title}</p>
                    <p><strong>Director:</strong> {selectedMovie.director}</p>
                    <p><strong>Year:</strong> {selectedMovie.year}</p>
                    <p><strong>Duration:</strong> {selectedMovie.duration}</p>
                    <p><strong>Ranking:</strong> {selectedMovie.imdb_ranking}</p>
                    <p><strong>Genre:</strong> {selectedMovie.genre.join(", ")}</p>
                    <p><strong>Description:</strong> {selectedMovie.topic}</p>

                </div>
            </div>
        </div >
    )
}