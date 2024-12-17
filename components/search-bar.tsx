'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  currentSearch: string
}

export function SearchBar({ onSearch, currentSearch }: SearchBarProps) {
  const [query, setQuery] = useState(currentSearch)

  useEffect(() => {
    setQuery(currentSearch)
  }, [currentSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-2xl mx-auto mb-8"
    >
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button 
          type="submit"
          className="bg-purple-600 hover:bg-purple-700"
        >
          Search
        </Button>
      </div>
    </form>
  )
}

