export function WatchedGraphic({ movie }) {
    return (
        <div className="card-details">
            <h4 className="card-title">{movie.title}</h4>
            <p className="card-director">{movie.director.split(";").join(", ")}</p>
            <p className="card-year">{movie.year}</p>
        </div>
        )
}