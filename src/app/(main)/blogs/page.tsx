'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Calendar, Tag, FileText, Clock, User, Eye, MessageCircle, ArrowRight, X, AlertCircle, RefreshCw } from 'lucide-react'
import { useBlogs } from '@/hooks/useBlogs'

interface Blog {
  _id: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image?: string
  author?: string
  published_at?: string
  read_time?: number
  views?: number
  comments?: number
  related_exams: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Use TanStack Query for blogs data
  const { 
    data: blogs = [], 
    isLoading, 
    error, 
    refetch 
  } = useBlogs()

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    let filtered = blogs

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory)
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchLower) ||
        blog.content.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    return filtered
  }, [blogs, searchTerm, selectedCategory])

  // Extract unique categories
  const categories = useMemo(() => 
    [...new Set(blogs.map(blog => blog.category))], 
    [blogs]
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading articles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Articles</h2>
          <p className="text-gray-500 mb-6 text-sm">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
          <button 
            onClick={() => refetch()}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Simple Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Latest <span className="font-semibold text-blue-700">Articles</span>
              </h1>
              <p className="text-gray-700 text-sm font-medium">
                Explore {filteredBlogs.length} educational insights and success stories
              </p>
            </div>
            <div className="flex items-center gap-3 bg-blue-700 p-3 rounded-xl text-white">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xl font-light text-white">{filteredBlogs.length}</p>
                <p className="text-xs text-white/80">Articles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Filters */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
              <input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="w-full px-3 py-2 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg text-sm text-red-600 hover:text-red-700 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              <X size={14} />
              Clear Filters
            </button>

            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm font-medium">
              <span>{filteredBlogs.length} results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-700 text-sm font-medium">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border border-blue-100 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Article Image */}
                  <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={blog.image || `https://picsum.photos/seed/${blog.slug}/300/200`}
                      alt={blog.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Article Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{blog.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 text-xs font-medium rounded-lg border border-blue-200">
                            {blog.category}
                          </span>
                          <div className="flex items-center text-blue-700 text-xs font-medium">
                            <Calendar size={12} className="mr-1" />
                            {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full">
                        Published
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-2 mb-4 font-medium">
                      {blog.content || 'Read this insightful article to learn more about educational opportunities and success strategies.'}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
                      <div className="flex items-center gap-1 text-blue-700 font-medium">
                        <User size={14} />
                        <span>{blog.author || 'Education Team'}</span>
                      </div>
                      {blog.read_time && (
                        <div className="flex items-center gap-1 text-green-700 font-medium">
                          <Clock size={14} />
                          <span>{blog.read_time} min read</span>
                        </div>
                      )}
                      {blog.views && (
                        <div className="flex items-center gap-1 text-purple-700 font-medium">
                          <Eye size={14} />
                          <span>{blog.views} views</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span key={`${tag}-${index}`} className="inline-block px-2 py-1 bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200">
                            #{tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="inline-block px-2 py-1 bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 text-xs font-medium rounded-lg border border-gray-200">
                            +{blog.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Link href={`/blogs/${blog.slug}`}>
                        <button className="text-blue-700 hover:text-blue-800 font-semibold text-sm transition-colors flex items-center gap-1">
                          Read Article
                          <span className="text-blue-600">→</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* End of results */}
        {filteredBlogs.length > 0 && (
          <div className="text-center py-8 border-t border-blue-100 mt-8">
            <p className="text-gray-700 text-sm font-medium">
              Showing all {filteredBlogs.length} articles
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
