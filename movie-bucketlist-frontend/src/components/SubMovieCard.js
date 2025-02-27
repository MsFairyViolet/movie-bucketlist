export default function SubMovieCard({ movie }) {
    return (
        <div className="sub-movie-card">
            {/* Logic to render a number based on which movie of the series it is */}
            <p>{movie.title}</p>
        </div>
    )
}