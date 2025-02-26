export default function MovieInfoCard({movie, closeMovieInfo}) {
    return (
        <div className="overlay">
            <div className="overlay-content">
            <button className="close-info-btn" onClick={() => closeMovieInfo()}>X</button>
            <p><strong>Title:</strong> {movie.title}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Duration:</strong> {movie.duration}</p>
            <p><strong>Ranking:</strong> {movie.imdb_ranking}</p>
            <p><strong>Genre:</strong> {movie.genre.join(", ")}</p>
            <p><strong>Description:</strong> {movie.topic}</p>
            </div>
        </div>
    )
}