import { WatchedSeriesGraphic } from "./WatchedSeriesGraphic"
import { UnwatchedSeriesGraphic } from "./UnwatchedSeriesGraphic"

export default function SeriesCard({ series, showSeriesInfo }) {

    const allWatched = series.movies.every(movie => movie.watched)

    return (
        <div>
            <div className="series-card">
                {allWatched ? (<WatchedSeriesGraphic series={series} />) : (<UnwatchedSeriesGraphic series={series} />)}
                <button className="series-info-btn" onClick={() => showSeriesInfo(series)}>ⓘ</button>
            </div>
        </div >
    )
}