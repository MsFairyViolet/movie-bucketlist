import { useState } from "react";
import SubMovieCard from "./SubMovieCard";

export default function MovieGraphic({ item, showInfo }) {

    const [selectedSubs, setSelectedSubs] = useState(null)

    const toggleSubs = (card) => {
        if (selectedSubs === null) {
            setSelectedSubs(card)
        } else {
            setSelectedSubs(null)
        }
    }

    const subsShow = selectedSubs !== null

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
                {isSeries ?
                    <button className="sub-btn" onClick={() => toggleSubs(item)}>
                        <span className={subsShow ? `arrow rotated` : `arrow`}>˅</span>
                    </button>
                    : null}
                <button className="info-btn" onClick={() => showInfo(item)}>ⓘ</button>
            </div>
            {subsShow ?
                <div className="sub-movie-container">
                    {item.movies.map((movie, index) =>
                        <SubMovieCard key={movie.id} movie={movie} number={index + 1} />
                    )}
                </div>
                : null}

        </div >
    )
}

// Arrow options: `˅` `ⓥ`
