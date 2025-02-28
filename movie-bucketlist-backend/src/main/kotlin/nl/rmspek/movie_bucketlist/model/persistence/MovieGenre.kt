package nl.rmspek.movie_bucketlist.model.persistence

import jakarta.persistence.*

@Entity
@Table(name="movie_genres")
data class MovieGenre (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val genre: String,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="movie_id", nullable = false)
    val movie: Movie
)
