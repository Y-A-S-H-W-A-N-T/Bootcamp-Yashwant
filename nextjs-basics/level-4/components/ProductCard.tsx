import Link from 'next/link'
import { motion } from 'framer-motion'
import FavoriteButton from './FavoriteButton'
import { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative h-48">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <FavoriteButton product={product} />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{product.name}</h2>
        <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
        <Link
          href={`/products/${product.id}`}
          className="inline-block bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}