package nl.rmspek.movie_bucketlist.data

import com.opencsv.bean.CsvToBeanBuilder
import nl.rmspek.movie_bucketlist.model.persistence.Movie
import nl.rmspek.movie_bucketlist.model.persistence.MovieGenre
import nl.rmspek.movie_bucketlist.service.persistence.MovieService
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import java.io.InputStreamReader
import java.math.BigDecimal

@Configuration
class SeedMovies(private val movieService: MovieService ) {
    @Bean
    fun loadMovieData() = ApplicationRunner {
        if (movieService.hasMovies()) return@ApplicationRunner

        val resource = ClassPathResource("movies.csv")
        val reader = InputStreamReader(resource.inputStream)

        val movies = CsvToBeanBuilder<MovieSeed>(reader)
            .withType(MovieSeed::class.java)
            .withSeparator(';')
            .build()
            .parse()
            .map { seed ->
                Movie(
                    null,
                    seed.series_id,
                    seed .title,
                    seed.year.toInt(),
                    seed.watched,
                    seed.colour,
                    (seed.ranking.toBigDecimal() * BigDecimal(10)).toInt(),
                    seed.director,
                    seed.duration,
                    seed.topic,
                ).also { movie ->
                    movie.genres.addAll(
                        seed.genre.split(';').map { MovieGenre(null, it, movie) }
                    )
                }
            }

        movieService.saveAll(movies)
    }
}
