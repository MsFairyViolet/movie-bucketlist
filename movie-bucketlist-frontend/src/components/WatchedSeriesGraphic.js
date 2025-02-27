import SubMovieCard from "./SubMovieCard";

export function WatchedSeriesGraphic({ series }) {
    console.log("Series received in WatchedSeriesGraphic:", series)
    return <div className="series-card watched-style">
        <div>
            {/* Logic to decide which title to display */}
            <h4>{series[0].title}</h4>
        </div>
        <div className="sub-movies">
            {series.map((movie) => {
                return <SubMovieCard key={movie.id} movie={movie}/>
            }
            )}
        </div>
    </div>;
}