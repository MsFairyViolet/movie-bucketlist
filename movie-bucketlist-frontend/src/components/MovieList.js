import MovieCard from "./MovieCard"

export default function MovieList() {
    return (
        <div className="movie-list-container">
            <h2>MovieList</h2>
            <div className="movie-list">
                <MovieCard />
                <MovieCard />
                <MovieCard />
            </div>
        </div>
    )
}