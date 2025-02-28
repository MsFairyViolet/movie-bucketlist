package nl.rmspek.movie_bucketlist.controller.api

import nl.rmspek.movie_bucketlist.model.view.MovieView
import nl.rmspek.movie_bucketlist.model.view.toViewModel
import nl.rmspek.movie_bucketlist.service.persistence.MovieService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/movies")
class MoviesController(
    private val movieService: MovieService,
) {
    @GetMapping
    fun index() = movieService.getAllMovies().map { it.toViewModel() }

    @PatchMapping("{id}/watched")
    fun watchById(
        @PathVariable id: Long,
        @RequestBody color: String,
    ): ResponseEntity<MovieView> {
        val movie = movieService.findById(id)
        if (movie.isEmpty) {
            throw ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Movie with id '$id' not found"
            )
        }

        return ResponseEntity(movieService.watchWithColor(movie.get(), color).toViewModel(), HttpStatus.OK)
    }
}
