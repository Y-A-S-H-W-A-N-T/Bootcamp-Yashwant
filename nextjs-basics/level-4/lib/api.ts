import { Product } from '../types'
import productsData from '../public/data/products.json'

const products: Product[] = productsData

export async function getProducts(
  page: number = 1, 
  pageSize: number = 12, 
  search: string = '', 
  category: string = ''
): Promise<{ products: Product[], total: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let filteredProducts = products

  if (search) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category === category)
  }

  const total = filteredProducts.length
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  
  return {
    products: filteredProducts.slice(startIndex, endIndex),
    total: total
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return products.find(product => product.id === id)
}