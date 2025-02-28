package nl.rmspek.movie_bucketlist.controller.api

import nl.rmspek.movie_bucketlist.model.view.toViewModel
import nl.rmspek.movie_bucketlist.service.persistence.MovieService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/movies")
class MoviesController(
    private val movieService: MovieService,
) {
    @GetMapping
    fun index() = movieService.getAllMovies().map { it.toViewModel() }
}
