export function UnwatchedSeriesGraphic({ series }) {
    return <div className="series-card unwatched-style">
        <div>
            {/* Logic to decide which title to display */}
            <h4>{series[0].title}</h4>
            <p>{series[0].year}</p>
        </div>
        <div className="sub-movies">
            {series.map((movie) => {
                return <SubMovieCard key={movie.id} movie={movie} />
            }
            )}
        </div>
    </div>;
}