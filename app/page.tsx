"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/components/search-bar";
import { MovieGrid } from "@/components/movie-grid";
import { MovieDetails } from "@/components/movie-details";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface DetailedMovie extends Movie {
  Plot: string;
  Director: string;
  Actors: string;
  Genre: string;
  Runtime: string;
  imdbRating: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<DetailedMovie | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentSearch, setCurrentSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestMovies();
  }, []);

  const fetchLatestMovies = async (pageNumber: number = 1) => {
    setLoading(true);
    setError(null);
    setCurrentSearch("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=2023&type=movie&y=2023&page=${pageNumber}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies((prevMovies) =>
          pageNumber === 1 ? data.Search : [...prevMovies, ...data.Search]
        );
        setTotalResults(parseInt(data.totalResults));
        setPage(pageNumber);
      } else {
        setError("No movies found");
      }
    } catch (error) {
      console.error("Error fetching latest movies:", error);
      setError("An error occurred while fetching movies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string, pageNumber: number = 1) => {
    if (!query) return;

    setLoading(true);
    setCurrentSearch(query);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${query}&page=${pageNumber}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies((prevMovies) =>
          pageNumber === 1 ? data.Search : [...prevMovies, ...data.Search]
        );
        setTotalResults(parseInt(data.totalResults));
        setPage(pageNumber);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError("No movies found");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("An error occurred while fetching movies");
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (imdbID: string) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setSelectedMovie(data);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleLoadMore = () => {
    if (currentSearch) {
      handleSearch(currentSearch, page + 1);
    } else {
      fetchLatestMovies(page + 1);
    }
  };

  const handleHomeClick = () => {
    setCurrentSearch("");
    setPage(1);
    fetchLatestMovies();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center mb-8">
          <h1
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer"
            onClick={handleHomeClick}
          >
            Movie Info
          </h1>
        </div>

        <SearchBar
          onSearch={(query) => handleSearch(query, 1)}
          currentSearch={currentSearch}
        />

        {loading && page === 1 && (
          <div className="flex justify-center my-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-4">
          {currentSearch ? "Search Results" : "Latest Movies"}
        </h2>

        {error && (
          <div className="flex flex-col items-center justify-center p-8 my-8 bg-gray-800 rounded-lg border border-gray-700">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Oops!</h3>
            <p className="text-gray-400 text-center">{error}</p>
          </div>
        )}

        <MovieGrid movies={movies} onMovieSelect={fetchMovieDetails} />

        {movies.length > 0 && movies.length < totalResults && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Load More"
              )}
            </Button>
          </div>
        )}

        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </main>
  );
}
