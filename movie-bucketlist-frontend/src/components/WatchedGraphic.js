export function WatchedGraphic({ movie }) {
    return <div className="movie-card watched-style">
        <div>
            <h4>{movie.title}</h4>
            <p>{movie.year}</p>
            <p>{movie.director}</p>
        </div>
    </div>;
}