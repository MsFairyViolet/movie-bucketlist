package nl.rmspek.movie_bucketlist.service.persistence

import nl.rmspek.movie_bucketlist.model.persistence.Movie
import org.springframework.data.jpa.repository.JpaRepository

interface MovieRepository : JpaRepository<Movie, Long>
