import { WatchedSeriesGraphic } from "./WatchedSeriesGraphic"
import { UnwatchedSeriesGraphic } from "./UnwatchedSeriesGraphic"

export default function SeriesCard({ series, showMovieInfo }) {

    const allWatched = series.movies.every(movie => movie.watched)

    return (
        <div>
            <div className="series-card">
                {/* Logic to check if all are watched */}
                {allWatched ? (<WatchedSeriesGraphic series={series} />) : (<UnwatchedSeriesGraphic series={series} />)}
            </div>
            {/* Logic to fix this button, so it is on every card and displays the correct information */}
            <button className="info-btn" onClick={() => showMovieInfo(series)}>ⓘ</button>
        </div >
    )
}