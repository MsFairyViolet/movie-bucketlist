import SubMovieCard from "./SubMovieCard";

export function WatchedSeriesGraphic({ series, showSeriesInfo }) {
    return (
        <div className="series-container">
            <div className="series-card watched-style" >
                <div className="card-details">
                    {/* Logic to decide which title to display */}
                    <h4>{series.movies[0]?.title}</h4>
                </div>
                <button className="info-btn" onClick={() => showSeriesInfo(series)}>ⓘ</button>
            </div>

            <div className="sub-movie-container">
                {series.movies.map((movie, index) => 
                    <SubMovieCard key={movie.id} movie={movie} number={index + 1} />
                )}
            </div>
        </div>
    )
}