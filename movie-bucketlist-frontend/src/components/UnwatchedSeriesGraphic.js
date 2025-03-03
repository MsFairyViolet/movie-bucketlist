import SubMovieCard from "./SubMovieCard";

export function UnwatchedSeriesGraphic({ series }) {

    const RenderFirstUnwatched = () => {
        let firstUnwatched = null

        series.movies.forEach((movie) => {
            if (!firstUnwatched && !movie.watched) {
                firstUnwatched = movie;
            }
        })
        console.log(firstUnwatched)
        return firstUnwatched;
    }

    const firstUnwatched = RenderFirstUnwatched();

    return <div className="series-card unwatched-style">
        <div>
            <h4>{firstUnwatched.title}</h4>
            <p>{firstUnwatched.year}</p>
        </div>
        <div className="sub-movies">
            {series.movies.map((movie) => {
                return <SubMovieCard key={movie.id} movie={movie} />
            }
            )}
        </div>
    </div>;
}