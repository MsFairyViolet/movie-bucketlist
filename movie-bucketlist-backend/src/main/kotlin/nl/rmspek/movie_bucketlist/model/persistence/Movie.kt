package nl.rmspek.movie_bucketlist.model.persistence

import jakarta.persistence.*
import org.hibernate.annotations.Fetch

@Entity
@Table(name="movies")
data class Movie (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var seriesId: Long,
    var title: String,
    var year: Int,
    var watched: Boolean,
    var color: String,
    var imdbRanking: Int,
    var director: String,
    var duration: String,
    var topic: String,

    @OneToMany(mappedBy = "movie", fetch = FetchType.LAZY, cascade = [CascadeType.ALL], orphanRemoval = true)
    val genres: MutableList<MovieGenre> = mutableListOf()
)
