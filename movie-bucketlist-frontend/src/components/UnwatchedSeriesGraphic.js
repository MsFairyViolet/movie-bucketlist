import SubMovieCard from "./SubMovieCard";

export function UnwatchedSeriesGraphic({ series }) {
    return <div className="series-card unwatched-style">
        <div>
            {/* Logic to decide which title to display */}
            <h4>{series.movies[0]?.title}</h4>
            <p>{series.movies[0]?.year}</p>
        </div>
        <div className="sub-movies">
            {series.movies.map((movie) => {
                return <SubMovieCard key={movie.id} movie={movie} />
            }
            )}
        </div>
    </div>;
}