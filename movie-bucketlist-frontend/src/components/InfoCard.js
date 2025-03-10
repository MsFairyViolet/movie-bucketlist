import { useState } from "react";

export default function InfoCard({ item, closeInfo, color }) {
    const isSeries = Array.isArray(item.movies);
    const [selectedMovie, setSelectedMovie] = useState(isSeries ? item.movies[0] : item);

    return (
        <div className="overlay">
            <div className="overlay-content">
                <button className="close-info-btn" onClick={closeInfo}>✕</button>

                {isSeries && (
                    <div className="movie-tabs">
                        {item.movies.map((movie, index) => (
                            <button
                                key={movie.id}
                                onClick={() => setSelectedMovie(movie)}
                                className={`tab-btn ${movie.watched ? `watched-`+color : "unwatched-grey"} ${selectedMovie.id === movie.id ? "active" : "inactive"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}

                <div key={selectedMovie.id} className="movie-details">
                    <p><strong>Title:</strong> {selectedMovie.title}</p>
                    <p><strong>Director:</strong> {selectedMovie.director}</p>
                    <p><strong>Year:</strong> {selectedMovie.year}</p>
                    <p><strong>Duration:</strong> {selectedMovie.duration} min</p>
                    <p><strong>Ranking:</strong> {selectedMovie.imdb_ranking}</p>
                    <p><strong>Genre:</strong> {selectedMovie.genre.join(", ")}</p>
                    <p><strong>Description:</strong> {selectedMovie.topic}</p>
                </div>
            </div>
        </div>
    );
}
