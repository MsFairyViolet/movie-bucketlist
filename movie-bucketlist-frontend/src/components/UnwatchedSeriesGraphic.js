import SubMovieCard from "./SubMovieCard";

export function UnwatchedSeriesGraphic({ series, showInfo }) {

    const RenderFirstUnwatched = () => {
        let firstUnwatched = null

        series.movies.forEach((movie) => {
            if (!firstUnwatched && !movie.watched) {
                firstUnwatched = movie;
            }
        })
        return firstUnwatched;
    }

    const firstUnwatched = RenderFirstUnwatched();

    return (
        <div className="series-container">
            <div className="series-card unwatched-style">
                <div className="card-details">
                    <h4>{firstUnwatched.title}</h4>
                </div>
                <button className="info-btn" onClick={() => showInfo(series)}>ⓘ</button>
            </div>
            <div className="sub-movie-container">
                {series.movies.map((movie, index) =>
                    <SubMovieCard key={movie.id} movie={movie} number={index + 1} />
                )}
            </div>
        </div>
    )
}