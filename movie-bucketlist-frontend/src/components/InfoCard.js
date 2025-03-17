import { useState } from "react";

export default function InfoCard({ item, closeInfo, allMovies }) {
    const isSeries = Array.isArray(item.movies);
    const seriesMovies = isSeries ? item.movies : allMovies.filter(movie => movie.series_id === item.series_id);
    const isPartOfSeries = seriesMovies.length > 1;
    const [selectedMovie, setSelectedMovie] = useState(isPartOfSeries
        ? seriesMovies.find(movie => movie.id === item.id) || seriesMovies[0]
        : item
    );

    return (
        <div className="overlay">
            <div className="overlay-content">
                <button className="close-info-btn" onClick={closeInfo}>✕</button>
                {isPartOfSeries && (
                    <div className="movie-tabs">
                        {seriesMovies.map((movie, index) => (
                            <button key={movie.id} onClick={() => setSelectedMovie(movie)} className={`tab-btn ${movie.watched ? `watched-`+movie.color : "unwatched-grey"} ${selectedMovie.id === movie.id ? "active" : "inactive"}`}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
                <div key={selectedMovie.id} className="movie-details">
                    <p><strong>Title:</strong> {selectedMovie.title}</p>
                    <p><strong>Director:</strong> {selectedMovie.director.split(";").join(", ")}</p>
                    <p><strong>Year:</strong> {selectedMovie.year}</p>
                    <p><strong>Duration:</strong> {selectedMovie.duration}</p>
                    <p><strong>Ranking:</strong> {(selectedMovie.imdb_ranking/10).toFixed(1)}</p>
                    <p><strong>Genre:</strong> {selectedMovie.genres.join(", ")}</p>
                    <p className="movie-description"><strong>Description:</strong> {selectedMovie.topic}</p>
                </div>
            </div>
        </div>
    );
}
