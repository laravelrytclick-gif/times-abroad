'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { College } from '@/contexts/AdminContext'

export interface AdminCountry {
  _id: string
  name: string
  slug: string
  flag: string
}

// Fetch paginated colleges for admin
const fetchAdminColleges = async ({ 
  pageParam = 1, 
  search = '', 
  country = '',
  status = '' 
}): Promise<{
  colleges: College[],
  total: number,
  page: number,
  totalPages: number,
  hasMore: boolean
}> => {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: '10',
    ...(search && { search }),
    ...(country && country !== 'all' && { country }),
    ...(status && status !== 'all' && { status })
  })

  const response = await fetch(`/api/admin/colleges?${params}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch colleges')
  }
  
  return result.data
}

// Fetch paginated countries for admin
const fetchAdminCountriesPaginated = async ({
  pageParam = 1,
  search = '',
  status = '',
  limit = 10
}): Promise<{
  countries: AdminCountry[],
  total: number,
  page: number,
  totalPages: number,
  hasMore: boolean
}> => {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(status && status !== 'all' && { status })
  })

  const response = await fetch(`/api/admin/countries?${params}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch countries')
  }

  return result.data
}

// Fetch all countries for admin
const fetchAdminCountries = async (): Promise<AdminCountry[]> => {
  const response = await fetch('/api/admin/countries')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch countries')
  }

  return result.data
}

// Create or update college
const saveCollege = async (data: Partial<College> & { _id?: string }): Promise<College> => {
  const isEditing = !!data._id
  const url = isEditing ? `/api/admin/colleges/${data._id}` : '/api/admin/colleges'
  const method = isEditing ? 'PUT' : 'POST'
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to save college')
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to save college')
  }
  
  return result.data
}

// Delete college
const deleteCollege = async (id: string): Promise<void> => {
  const response = await fetch(`/api/admin/colleges/${id}`, {
    method: 'DELETE'
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete college')
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to delete college')
  }
}

// Hooks
export function useAdminColleges(page: number, search: string, country: string, status: string) {
  return useQuery({
    queryKey: ['admin', 'colleges', 'paginated', page, search, country, status],
    queryFn: () => fetchAdminColleges({ 
      pageParam: page, 
      search, 
      country, 
      status 
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useAdminCountries(page: number = 1, search: string = '', status: string = 'all', limit: number = 10) {
  return useQuery({
    queryKey: ['admin', 'countries', 'paginated', page, search, status, limit],
    queryFn: () => fetchAdminCountriesPaginated({
      pageParam: page,
      search,
      status,
      limit
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useSaveCollege() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: saveCollege,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'colleges'] })
    },
    onError: (error) => {
      console.error('Error saving college:', error)
      throw error
    }
  })
}

export function useDeleteCollege() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteCollege,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'colleges'] })
    },
    onError: (error) => {
      console.error('Error deleting college:', error)
      throw error
    }
  })
}
