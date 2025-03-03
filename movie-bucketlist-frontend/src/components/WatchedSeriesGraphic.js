import SubMovieCard from "./SubMovieCard";

export function WatchedSeriesGraphic({ series }) {
    return (
        <div className="series-container">
            <div className="series-card watched-style">
                <div>
                    {/* Logic to decide which title to display */}
                    <h4>{series.movies[0]?.title}</h4>
                </div>

            </div>
            <div className="sub-movies">
                {series.movies.map((movie, index) => {
                    return <SubMovieCard key={movie.id} movie={movie} number={index + 1}/>
                }
                )}
            </div>
        </div>
    )
}