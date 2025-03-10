export default function SubMovieCard({ movie, number, color }) {
    return (
        <div className={`sub-movie-card ${movie.watched ? `watched-`+color : "unwatched-grey"}`}>
            <span className="movie-number">{number}</span>
        </div>
    )
}