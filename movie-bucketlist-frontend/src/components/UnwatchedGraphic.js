export function UnwatchedGraphic({ movie }) {
    return (
        <div className="card-details">
            <h4 className="card-title">{movie.title}</h4>
            <p className="card-year">{movie.year}</p>
        </div>
    )
}