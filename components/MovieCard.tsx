import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Movie {
  id: number
  title?: string
  name?: string
  poster_path: string
  release_date?: string
  first_air_date?: string
  overview: string
}

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const title = movie.title || movie.name
  const releaseDate = movie.release_date || movie.first_air_date
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.svg'

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="relative w-full pt-[150%] mb-4">
          <Image
            src={posterUrl}
            alt={title || 'Movie poster'}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p className="text-sm text-gray-500 mb-2">
          Release Date: {releaseDate || 'N/A'}
        </p>
        <p className="text-sm line-clamp-3 flex-grow">{movie.overview}</p>
      </CardContent>
    </Card>
  )
}

