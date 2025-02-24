export default function MovieCard ({title, year, director}) { 
    return (
        <div className="movie-card">
            <h4>{title}</h4>
            <p>{year}</p>
            <p>{director}</p>
            </div>
    )
}