import { WatchedGraphic } from "./WatchedGraphic"
import { UnwatchedGraphic } from "./UnwatchedGraphic"

export default function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            {movie.watched ? <WatchedGraphic movie={movie} /> : <UnwatchedGraphic movie={movie} />}
        </div>
    )
}