export default function SubMovieCard({ movie, number, color, toggleWatched}) {
    return (
        <div className={`sub-movie-card ${movie.watched ? `watched-` + color : "unwatched-grey"} clickable-area`}
        onClick={()=> toggleWatched(movie.id)}>
            <p className="movie-number">{number}</p>
        </div>
    )
}