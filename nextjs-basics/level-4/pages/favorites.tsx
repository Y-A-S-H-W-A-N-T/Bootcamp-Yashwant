import { motion } from 'framer-motion'
import { useFavorites } from '../context/FavoriteContext'
import ProductCard from '../components/ProductCard'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Favorites</h1>
      {favorites.length === 0 ? (
        <p className="dark:text-gray-300">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </motion.div>
  )
}