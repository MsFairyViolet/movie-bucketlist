import SubMovieCard from "./SubMovieCard";

export default function MovieGraphic({ item, showInfo }) {

    const isSeries = Array.isArray(item.movies);

    const isWatched = isSeries ? item.movies.every(movie => movie.watched) : item.watched

    const firstUnwatched = isSeries ? item.movies.find(movie => !movie.watched) || item.movies[0] : item

    const isLongTitle = isSeries ? firstUnwatched.title.length > (isWatched ? 25 : 37) : item.title.length > (isWatched ? 25 : 37)
   
    return (
        <div className="card-container">

            <div className={`card ${isWatched ? "watched-style" : "unwatched-style"}`}>

                <div className="card-details">
                <h4 className={`card-title ${isLongTitle ? `long-title` : null}`}>{isSeries ? firstUnwatched.title : item.title}</h4>
                    <p className="card-director">{isWatched ? isSeries ? firstUnwatched?.director.split(";").join(", ") : item.director.split(";").join(", ") : null}</p>
                    <p className="card-year">{isSeries ? firstUnwatched.year : item.year}</p>
                </div>
                <button className="info-btn" onClick={() => showInfo(item)}>ⓘ</button>

            </div>
            {isSeries && (
                <div className="sub-movie-container">
                    {item.movies.map((movie, index) =>
                        <SubMovieCard key={movie.id} movie={movie} number={index + 1} />
                    )}
                </div>
            )}
        </div >
    )
}