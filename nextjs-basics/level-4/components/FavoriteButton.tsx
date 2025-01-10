'use client'

import { useFavorites } from '../context/FavoriteContext'
import { Heart } from 'lucide-react'

type Product = {
  id: string
  name: string
  price: number
  description: string
  stock: number
}

export default function FavoriteButton({ product }: { product: Product }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(product.id)

  const handleClick = () => {
    if (favorite) {
      removeFavorite(product.id)
    } else {
      addFavorite(product)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full ${
        favorite
          ? 'bg-red-500 text-white'
          : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
      }`}
    >
      <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
    </button>
  )
}