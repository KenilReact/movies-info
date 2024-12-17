import MovieCard from './MovieCard'

interface Movie {
  id: number
  title?: string
  name?: string
  poster_path: string
  release_date?: string
  first_air_date?: string
  overview: string
}

interface MovieListProps {
  movies: Movie[]
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

