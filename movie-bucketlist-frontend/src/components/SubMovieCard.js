export default function SubMovieCard({ movie, number }) {
    return (
        <div className={`sub-movie-card ${movie.watched ? "watched-style" : "unwatched-style"}`}>
            <span className="movie-number">{number}</span>
        </div>
    )
}