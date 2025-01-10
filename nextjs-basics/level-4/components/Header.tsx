'use client'

import Link from 'next/link'
import { useFavorites } from '../context/FavoriteContext'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const { favorites } = useFavorites()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
          Product Dashboard
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            Products
          </Link>
          <Link href="/favorites" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            Favorites ({favorites.length})
          </Link>
          <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </header>
  )
}