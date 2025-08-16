import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

/**
 * Manages bidirectional synchronization between component state and URL parameters
 * Enables shareable URLs and browser back/forward navigation
 */
export const useUrlState = () => {
  // Initialize state from URL parameters immediately
  const getInitialState = () => {
    const urlParams = new URLSearchParams(window.location.search)
    return {
      query: urlParams.get('q') || '',
      page: parseInt(urlParams.get('page') || '1', 10),
      limit: parseInt(urlParams.get('limit') || '20', 10)
    }
  }

  const initialState = getInitialState()
  const [searchQuery, setSearchQuery] = useState(initialState.query)
  const [currentPage, setCurrentPage] = useState(initialState.page)
  const [itemsPerPage, setItemsPerPage] = useState(initialState.limit)
  
  // Debounce search to prevent excessive URL updates during typing
  const debouncedQuery = useDebounce(searchQuery, 500)

  // Sync state changes to URL parameters (only include non-default values)
  useEffect(() => {
    const urlParams = new URLSearchParams()
    
    if (debouncedQuery) {
      urlParams.set('q', debouncedQuery)
    }
    
    if (currentPage > 1) {
      urlParams.set('page', currentPage.toString())
    }
    
    if (itemsPerPage !== 20) {
      urlParams.set('limit', itemsPerPage.toString())
    }
    
    // Update URL without triggering page reload
    const newUrl = urlParams.toString() 
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname
    
    window.history.replaceState({}, '', newUrl)
  }, [debouncedQuery, currentPage, itemsPerPage])

  // Reset to first page when search query changes
  const updateQuery = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const updatePage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // Reset to first page when changing items per page
  const updateItemsPerPage = useCallback((limit: number) => {
    setItemsPerPage(limit)
    setCurrentPage(1)
  }, [])

  return {
    searchQuery,
    debouncedQuery,
    currentPage,
    itemsPerPage,
    updateQuery,
    updatePage,
    updateItemsPerPage,
  }
}