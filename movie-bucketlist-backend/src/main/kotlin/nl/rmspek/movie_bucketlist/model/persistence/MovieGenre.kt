package nl.rmspek.movie_bucketlist.model.persistence

import jakarta.persistence.*

@Entity
@Table(name="movie_genres")
data class MovieGenre (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val genre: String,

    @ManyToOne
    @JoinColumn(name="movie_id", nullable = false)
    val movie: Movie
)
