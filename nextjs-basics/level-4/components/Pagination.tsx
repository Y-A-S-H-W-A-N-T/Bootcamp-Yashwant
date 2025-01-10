import React from 'react'
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";


interface PaginationProps {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize)

  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 mx-1 rounded-md ${
            currentPage === i
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-indigo-100'
          } transition-colors duration-300`}
        >
          {i}
        </button>
      )
    }

    return pageNumbers
  }

  return (
    <div className="flex items-center justify-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 rounded-md bg-white text-gray-700 hover:bg-indigo-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CiCircleChevLeft className="h-5 w-5" />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 rounded-md bg-white text-gray-700 hover:bg-indigo-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CiCircleChevRight className="h-5 w-5" />
      </button>
    </div>
  )
}

export default Pagination