import { useQuery } from '@tanstack/react-query'

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

interface BlogsResponse {
  blogs: Blog[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}

// Fetch blogs with pagination
const fetchBlogs = async ({ 
  pageParam = 1, 
  search = '', 
  category = ''
}): Promise<BlogsResponse> => {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: '9',
    ...(search && { search }),
    ...(category && category !== 'all' && { category })
  })

  const response = await fetch(`/api/blogs?${params}`)
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch blogs')
  }
  
  return {
    blogs: result.data.blogs || [],
    total: result.data.total || 0,
    page: pageParam,
    totalPages: Math.ceil((result.data.total || 0) / 9),
    hasMore: (result.data.blogs || []).length === 9
  }
}

// Fetch single blog by slug
const fetchBlogBySlug = async (slug: string): Promise<Blog> => {
  const response = await fetch(`/api/blogs/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Blog not found')
    }
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch blog')
  }
  
  return result.data
}

// Hook for paginated blogs
export function useBlogs(page: number, search: string, category: string) {
  return useQuery({
    queryKey: ['blogs', 'paginated', page, search, category],
    queryFn: () => fetchBlogs({ 
      pageParam: page, 
      search, 
      category 
    }),
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
 
// Hook for single blog details
export function useBlog(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

// Hook for blog categories (derived from blogs)
export function useBlogCategories(blogs: Blog[] = []) {
  const categories = [...new Set(blogs.map(blog => blog.category))]
  return categories
}
