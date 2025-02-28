package nl.rmspek.movie_bucketlist.model.view

import nl.rmspek.movie_bucketlist.model.persistence.Movie

data class MovieView (
    var id: Long?,
    var series_id: Long?,
    var title: String,
    var year: Int,
    var watched: Boolean,
    var color: String?,
    var imdb_ranking: Int,
    var director: String,
    var duration: String,
    var topic: String,

    val genres: List<String> = listOf()
)

fun Movie.toViewModel() = MovieView(
    this.id,
    this.seriesId,
    this.title,
    this.year,
    this.watched,
    this.color,
    this.imdbRanking,
    this.director,
    this.duration,
    this.topic,
    this.genres.map { it.genre }
)
