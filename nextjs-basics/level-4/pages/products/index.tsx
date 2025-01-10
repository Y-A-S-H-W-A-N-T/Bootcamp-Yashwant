import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { getProducts } from '../../lib/api'
import { Product } from '../../types'
import ProductCard from '../../components/ProductCard'
import SearchFilter from '../../components/SearchFilter'
import Pagination from '../../components/Pagination'

interface ProductsPageProps {
  initialProducts: Product[]
  totalProducts: number
  currentPage: number
  pageSize: number
  search: string
  category: string
}

export default function ProductsPage({ 
  initialProducts, 
  totalProducts, 
  currentPage, 
  pageSize,
  search,
  category
}: ProductsPageProps) {
  const [products, setProducts] = useState(initialProducts)
  const [total, setTotal] = useState(totalProducts)
  const router = useRouter()

  const handleSearch = (newSearch: string, newCategory: string) => {
    router.push({
      pathname: '/products',
      query: { 
        ...(newSearch && { search: newSearch }),
        ...(newCategory && { category: newCategory }),
        page: 1
      }
    })
  }

  const handlePageChange = (page: number) => {
    router.push({
      pathname: '/products',
      query: { 
        ...(search && { search }),
        ...(category && { category }),
        page 
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700 dark:text-indigo-300">Our Products</h1>
      <SearchFilter onSearch={handleSearch} initialSearch={search} initialCategory={category} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={total}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </motion.div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1
  const pageSize = 10
  const search = context.query.search as string || ''
  const category = context.query.category as string || ''

  const { products, total } = await getProducts(page, pageSize, search, category)

  return {
    props: {
      initialProducts: products,
      totalProducts: total,
      currentPage: page,
      pageSize: pageSize,
      search,
      category
    },
  }
}