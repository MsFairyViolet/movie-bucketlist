import { useState } from "react";
import SubMovieCard from "./SubMovieCard";

export default function MovieGraphic({ item, showInfo, confirmWatch}) {

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

    const color = isSeries ? item.movies.find(movie => movie.color)?.color : item.color

    return (
        <div className="card-container">

            <div className={`card ${isWatched ? `watched-` + color : "unwatched-grey"} clickable-area`} 
            onClick={() => isSeries ? confirmWatch(firstUnwatched) : confirmWatch(item) }>
                <div className="card-details">
                    <h4 className={`card-title ${isLongTitle ? `long-title` : ``}`}>{isSeries ? firstUnwatched.title : item.title}</h4>
                    <p className="card-director">{isWatched ? isSeries ? firstUnwatched?.director.split(";").join(", ") : item.director.split(";").join(", ") : null}</p>
                    <p className="card-year">{isSeries ? firstUnwatched.year : item.year}</p>
                </div>

                {isSeries ?
                    <button className="sub-btn" onClick={(e) =>{e.stopPropagation(); toggleSubs(item)}}>
                        <span className={subsShow ? `sub-arrow rotated` : `sub-arrow`}>˅</span>
                    </button>
                    : null}
                <button className="info-btn" onClick={(e) => {e.stopPropagation(); showInfo(item)}}>ⓘ</button>
            </div>

            {subsShow ?
                <div className="sub-movie-container">
                    {item.movies.map((movie, index) =>
                        <SubMovieCard key={movie.id} movie={movie} number={index + 1} confirmWatch={confirmWatch}/>
                    )}
                </div>
                : null}

        </div >
    )
}


