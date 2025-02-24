export function UnwatchedGraphic({ movie }) {
    return <div className="movie-card unwatched-style">
        <div>
            <h4>{movie.title}</h4>
            <p>{movie.year}</p>
        </div>
        </div>;
}