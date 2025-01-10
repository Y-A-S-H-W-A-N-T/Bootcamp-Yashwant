import { GetServerSideProps } from 'next'
import { motion } from 'framer-motion'
import { getProductById } from '../../lib/api'
import { Product } from '../../types'
import FavoriteButton from '../../components/FavoriteButton'

interface ProductPageProps {
  product: Product
}

export default function ProductPage({ product }: ProductPageProps) {
  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        />
        <div>
          <h1 className="text-3xl font-bold mb-4 dark:text-white">{product.name}</h1>
          <p className="text-xl mb-4 dark:text-gray-300">${product.price.toFixed(2)}</p>
          <p className="mb-4 dark:text-gray-300">{product.description}</p>
          <p className="mb-4 dark:text-gray-300">
            Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
          </p>
          <FavoriteButton product={product} />
        </div>
      </div>
    </motion.div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string
  const product = await getProductById(id)

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product,
    },
  }
}