export default function SubMovieCard({ movie, number, clickToWatch}) {
    return (
        <div className={`sub-movie-card ${movie.watched ? `watched-` + movie.color : "unwatched-grey"} clickable-area`}
        onClick={()=> clickToWatch(movie)}>
            <p className="movie-number">{number}</p>
        </div>
    )
}