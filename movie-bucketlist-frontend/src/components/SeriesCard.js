import { WatchedSeriesGraphic } from "./WatchedSeriesGraphic"
import { UnwatchedSeriesGraphic } from "./UnwatchedSeriesGraphic"

export default function SeriesCard({ series, showSeriesInfo }) {

    const allWatched = series.movies.every(movie => movie.watched)

    return (
        <div>
            {allWatched ? (<WatchedSeriesGraphic series={series} showSeriesInfo={showSeriesInfo} />) : (<UnwatchedSeriesGraphic series={series} showSeriesInfo={showSeriesInfo} />)}
        </div >
    )
}