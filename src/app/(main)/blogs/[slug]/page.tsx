'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  ArrowLeft, 
  Share2,
  FileText,
  Bookmark,
  ChevronRight
} from 'lucide-react'
import { useBlog } from '@/hooks/useBlogs'

const BlogDetailPage = () => {
  const params = useParams()
  const slug = params.slug as string
  
  const { 
    data: blog, 
    isLoading, 
    error, 
    refetch 
  } = useBlog(slug)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Fetching Intelligence...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2 italic">Article Unavailable</h2>
          <p className="text-slate-500 mb-8 font-medium">The resource you're looking for has moved or no longer exists in our 2026 directory.</p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => refetch()} className="bg-blue-600 hover:bg-slate-900 text-white rounded-2xl h-12 font-bold transition-all">
              Retry Connection
            </Button>
            <Link href="/blogs">
              <Button variant="ghost" className="text-blue-600 font-bold">Return to Library</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Progress Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/blogs" className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Insights</span>
          </Link>
          {/* <div className="flex gap-4">
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-blue-600">
              <Share2 size={18} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-blue-600">
              <Bookmark size={18} />
            </button>
          </div> */}
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Meta & Sidebar */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-32 space-y-10">
              
              {/* Category & Tags */}
              <div>
                <Badge className="bg-blue-600 text-white hover:bg-blue-700 border-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] mb-6">
                  {blog.category}
                </Badge>
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100/50">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Card */}
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
                    {blog.author?.[0] || 'A'}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Written By</p>
                    <h4 className="font-bold text-slate-900">{blog.author || 'Alpha World Education'}</h4>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase"><Calendar size={14}/> Date</div>
                    <span className="text-xs font-medium">{new Date(blog.published_at || blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase"><Clock size={14}/> Reading</div>
                    <span className="text-xs font-medium">{blog.read_time || 5} min read</span>
                  </div>
          
                </div>
              </div>

              {/* Related Exams - Styled as a Roadmap */}
              {blog.related_exams.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Related Pathway Exams</h3>
                  <div className="grid gap-2">
                    {blog.related_exams.map((exam) => (
                      <div key={exam} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-300 transition-colors group cursor-pointer">
                        <span className="text-sm font-bold text-slate-700">{exam}</span>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Main Content */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-10">
              {blog.title}
            </h1>

            {blog.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-[3rem] shadow-2xl shadow-blue-100/50 mb-12">
                <img
                  src={blog.image.startsWith('http') ? blog.image : `/images/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-blue prose-lg max-w-none">
              <div 
                className="text-slate-700 leading-relaxed text-lg font-medium space-y-6"
                dangerouslySetInnerHTML={{ 
                  __html: blog.content.replace(/\n/g, '<br />') 
                }}
              />
            </div>

            {/* Newsletter Callout */}
            <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">Want more insights like this?</h3>
                <p className="text-slate-400 mb-8 max-w-md">Join 15,000+ students receiving the 2026 Global Education updates directly in their inbox.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                   <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 h-14 font-black">Get Started</Button>
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <Link href="/blogs">
                <Button variant="outline" className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white h-16 px-10 rounded-[2rem] font-black transition-all">
                  Browse Full Archives
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </article>
    </div>
  )
}

export default BlogDetailPage