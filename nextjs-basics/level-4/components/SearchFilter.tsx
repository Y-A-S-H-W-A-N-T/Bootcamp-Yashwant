import { useState } from 'react'

interface SearchFilterProps {
  onSearch: (search: string, category: string) => void
  initialSearch: string
  initialCategory: string
}

export default function SearchFilter({ onSearch, initialSearch, initialCategory }: SearchFilterProps) {
  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState(initialCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(search, category)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Search
      </button>
    </form>
  )
}