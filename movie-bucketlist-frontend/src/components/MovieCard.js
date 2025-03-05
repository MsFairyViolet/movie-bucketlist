import { WatchedGraphic } from "./WatchedGraphic"
import { UnwatchedGraphic } from "./UnwatchedGraphic"


export default function MovieCard({ movie, showMovieInfo }) {
    return (
        <div className={`movie-card ${movie.watched ? "watched-style" : "unwatched-style"}`}>
            {movie.watched ? <WatchedGraphic movie={movie} /> : <UnwatchedGraphic movie={movie} />}
            <button className="info-btn" onClick={() => showMovieInfo(movie)}>ⓘ</button>
        </div>
    )
}