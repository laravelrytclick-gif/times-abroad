'use client'

import { useState, useEffect } from 'react'
import { AdminTable } from '@/components/admin/AdminTable'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { generateSlug } from '@/lib/slug'
import { useAdminExams, useSaveExam, useDeleteExam, AdminExam } from '@/hooks/useAdminExams'
import { useAdmin, Exam } from '@/contexts/AdminContext'
import { toast } from 'sonner'

// Function to generate small format slug
const generateSmallSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]/g, '')     // Remove all non-word chars except -
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .substring(0, 20)             // Limit to 20 characters for small format
    .replace(/-+$/, '')           // Trim - from end of text
}

export default function SimpleExamsPage() {
  const {
    exams: {
      isModalOpen,
      setIsModalOpen,
      editingExam,
      setEditingExam,
      formData,
      setFormData,
      examToDelete,
      setExamToDelete,
      deleteModalOpen,
      setDeleteModalOpen,
      activeTab,
      setActiveTab,
      searchTerm,
      setSearchTerm,
      selectedType,
      setSelectedType,
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
  }, [debouncedSearchTerm, selectedType, selectedStatus])

  // TanStack Query hooks
  const { 
    data, 
    isLoading: dataLoading, 
    error, 
    refetch 
  } = useAdminExams(currentPage, debouncedSearchTerm, selectedType, selectedStatus)
  
  const exams = data?.exams || []
  const totalCount = data?.total || 0
  const totalPages = data?.totalPages || 1

  const saveExamMutation = useSaveExam()
  const deleteExamMutation = useDeleteExam()


  const handleSaveExam = async () => {
    console.log('=== EXAM DATA ===')
    console.log(JSON.stringify(formData, null, 2))
    
    try {
      // Comprehensive validation - ALL fields are required
      const validationErrors: string[] = []
      
      // Basic Info Validation
      if (!formData.name?.trim()) validationErrors.push('Exam name is required')
      if (!formData.slug?.trim()) validationErrors.push('Exam slug is required')
      if (!formData.short_name?.trim()) validationErrors.push('Short name is required')
      if (!formData.image_url?.trim()) validationErrors.push('Image URL is required')
      if (!formData.exam_type?.trim()) validationErrors.push('Exam type is required')
      if (!formData.conducting_body?.trim()) validationErrors.push('Conducting body is required')
      if (!formData.exam_mode?.trim()) validationErrors.push('Exam mode is required')
      if (!formData.frequency?.trim()) validationErrors.push('Frequency is required')
      if (!formData.description?.trim()) validationErrors.push('Description is required')
      if (formData.is_active === undefined || formData.is_active === null) validationErrors.push('Status is required')
      
      // Hero Section Validation
      if (!formData.hero_section?.title?.trim()) validationErrors.push('Hero section title is required')
      if (!formData.hero_section?.subtitle?.trim()) validationErrors.push('Hero section subtitle is required')
      if (!formData.hero_section?.image?.trim()) validationErrors.push('Hero section image is required')
      
      // Overview Validation
      if (!formData.overview?.title?.trim()) validationErrors.push('Overview title is required')
      if (!formData.overview?.content?.trim()) validationErrors.push('Overview content is required')
      if (!formData.overview?.key_highlights?.length) validationErrors.push('At least one key highlight is required')
      
      // Registration Validation
      if (!formData.registration?.title?.trim()) validationErrors.push('Registration title is required')
      if (!formData.registration?.description?.trim()) validationErrors.push('Registration description is required')
      if (!formData.registration?.bullet_points?.length) validationErrors.push('At least one registration bullet point is required')
      
      // Exam Pattern Validation
      if (!formData.exam_pattern?.title?.trim()) validationErrors.push('Exam pattern title is required')
      if (!formData.exam_pattern?.description?.trim()) validationErrors.push('Exam pattern description is required')
      if (!formData.exam_pattern?.total_duration_mins) validationErrors.push('Total duration is required')
      if (!formData.exam_pattern?.score_range?.trim()) validationErrors.push('Score range is required')
      if (!formData.exam_pattern?.table_data?.length) validationErrors.push('At least one exam pattern section is required')
      
      // Exam Dates Validation
      if (!formData.exam_dates?.title?.trim()) validationErrors.push('Exam dates title is required')
      if (!formData.exam_dates?.important_dates?.length) validationErrors.push('At least one important date is required')
      
      // Result Statistics Validation
      if (!formData.result_statistics?.title?.trim()) validationErrors.push('Result statistics title is required')
      if (!formData.result_statistics?.description?.trim()) validationErrors.push('Result statistics description is required')
      if (!formData.result_statistics?.passing_criteria?.trim()) validationErrors.push('Passing criteria is required')
      if (!formData.result_statistics?.total_marks) validationErrors.push('Total marks is required')
      if (!formData.result_statistics?.passing_marks) validationErrors.push('Passing marks is required')
      
      if (validationErrors.length > 0) {
        const errorMessage = `⚠️ Validation Error!\n\nPlease complete the following required fields before saving:\n\n${validationErrors.map((error, index) => `• ${error}`).join('\n')}\n\nPlease fill in all the missing information and try again.`
        alert(errorMessage)
        return
      }
      
      const payload = {
        ...formData,
        ...(editingExam && { _id: editingExam._id })
      }
      
      await saveExamMutation.mutateAsync(payload)
      toast.success('Exam saved successfully!')
      setIsModalOpen(false)
      setEditingExam(null)
    } catch (error) {
      console.error('Error saving exam:', error)
      toast.error('Error saving exam: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleAddExam = () => {
    setEditingExam(null)
    setFormData({
      name: '',
      slug: '',
      short_name: '',
      image_url: '',
      exam_type: 'International',
      conducting_body: '',
      exam_mode: 'Online',
      frequency: 'Monthly',
      description: '',
      is_active: true,
      display_order: 0,
      hero_section: {
        title: '',
        subtitle: '',
        image: ''
      },
      overview: {
        title: 'Overview',
        content: '',
        key_highlights: []
      },
      registration: {
        title: 'Registration',
        description: '',
        bullet_points: []
      },
      exam_pattern: {
        title: 'Exam Pattern',
        description: '',
        total_duration_mins: 120,
        score_range: '0-100',
        table_data: [] as Array<{section: string, questions: number, duration_mins: number}>
      },
      exam_dates: {
        title: 'Important Dates',
        important_dates: []
      },
      result_statistics: {
        title: 'Result Statistics',
        description: '',
        passing_criteria: '',
        total_marks: 100,
        passing_marks: 40
      }
    })
    setActiveTab('basic')
    setIsModalOpen(true)
  }

  const basicFields = [
    { name: 'name', label: 'Exam Name', type: 'text' as const, required: true },
    { name: 'slug', label: 'Slug', type: 'text' as const, required: true },
    { name: 'short_name', label: 'Short Name', type: 'text' as const, required: true },
    { name: 'image_url', label: 'Image URL', type: 'text' as const, required: false },
    { 
      name: 'exam_type', 
      label: 'Exam Type', 
      type: 'select' as const,
      options: [
        { value: 'National', label: 'National' },
        { value: 'State', label: 'State' },
        { value: 'University', label: 'University' },
        { value: 'International', label: 'International' }
      ],
      required: true
    },
    { name: 'conducting_body', label: 'Conducting Body', type: 'text' as const, required: true },
    {
      name: 'exam_mode',
      label: 'Exam Mode',
      type: 'select' as const,
      options: [
        { value: 'Online', label: 'Online' },
        { value: 'Offline', label: 'Offline' },
        { value: 'Hybrid', label: 'Hybrid' }
      ],
      required: true
    },
    {
      name: 'frequency',
      label: 'Frequency',
      type: 'select' as const,
      options: [
        { value: 'Once a year', label: 'Once a year' },
        { value: 'Twice a year', label: 'Twice a year' },
        { value: 'Quarterly', label: 'Quarterly' },
        { value: 'Monthly', label: 'Monthly' }
      ],
      required: true
    },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true }
  ]

  const columns = [
    {
      key: 'name' as keyof AdminExam,
      title: 'Exam Name',
      render: (value: string, record: AdminExam) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{record.short_name}</div>
        </div>
      )
    },
    {
      key: 'exam_type' as keyof AdminExam,
      title: 'Type',
      render: (value: string) => <div className='flex bg-gray-600 text-white rounded-2xl px-2 py-1 items-center gap-1'><p>{value}</p></div>
    },
    {
      key: 'conducting_body' as keyof AdminExam,
      title: 'Conducting Body'
    },
    {
      key: 'is_active' as keyof AdminExam,
      title: 'Status',
      render: (value: boolean) => (
        <div className={`flex items-center justify-center ${value ? 'bg-green-600' : 'bg-gray-600'} text-white rounded-2xl px-2 py-1 gap-1`}>
          <p className="text-center">{value ? 'Active' : 'Inactive'}</p>
        </div>
      )
    },
    {
      key: 'actions' as keyof AdminExam,
      title: 'Actions',
      render: (value: any, record: AdminExam) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setEditingExam(record)
                setFormData({
                  name: record.name,
                  slug: record.slug,
                  short_name: record.short_name,
                  image_url: record.image_url || '',
                  exam_type: record.exam_type,
                  conducting_body: record.conducting_body,
                  exam_mode: record.exam_mode,
                  frequency: record.frequency,
                  description: record.description,
                  is_active: record.is_active,
                  display_order: record.display_order,
                  hero_section: record.hero_section,
                  overview: record.overview,
                  registration: record.registration,
                  exam_pattern: record.exam_pattern,
                  exam_dates: record.exam_dates,
                  result_statistics: record.result_statistics
                })
                setActiveTab('basic')
                setIsModalOpen(true)
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // View functionality - could open a read-only modal or navigate to detail page
                console.log('View exam:', record)
                alert(`Viewing exam: ${record.name}`)
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                if (confirm(`Are you sure you want to delete "${record.name}"?`)) {
                  try {
                    await deleteExamMutation.mutateAsync(record._id!)
                    toast.success('Exam deleted successfully!')
                  } catch (error) {
                    toast.error('Error deleting exam')
                  }
                }
              }}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Simple Exams Management</h2>
          <p className="text-sm text-gray-500">
            {totalCount} exams total
          </p>
        </div>
        <Button onClick={handleAddExam}>
          <Plus className="h-4 w-4 mr-2" />
          Add Exam
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search exams by name, conducting body, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="International">International</SelectItem>
            <SelectItem value="National">National</SelectItem>
            <SelectItem value="State">State</SelectItem>
          </SelectContent>
        </Select>
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

      <AdminTable
        data={exams}
        columns={columns}
        loading={dataLoading}
      />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalCount)} of {totalCount} exams
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
        title="Manage Exam"
        showFooter={false}
        size="xl"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="pattern">Pattern</TabsTrigger>
            <TabsTrigger value="dates">Dates</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <AdminForm
              fields={basicFields}
              data={formData as unknown as Record<string, unknown>}
              onChange={(name, value) => {
                setFormData(prev => ({ ...prev, [name]: value }))
                // Only auto-generate slug when name changes, using small format
                if (name === 'name') {
                  const slug = generateSmallSlug(value as string)
                  setFormData(prev => ({ ...prev, slug: slug }))
                }
              }}
            />
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hero Title</label>
              <Input
                value={formData.hero_section.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  hero_section: { ...prev.hero_section, title: e.target.value }
                }) )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
              <Input
                value={formData.hero_section.subtitle}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  hero_section: { ...prev.hero_section, subtitle: e.target.value }
                }) )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hero Image</label>
              <Input
                value={formData.hero_section.image}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  hero_section: { ...prev.hero_section, image: e.target.value }
                }) )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Overview Title</label>
              <Input
                value={formData.overview.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  overview: { ...prev.overview, title: e.target.value }
                }) )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Overview Content</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
                value={formData.overview.content}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  overview: { ...prev.overview, content: e.target.value }
                }) )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Key Highlights</label>
              {formData.overview.key_highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={highlight}
                    onChange={(e) => {
                      const newHighlights = [...formData.overview.key_highlights]
                      newHighlights[index] = e.target.value
                      setFormData(prev => ({
                        ...prev,
                        overview: { ...prev.overview, key_highlights: newHighlights }
                      }) as AdminExam)
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newHighlights = formData.overview.key_highlights.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        overview: { ...prev.overview, key_highlights: newHighlights }
                      }) as AdminExam)
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  overview: { ...prev.overview, key_highlights: [...prev.overview.key_highlights, ''] }
                }) as AdminExam)}
              >
                Add Highlight
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="registration" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Registration Title</label>
              <Input
                value={formData.registration.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  registration: { ...prev.registration, title: e.target.value }
                }) as AdminExam)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Registration Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                value={formData.registration.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  registration: { ...prev.registration, description: e.target.value }
                }) as AdminExam)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bullet Points</label>
              {formData.registration.bullet_points.map((point, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...formData.registration.bullet_points]
                      newPoints[index] = e.target.value
                      setFormData(prev => ({
                        ...prev,
                        registration: { ...prev.registration, bullet_points: newPoints }
                      }) as AdminExam)
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newPoints = formData.registration.bullet_points.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        registration: { ...prev.registration, bullet_points: newPoints }
                      }) as AdminExam)
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  registration: { ...prev.registration, bullet_points: [...prev.registration.bullet_points, ''] }
                }) as AdminExam)}
              >
                Add Bullet Point
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="pattern" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pattern Title</label>
              <Input
                value={formData.exam_pattern.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pattern Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                value={formData.exam_pattern.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, description: e.target.value }
                }) as AdminExam)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Duration (Minutes)</label>
              <Input
                type="number"
                value={formData.exam_pattern.total_duration_mins}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, total_duration_mins: parseInt(e.target.value) || 120 }
                }) as AdminExam)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Score Range</label>
              <Input
                value={formData.exam_pattern.score_range}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, score_range: e.target.value }
                }) as AdminExam)}
                placeholder="e.g., 0-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Table Data</label>
              {formData.exam_pattern.table_data.map((row, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Section"
                    value={row.section}
                    onChange={(e) => {
                      const newTableData = [...formData.exam_pattern.table_data]
                      newTableData[index] = { ...row, section: e.target.value }
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }) as AdminExam)
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Questions"
                    value={row.questions}
                    onChange={(e) => {
                      const newTableData = [...formData.exam_pattern.table_data]
                      newTableData[index] = { ...row, questions: parseInt(e.target.value) || 0 }
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }) as AdminExam)
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Duration (mins)"
                    value={row.duration_mins}
                    onChange={(e) => {
                      const newTableData = [...formData.exam_pattern.table_data]
                      newTableData[index] = { ...row, duration_mins: parseInt(e.target.value) || 0 }
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }) as AdminExam)
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newTableData = formData.exam_pattern.table_data.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }) as AdminExam)
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, table_data: [...prev.exam_pattern.table_data, { section: '', questions: 0, duration_mins: 0 }] }
                }) as AdminExam)}
              >
                Add Row
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="dates" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Dates Title</label>
              <Input
                value={formData.exam_dates.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_dates: { ...prev.exam_dates, title: e.target.value }
                }) as AdminExam)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Important Dates</label>
              {formData.exam_dates.important_dates.map((date, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Event"
                    value={date.event}
                    onChange={(e) => {
                      const newDates = [...formData.exam_dates.important_dates]
                      newDates[index] = { ...date, event: e.target.value }
                      setFormData(prev => ({
                        ...prev,
                        exam_dates: { ...prev.exam_dates, important_dates: newDates }
                      }) as AdminExam)
                    }}
                  />
                  <Input
                    type="date"
                    value={date.date ? new Date(date.date).toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const newDates = [...formData.exam_dates.important_dates]
                      newDates[index] = { ...date, date: new Date(e.target.value) }
                      setFormData(prev => ({
                        ...prev,
                        exam_dates: { ...prev.exam_dates, important_dates: newDates }
                      }) as Exam)
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newDates = formData.exam_dates.important_dates.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        exam_dates: { ...prev.exam_dates, important_dates: newDates }
                      }) as Exam)
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  exam_dates: { ...prev.exam_dates, important_dates: [...prev.exam_dates.important_dates, { event: '', date: new Date() }] }
                }) as Exam)}
              >
                Add Date
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Results Title</label>
              <Input
                value={formData.result_statistics.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, title: e.target.value }
                }) as Exam)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Results Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                value={formData.result_statistics.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, description: e.target.value }
                }) as Exam)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Passing Criteria</label>
              <Input
                value={formData.result_statistics.passing_criteria}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, passing_criteria: e.target.value }
                }) as Exam)}
                placeholder="e.g., 40% or 160/400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Marks</label>
              <Input
                type="number"
                value={formData.result_statistics.total_marks}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, total_marks: parseInt(e.target.value) || 100 }
                }) as Exam)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Passing Marks</label>
              <Input
                type="number"
                value={formData.result_statistics.passing_marks}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, passing_marks: parseInt(e.target.value) || 40 }
                }) as Exam)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveExam} disabled={saveExamMutation.isPending}>
            {saveExamMutation.isPending ? 'Saving...' : 'Save Exam'}
          </Button>
        </div>
      </AdminModal>
    </div>
  )
}
