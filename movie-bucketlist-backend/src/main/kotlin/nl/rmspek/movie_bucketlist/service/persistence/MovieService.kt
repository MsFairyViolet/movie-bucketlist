package nl.rmspek.movie_bucketlist.service.persistence

import nl.rmspek.movie_bucketlist.model.persistence.Movie
import org.springframework.stereotype.Service

@Service
class MovieService (private val moviesRepository: MovieRepository){
    fun getAllMovies(): List<Movie> = moviesRepository.findAll()
}
