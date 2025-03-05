export function UnwatchedGraphic({ movie }) {
    return (
        <div className="card-details">
            <h4>{movie.title}</h4>
            <p>{movie.year}</p>
        </div>
    )
}