package nl.rmspek.movie_bucketlist.data

data class MovieSeed(
    val id: Long = 0,
    val series_id: Long = 0,
    val genre: String = "",
    val title: String = "",
    val year: String = "",
    val watched: Boolean = false,
    val colour: String = "",
    val ranking: String = "",
    val director: String = "",
    val duration: String = "",
    val topic: String = "",
)
