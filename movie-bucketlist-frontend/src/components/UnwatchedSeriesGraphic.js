import SubMovieCard from "./SubMovieCard";

export function UnwatchedSeriesGraphic({ series }) {

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
                <div>
                    <h4>{firstUnwatched.title}</h4>
                    <p>{firstUnwatched.year}</p>
                </div>
            </div>
            <div className="sub-movies">
                {series.movies.map((movie, index) => {
                    return <SubMovieCard key={movie.id} movie={movie} number={index + 1} />
                }
                )}
            </div>
        </div>
    )
}