import SubMovieCard from "./SubMovieCard";

export function WatchedSeriesGraphic({ series }) {
    return <div className="series-card watched-style">
        <div>
            {/* Logic to decide which title to display */}
            <h4>{series.movies[0]?.title}</h4>
        </div>
        <div className="sub-movies">
            {series.movies.map((movie) => {
                return <SubMovieCard key={movie.id} movie={movie}/>
            }
            )}
        </div>
    </div>;
}