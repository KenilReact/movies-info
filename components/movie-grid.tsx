import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Type: string
  Poster: string
}

interface MovieGridProps {
  movies: Movie[]
  onMovieSelect: (id: string) => void
}

export function MovieGrid({ movies, onMovieSelect }: MovieGridProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (imdbID: string) => {
    setImageErrors(prev => ({ ...prev, [imdbID]: true }))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Card
          key={movie.imdbID}
          className="group cursor-pointer transition-transform duration-200 hover:scale-105 bg-gray-800 border-gray-700"
          onClick={() => onMovieSelect(movie.imdbID)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={imageErrors[movie.imdbID] || movie.Poster === 'N/A' ? '/dummy.png' : movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                onError={() => handleImageError(movie.imdbID)}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1 text-white">
                {movie.Title}
              </h3>
              <p className="text-sm text-gray-400">{movie.Year}</p>
              <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-full bg-purple-600/20 text-purple-400">
                {movie.Type}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

