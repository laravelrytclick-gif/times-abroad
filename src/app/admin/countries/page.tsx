'use client'

import React, { useState, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Globe, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Country } from '@/lib/types'
import { generateSlug } from '@/lib/slug'
import { useAdminCountries, useSaveCountry, useDeleteCountry } from '@/hooks/useAdminCountries'
import { useAdmin } from '@/contexts/AdminContext'
import { toast } from 'sonner'

export default function CountriesPage() {
  const {
    countries: {
      isModalOpen,
      setIsModalOpen,
      editingCountry,
      setEditingCountry,
      formData,
      setFormData,
      countryToDelete,
      setCountryToDelete,
      deleteModalOpen,
      setDeleteModalOpen,
      searchTerm,
      setSearchTerm,
      selectedStatus,
      setSelectedStatus,
      currentPage,
      setCurrentPage,
      debouncedSearchTerm,
      setDebouncedSearchTerm
    },
    resetForm
  } = useAdmin()

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, selectedStatus])

  // TanStack Query hooks
  const { 
    data, 
    isLoading: dataLoading, 
    error, 
    refetch 
  } = useAdminCountries(currentPage, debouncedSearchTerm, selectedStatus)
  
  const countries = data?.countries || []
  const totalCount = data?.total || 0
  const totalPages = data?.totalPages || 1

  const saveCountryMutation = useSaveCountry()
  const deleteCountryMutation = useDeleteCountry()


  const columns = [
    {
      key: 'name' as keyof Country,
      title: 'Country Name',
      render: (value: string, record: Country) => (
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{record.flag}</span>
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'slug' as keyof Country,
      title: 'Slug'
    },
    {
      key: 'is_active' as keyof Country,
      title: 'Status',
      render: (value: boolean) => (
        <div className={`flex items-center justify-center ${value ? 'bg-blue-600' : 'bg-gray-600'} text-white w-16 rounded-lg px-1 py-1 gap-1`}>
          <p className="text-center text-xs font-medium">{value ? 'active' : 'inactive'}</p>
        </div>
      )
    },
    {
      key: 'createdAt' as keyof Country,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createEditAction((country: Country) => {
      setEditingCountry(country)
      setFormData({
        name: country.name,
        slug: country.slug,
        flag: country.flag,
        description: country.description,
        meta_title: country.meta_title,
        meta_description: country.meta_description,
        is_active: country.is_active
      })
      setIsModalOpen(true)
    }),
    createDeleteAction((country: Country) => {
      setCountryToDelete(country)
      setDeleteModalOpen(true)
    })
  ]

  const formFields = [
    {
      name: 'name',
      label: 'Country Name *',
      type: 'text' as const,
      placeholder: 'Enter country name',
      required: true
    },
    {
      name: 'slug',
      label: 'Slug *',
      type: 'text' as const,
      placeholder: 'country-slug',
      required: true
    },
    {
      name: 'flag',
      label: 'Flag Emoji *',
      type: 'text' as const,
      placeholder: '🇺🇸',
      description: 'Enter the flag emoji (e.g., 🇺🇸, 🇬🇧, 🇨🇦)',
      required: true
    },
    {
      name: 'description',
      label: 'Description *',
      type: 'textarea' as const,
      placeholder: 'Enter country description',
      required: true
    },
    {
      name: 'meta_title',
      label: 'Meta Title *',
      type: 'text' as const,
      placeholder: 'Meta title for SEO',
      required: true
    },
    {
      name: 'meta_description',
      label: 'Meta Description *',
      type: 'textarea' as const,
      placeholder: 'Meta description for SEO',
      required: true
    },
    {
      name: 'is_active',
      label: 'Status *',
      type: 'select' as const,
      options: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' }
      ],
      required: true
    }
  ]

  const handleAddCountry = () => {
    setEditingCountry(null)
    setFormData({
      name: '',
      slug: '',
      flag: '',
      description: '',
      meta_title: '',
      meta_description: '',
      is_active: true
    })
    setIsModalOpen(true)
  }

  const handleSaveCountry = async () => {
    try {
      // Comprehensive validation - ALL fields are required
      const validationErrors: string[] = []
      
      if (!formData.name?.trim()) validationErrors.push('Country name is required')
      if (!formData.slug?.trim()) validationErrors.push('Country slug is required')
      if (!formData.flag?.trim()) validationErrors.push('Flag emoji is required')
      if (!formData.description?.trim()) validationErrors.push('Country description is required')
      if (!formData.meta_title?.trim()) validationErrors.push('Meta title is required')
      if (!formData.meta_description?.trim()) validationErrors.push('Meta description is required')
      if (formData.is_active === undefined || formData.is_active === null) validationErrors.push('Status is required')
      
      if (validationErrors.length > 0) {
        const errorMessage = `⚠️ Validation Error!\n\nPlease complete the following required fields before saving:\n\n${validationErrors.map((error, index) => `• ${error}`).join('\n')}\n\nPlease fill in all the missing information and try again.`
        alert(errorMessage)
        return
      }
      
      const payload = {
        ...formData,
        ...(editingCountry && { _id: editingCountry._id })
      }
      
      await saveCountryMutation.mutateAsync(payload)
      toast.success(editingCountry ? 'Country updated successfully!' : 'Country created successfully!')
      setIsModalOpen(false)
      resetForm('countries')
    } catch (error) {
      console.error('Error saving country:', error)
      toast.error('Error saving country: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleDeleteCountry = async () => {
    if (!countryToDelete) return
    
    try {
      await deleteCountryMutation.mutateAsync(countryToDelete._id!)
      toast.success('Country deleted successfully!')
      setDeleteModalOpen(false)
      setCountryToDelete(null)
    } catch (error) {
      console.error('Error deleting country:', error)
      toast.error('Error deleting country')
    }
  }

  return (
    <div>
    <div className="space-y-6">
      {/* Header with Add button */}
      <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Countries</h2>
            <p className="text-sm text-gray-500">
              {totalCount} countries total
            </p>
          </div>
          <Button onClick={handleAddCountry} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Country</span>
          </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search countries by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

        {/* Countries Table */}
        <AdminTable
          data={countries}
          columns={columns}
          actions={actions}
          loading={dataLoading}
          emptyMessage="No countries found. Add your first country to get started."
        />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalCount)} of {totalCount} countries
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        <AdminModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={editingCountry ? 'Edit Country' : 'Add New Country'}
          description={editingCountry ? 'Update country information' : 'Add a new country to the system'}
          onConfirm={handleSaveCountry}
          loading={saveCountryMutation.isPending}
          size="lg"
        >
          <AdminForm
            fields={formFields}
            data={formData as unknown as Record<string, unknown>}
            onChange={(field, value) => {
              setFormData((prev: Country) => ({ 
                ...prev, 
                [field]: field === 'is_active' ? value === 'true' : value,
                // Auto-generate slug when name changes and slug is empty or being edited for the first time
                ...(field === 'name' && (!prev.slug || prev.slug === generateSlug(prev.name)) ? {
                  slug: generateSlug(value as string)
                } : {})
              }))
            }}
            loading={saveCountryMutation.isPending}
          />
        </AdminModal>

        {/* Delete Confirmation Modal */}
        <AdminModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          title="Delete Country"
          description={`Are you sure you want to delete "${countryToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteCountry}
          loading={deleteCountryMutation.isPending}
          size="sm"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <span>{countryToDelete?.name}</span>
          </div>
        </AdminModal>
      </div>
    </div>
  )
}
