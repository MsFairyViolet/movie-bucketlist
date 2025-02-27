import { WatchedSeriesGraphic } from "./WatchedSeriesGraphic"
import { UnwatchedSeriesGraphic } from "./UnwatchedGraphic"

export default function SeriesCard({ series, showMovieInfo }) {
    return (
        <div>
            <div className="series-card">
                {/* Logic to check if all are watched */}

                {/* {series.watched ? <WatchedSeriesGraphic series={series} /> : <UnwatchedSeriesGraphic series={series} />} */}

                <WatchedSeriesGraphic series={series} />
            </div>
            {/* Logic to fix this button, so it is on every card and displays the correct information */}
            <button className="info-btn" onClick={() => showMovieInfo(series)}>ⓘ</button>
        </div >
    )
}