export default function SubMovieCard({ movie, number, confirmWatch}) {
    return (
        <div className={`sub-movie-card ${movie.watched ? `watched-` + movie.color : "unwatched-grey"} clickable-area`}
        onClick={()=> confirmWatch(movie)}>
            <p className="movie-number">{number}</p>
        </div>
    )
}