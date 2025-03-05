import { WatchedSeriesGraphic } from "./WatchedSeriesGraphic"
import { UnwatchedSeriesGraphic } from "./UnwatchedSeriesGraphic"

export default function SeriesCard({ series, showInfo }) {

    const allWatched = series.movies.every(movie => movie.watched)

    return (
        <div>
            {allWatched ? (<WatchedSeriesGraphic series={series} showInfo={showInfo} />) : (<UnwatchedSeriesGraphic series={series} showInfo={showInfo} />)}
        </div >
    )
}