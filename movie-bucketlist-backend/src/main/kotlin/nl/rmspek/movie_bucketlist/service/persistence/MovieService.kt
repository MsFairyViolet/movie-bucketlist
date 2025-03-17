package nl.rmspek.movie_bucketlist.service.persistence

import nl.rmspek.movie_bucketlist.model.persistence.Movie
import org.springframework.stereotype.Service

@Service
class MovieService (private val moviesRepository: MovieRepository){
    fun getAllMovies(): List<Movie> = moviesRepository.findAll()

    fun hasMovies(): Boolean = moviesRepository.count() > 0

    fun saveAll(movies: List<Movie>) = moviesRepository.saveAll(movies)

    fun findById(id: Long) = moviesRepository.findById(id)

    fun watchWithColor(movie: Movie, color: String): Movie {
        movie.color = color
        movie.watched = true
        return moviesRepository.save(movie)
    }
}
