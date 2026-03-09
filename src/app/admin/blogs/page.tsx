'use client'

import React, { useState, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction, createViewAction } from '@/components/admin/AdminTable'
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
import { Plus, FileText, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { generateSlug } from '@/lib/slug'
import { useAdminBlogs, useSaveBlog, useDeleteBlog } from '@/hooks/useAdminBlogs'
import { useAdmin } from '@/contexts/AdminContext'
import { toast } from 'sonner'
import type { Blog } from '@/contexts/AdminContext'

export default function BlogsPage() {
  const {
    blogs: {
      isModalOpen,
      setIsModalOpen,
      editingBlog,
      setEditingBlog,
      formData,
      setFormData,
      blogToDelete,
      setBlogToDelete,
      deleteModalOpen,
      setDeleteModalOpen,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
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
  }, [debouncedSearchTerm, selectedCategory, selectedStatus])

  // TanStack Query hooks
  const { 
    data, 
    isLoading: dataLoading, 
    error, 
    refetch 
  } = useAdminBlogs(currentPage, debouncedSearchTerm, selectedCategory, selectedStatus)
  
  const blogs = data?.blogs || []
  const totalCount = data?.total || 0
  const totalPages = data?.totalPages || 1

  const saveBlogMutation = useSaveBlog()
  const deleteBlogMutation = useDeleteBlog()

  const columns = [
    {
      key: 'title',
      title: 'Title',
      render: (value: string, record: Blog) => (
        <div className="max-w-md">
          <div className="font-medium text-gray-900 line-clamp-1">{value}</div>
          <div className="text-sm text-gray-500">{record.category}</div>
        </div>
      )
    },
    {
      key: 'tags',
      title: 'Tags',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((tag) => (
            <div className='flex bg-gray-600 text-white rounded-2xl px-2 py-1 items-center gap-1' key={tag}>
              <p className="text-xs">{tag}</p>
            </div>
          ))}
          {value.length > 3 && (
            <div className='flex bg-gray-600 text-white rounded-2xl px-2 py-1 items-center gap-1'>
              <p className="text-xs">+{value.length - 3}</p>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (value: boolean) => (
        <div className={`flex items-center justify-center ${value ? 'bg-green-600' : 'bg-gray-600'} text-white rounded-2xl px-2 py-1 gap-1`}>
          <p className="text-center">{value ? 'published' : 'draft'}</p>
        </div>
      )
    },
    {
      key: 'createdAt',
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createViewAction((blog: Blog) => {
      // In a real app, this would open a view modal or navigate to view page
      alert(`View blog: ${blog.title}`)
    }),
    createEditAction((blog: Blog) => {
      setEditingBlog(blog)
      setFormData({
        title: blog.title,
        slug: blog.slug,
        category: blog.category,
        tags: blog.tags,
        content: blog.content,
        image: blog.image || '',
        related_exams: blog.related_exams,
        is_active: blog.is_active
      })
      setIsModalOpen(true)
    }),
    createDeleteAction((blog: Blog) => {
      setBlogToDelete(blog)
      setDeleteModalOpen(true)
    })
  ]

  // Hardcoded educational categories for college and education-related blogs
  const educationalCategories = [
    'College Admissions',
    'Study Abroad', 
    'Exam Preparation',
    'Scholarships & Financial Aid',
    'Career Guidance',
    'University Reviews',
    'Course Selection',
    'Student Life',
    'Education News',
    'Application Tips'
  ]

  const formFields = [
    {
      name: 'title',
      label: 'Blog Title',
      type: 'text' as const,
      placeholder: 'Enter blog title',
      required: true
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      placeholder: 'blog-slug',
      required: true
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      options: [
        { value: 'select-category', label: 'Select a category' },
        ...educationalCategories.map(cat => ({ value: cat, label: cat }))
      ],
      required: true
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'tags' as const,
      placeholder: 'Add tags',
      description: 'Add relevant tags for better categorization'
    },
    {
      name: 'related_exams',
      label: 'Related Exams',
      type: 'tags' as const,
      placeholder: 'Add related exams',
      description: 'Add exams related to this blog post'
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea' as const,
      placeholder: 'Write your blog content here...',
      required: true,
      description: 'Supports rich text formatting (in production)'
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'text' as const,
      placeholder: 'Enter image URL',
      description: 'Add an image URL for your blog post'
    },
  ]

  const handleAddBlog = () => {
    setEditingBlog(null)
    setFormData({
      title: '',
      slug: '',
      category: '',
      tags: [],
      content: '',
      image: '',
      related_exams: [],
      is_active: true
    })
    setIsModalOpen(true)
  }

  const handleSaveBlog = async () => {
    try {
      // Comprehensive validation - ALL fields are required
      const validationErrors: string[] = []
      
      if (!formData.title?.trim()) validationErrors.push('Blog title is required')
      if (!formData.slug?.trim()) validationErrors.push('Blog slug is required')
      if (!formData.category?.trim()) validationErrors.push('Blog category is required')
      if (!formData.tags?.length) validationErrors.push('At least one tag is required')
      if (!formData.content?.trim()) validationErrors.push('Blog content is required')
      if (!formData.image?.trim()) validationErrors.push('Blog image URL is required')
      if (!formData.related_exams?.length) validationErrors.push('At least one related exam is required')
      if (formData.is_active === undefined || formData.is_active === null) validationErrors.push('Blog status is required')
      
      if (validationErrors.length > 0) {
        const errorMessage = `⚠️ Validation Error!\n\nPlease complete the following required fields before saving:\n\n${validationErrors.map((error, index) => `• ${error}`).join('\n')}\n\nPlease fill in all the missing information and try again.`
        alert(errorMessage)
        return
      }
      
      const payload = {
        ...formData,
        ...(editingBlog && { _id: editingBlog._id })
      }
      
      await saveBlogMutation.mutateAsync(payload)
      toast.success(editingBlog ? 'Blog post updated successfully!' : 'Blog post created successfully!')
      setIsModalOpen(false)
      setEditingBlog(null)
    } catch (error) {
      console.error('Error saving blog:', error)
      toast.error('Error saving blog: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleDeleteBlog = async () => {
    if (!blogToDelete || !blogToDelete._id) return

    try {
      await deleteBlogMutation.mutateAsync(blogToDelete._id)
      toast.success('Blog post deleted successfully!')
      setDeleteModalOpen(false)
      setBlogToDelete(null)
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast.error('Error deleting blog')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Add button */}
      <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Blog Posts</h2>
            <p className="text-sm text-gray-500">
              {totalCount} blog posts total
            </p>
          </div>
          <Button onClick={handleAddBlog} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Blog Post</span>
          </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search blog posts by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {educationalCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-48">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Blogs Table */}
      <AdminTable
        data={blogs}
        columns={columns}
        actions={actions}
        loading={dataLoading}
        emptyMessage="No blog posts found. Add your first blog post to get started."
      />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalCount)} of {totalCount} blog posts
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
      <AdminModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
        description={editingBlog ? 'Update blog post information' : 'Create a new blog post'}
        onConfirm={handleSaveBlog}
        loading={saveBlogMutation.isPending}
        size="xl"
      >
        <AdminForm
          fields={formFields}
          data={formData}
          onChange={(field, value) => {
            setFormData(prev => ({ 
              ...prev, 
              [field]: value,
              // Auto-generate slug when title changes and slug is empty or being edited for the first time
              ...(field === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title)) ? {
                slug: generateSlug(value as string)
              } : {})
            }))
          }}
          loading={saveBlogMutation.isPending}
        />
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Blog Post"
        description={`Are you sure you want to delete "${blogToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteBlog}
        loading={deleteBlogMutation.isPending}
        size="sm"
      >
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>{blogToDelete?.title}</span>
        </div>
      </AdminModal>
    </div>
  )
}
