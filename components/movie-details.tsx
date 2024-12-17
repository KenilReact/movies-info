import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieDetailsProps {
  movie: {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Director: string;
    Actors: string;
    Genre: string;
    Runtime: string;
    imdbRating: string;
  };
  onClose: () => void;
}

export function MovieDetails({ movie, onClose }: MovieDetailsProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="flex flex-col md:flex-row gap-6 p-6">
            <div className="relative w-full md:w-80 aspect-[2/3] shrink-0">
              <img
                src={
                  imageError || movie.Poster === "N/A"
                    ? "/dummy.png"
                    : movie.Poster
                }
                alt={movie.Title}
                className="w-full h-full object-cover rounded-lg"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 text-sm">
                  {movie.Year}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 text-sm">
                  {movie.Runtime}
                </span>
                <span className="px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-400 text-sm">
                  IMDb {movie.imdbRating}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Plot</h3>
                  <p className="text-gray-300">{movie.Plot}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-1">Genre</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.Genre.split(", ").map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-1">Director</h3>
                  <p className="text-gray-300">{movie.Director}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-1">Cast</h3>
                  <p className="text-gray-300">{movie.Actors}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
