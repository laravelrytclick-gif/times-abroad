import React, { createContext, useContext, useState, ReactNode } from 'react'

// Types for different admin entities
export interface Country {
  _id?: string
  name: string
  slug: string
  flag: string
  description: string
  meta_title: string
  meta_description: string
  is_active: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Exam {
  _id?: string
  name: string
  slug: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  is_active: boolean
  short_name: string
  image_url: string
  display_order: number
  hero_section: {
    title: string
    subtitle: string
    image: string
  }
  overview: {
    title: string
    content: string
    key_highlights: string[]
  }
  registration: {
    title: string
    description: string
    bullet_points: string[]
  }
  exam_pattern: {
    title: string
    description: string
    total_duration_mins: number
    score_range: string
    table_data: any[]
  }
  exam_dates: {
    title: string
    important_dates: any[]
  }
  result_statistics: {
    title: string
    description: string
    passing_criteria: string
    total_marks: number
    passing_marks: number
  }
  createdAt?: string
  updatedAt?: string
}

export interface Blog extends Record<string, unknown> {
  _id?: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image: string
  excerpt?: string
  is_active: boolean
  related_exams: string[]
  createdAt?: string
  updatedAt?: string
}

export interface College extends Record<string, unknown> {
  _id?: string
  name: string
  slug: string
  college_type?: 'study_abroad' | 'mbbs_abroad'
  country_ref: string | { name: string; slug: string }
  exams: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  createdAt?: string
  updatedAt?: string
  logo?: string
  website?: string
  description: string
  features: string[]
  why_choose_us?: {
    title: string
    description: string
    features: { title: string; description: string }[]
  }
  ranking_section?: {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  admission_process?: {
    title: string
    description: string
    steps: string[]
  }
  documents_required?: {
    title: string
    description: string
    documents: string[]
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
  scholarship?: {
    title: string
    description: string
    scholarships: { name: string; amount: string; description: string }[]
  }
  placement?: {
    title: string
    description: string
    placement_rate: string
    top_companies: string[]
  }
  contact_info?: {
    phone?: string
    email?: string
    website?: string
  }
  meta_title?: string
  meta_description?: string
  display_order?: number

  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  key_highlights?: {
    title: string
    description: string
    features: string[]
  }
  campus_highlights?: {
    title: string
    description: string
    highlights: string[]
  }
}

export interface Enquiry {
  _id?: string
  id?: string
  name: string
  email: string
  phone: string
  city: string
  interest: string
  message: string
  status: 'pending' | 'contacted' | 'resolved' | 'closed'
  createdAt?: string
  updatedAt?: string
}

// Admin Context Interface
interface AdminContextType {
  // Countries state
  countries: {
    isModalOpen: boolean
    setIsModalOpen: (open: boolean) => void
    editingCountry: Country | null
    setEditingCountry: (country: Country | null) => void
    formData: Country
    setFormData: (data: Country | ((prev: Country) => Country)) => void
    countryToDelete: Country | null
    setCountryToDelete: (country: Country | null) => void
    deleteModalOpen: boolean
    setDeleteModalOpen: (open: boolean) => void
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedStatus: string
    setSelectedStatus: (status: string) => void
    currentPage: number
    setCurrentPage: (page: number) => void
    debouncedSearchTerm: string
    setDebouncedSearchTerm: (term: string) => void
  }

  // Exams state
  exams: {
    isModalOpen: boolean
    setIsModalOpen: (open: boolean) => void
    editingExam: Exam | null
    setEditingExam: (exam: Exam | null) => void
    formData: Exam
    setFormData: (data: Exam | ((prev: Exam) => Exam)) => void
    examToDelete: Exam | null
    setExamToDelete: (exam: Exam | null) => void
    deleteModalOpen: boolean
    setDeleteModalOpen: (open: boolean) => void
    activeTab: string
    setActiveTab: (tab: string) => void
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedType: string
    setSelectedType: (type: string) => void
    selectedStatus: string
    setSelectedStatus: (status: string) => void
    currentPage: number
    setCurrentPage: (page: number) => void
    debouncedSearchTerm: string
    setDebouncedSearchTerm: (term: string) => void
  }

  // Blogs state
  blogs: {
    isModalOpen: boolean
    setIsModalOpen: (open: boolean) => void
    editingBlog: Blog | null
    setEditingBlog: (blog: Blog | null) => void
    formData: Blog
    setFormData: (data: Blog | ((prev: Blog) => Blog)) => void
    blogToDelete: Blog | null
    setBlogToDelete: (blog: Blog | null) => void
    deleteModalOpen: boolean
    setDeleteModalOpen: (open: boolean) => void
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    selectedStatus: string
    setSelectedStatus: (status: string) => void
    currentPage: number
    setCurrentPage: (page: number) => void
    debouncedSearchTerm: string
    setDebouncedSearchTerm: (term: string) => void
  }

  // Colleges state
  colleges: {
    isModalOpen: boolean
    setIsModalOpen: (open: boolean) => void
    editingCollege: College | null
    setEditingCollege: (college: College | null) => void
    formData: College
    setFormData: (data: College | ((prev: College) => College)) => void
    collegeToDelete: College | null
    setCollegeToDelete: (college: College | null) => void
    deleteModalOpen: boolean
    setDeleteModalOpen: (open: boolean) => void
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedCountry: string
    setSelectedCountry: (country: string) => void
    selectedStatus: string
    setSelectedStatus: (status: string) => void
    currentPage: number
    setCurrentPage: (page: number | ((prev: number) => number)) => void
    debouncedSearchTerm: string
    setDebouncedSearchTerm: (term: string) => void
  }

  // Enquiries state
  enquiries: {
    isModalOpen: boolean
    setIsModalOpen: (open: boolean) => void
    selectedEnquiry: Enquiry | null
    setSelectedEnquiry: (enquiry: Enquiry | null) => void
    enquiryToDelete: Enquiry | null
    setEnquiryToDelete: (enquiry: Enquiry | null) => void
    deleteModalOpen: boolean
    setDeleteModalOpen: (open: boolean) => void
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedStatus: string
    setSelectedStatus: (status: string) => void
    selectedInterest: string
    setSelectedInterest: (interest: string) => void
    currentPage: number
    setCurrentPage: (page: number) => void
    debouncedSearchTerm: string
    setDebouncedSearchTerm: (term: string) => void
  }

  // Utility functions
  resetForm: (entity: 'countries' | 'exams' | 'blogs' | 'colleges' | 'enquiries') => void
}

// Create Context
const AdminContext = createContext<AdminContextType | undefined>(undefined)

// Provider Component
export function AdminProvider({ children }: { children: ReactNode }) {
  // Countries state
  const [countriesModalOpen, setCountriesModalOpen] = useState(false)
  const [editingCountry, setEditingCountry] = useState<Country | null>(null)
  const [countriesFormData, setCountriesFormData] = useState<Country>({
    name: '',
    slug: '',
    flag: '',
    description: '',
    meta_title: '',
    meta_description: '',
    is_active: true
  })
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null)
  const [countriesDeleteModalOpen, setCountriesDeleteModalOpen] = useState(false)
  const [countriesSearchTerm, setCountriesSearchTerm] = useState('')
  const [countriesSelectedStatus, setCountriesSelectedStatus] = useState<string>('all')
  const [countriesCurrentPage, setCountriesCurrentPage] = useState(1)
  const [countriesDebouncedSearchTerm, setCountriesDebouncedSearchTerm] = useState('')

  // Exams state
  const [examsModalOpen, setExamsModalOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<Exam | null>(null)
  const [examsFormData, setExamsFormData] = useState<Exam>({
    name: '',
    slug: '',
    exam_type: 'national',
    conducting_body: '',
    exam_mode: '',
    frequency: '',
    description: '',
    is_active: true,
    short_name: '',
    image_url: '',
    display_order: 0,
    hero_section: {
      title: '',
      subtitle: '',
      image: ''
    },
    overview: {
      title: '',
      content: '',
      key_highlights: []
    },
    registration: {
      title: '',
      description: '',
      bullet_points: []
    },
    exam_pattern: {
      title: '',
      description: '',
      total_duration_mins: 0,
      score_range: '',
      table_data: []
    },
    exam_dates: {
      title: '',
      important_dates: []
    },
    result_statistics: {
      title: '',
      description: '',
      passing_criteria: '',
      total_marks: 0,
      passing_marks: 0
    }
  })
  const [examToDelete, setExamToDelete] = useState<Exam | null>(null)
  const [examsDeleteModalOpen, setExamsDeleteModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [examsSearchTerm, setExamsSearchTerm] = useState('')
  const [examsSelectedType, setExamsSelectedType] = useState<string>('all')
  const [examsSelectedStatus, setExamsSelectedStatus] = useState<string>('all')
  const [examsCurrentPage, setExamsCurrentPage] = useState(1)
  const [examsDebouncedSearchTerm, setExamsDebouncedSearchTerm] = useState('')

  // Blogs state
  const [blogsModalOpen, setBlogsModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [blogsFormData, setBlogsFormData] = useState<Blog>({
    title: '',
    slug: '',
    category: '',
    tags: [],
    content: '',
    image: '',
    excerpt: '',
    is_active: true,
    related_exams: []
  })
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null)
  const [blogsDeleteModalOpen, setBlogsDeleteModalOpen] = useState(false)
  const [blogsSearchTerm, setBlogsSearchTerm] = useState('')
  const [blogsSelectedCategory, setBlogsSelectedCategory] = useState<string>('all')
  const [blogsSelectedStatus, setBlogsSelectedStatus] = useState<string>('all')
  const [blogsCurrentPage, setBlogsCurrentPage] = useState(1)
  const [blogsDebouncedSearchTerm, setBlogsDebouncedSearchTerm] = useState('')

  // Colleges state
  const [collegesModalOpen, setCollegesModalOpen] = useState(false)
  const [editingCollege, setEditingCollege] = useState<College | null>(null)
  const [collegesFormData, setCollegesFormData] = useState<College>({
    name: '',
    slug: '',
    college_type: 'study_abroad',
    country_ref: '',
    exams: [],
    description: '',
    features: [],
    is_active: true,
    overview: {
      title: '',
      description: ''
    },
    key_highlights: {
      title: '',
      description: '',
      features: []
    },
    why_choose_us: {
      title: '',
      description: '',
      features: []
    },
    ranking_section: {
      title: '',
      description: '',
      country_ranking: '',
      world_ranking: '',
      accreditation: []
    },
    admission_process: {
      title: '',
      description: '',
      steps: []
    },
    documents_required: {
      title: '',
      description: '',
      documents: []
    },
    fees_structure: {
      title: '',
      description: '',
      courses: []
    },
    campus_highlights: {
      title: '',
      description: '',
      highlights: []
    }
  })
  const [collegeToDelete, setCollegeToDelete] = useState<College | null>(null)
  const [collegesDeleteModalOpen, setCollegesDeleteModalOpen] = useState(false)
  const [collegesSearchTerm, setCollegesSearchTerm] = useState('')
  const [collegesSelectedCountry, setCollegesSelectedCountry] = useState<string>('all')
  const [collegesSelectedStatus, setCollegesSelectedStatus] = useState<string>('all')
  const [collegesCurrentPage, setCollegesCurrentPage] = useState(1)
  const [collegesDebouncedSearchTerm, setCollegesDebouncedSearchTerm] = useState('')

  // Enquiries state
  const [enquiriesModalOpen, setEnquiriesModalOpen] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null)
  const [enquiriesDeleteModalOpen, setEnquiriesDeleteModalOpen] = useState(false)
  const [enquiriesSearchTerm, setEnquiriesSearchTerm] = useState('')
  const [enquiriesSelectedStatus, setEnquiriesSelectedStatus] = useState<string>('all')
  const [enquiriesSelectedInterest, setEnquiriesSelectedInterest] = useState<string>('all')
  const [enquiriesCurrentPage, setEnquiriesCurrentPage] = useState(1)
  const [enquiriesDebouncedSearchTerm, setEnquiriesDebouncedSearchTerm] = useState('')

  // Utility function to reset forms
  const resetForm = (entity: 'countries' | 'exams' | 'blogs' | 'colleges' | 'enquiries') => {
    switch (entity) {
      case 'countries':
        setCountriesFormData({
          name: '',
          slug: '',
          flag: '',
          description: '',
          meta_title: '',
          meta_description: '',
          is_active: true
        })
        setEditingCountry(null)
        break
      case 'exams':
        setExamsFormData({
          name: '',
          slug: '',
          exam_type: 'national',
          conducting_body: '',
          exam_mode: '',
          frequency: '',
          description: '',
          is_active: true,
          short_name: '',
          image_url: '',
          display_order: 0,
          hero_section: {
            title: '',
            subtitle: '',
            image: ''
          },
          overview: {
            title: '',
            content: '',
            key_highlights: []
          },
          registration: {
            title: '',
            description: '',
            bullet_points: []
          },
          exam_pattern: {
            title: '',
            description: '',
            total_duration_mins: 0,
            score_range: '',
            table_data: []
          },
          exam_dates: {
            title: '',
            important_dates: []
          },
          result_statistics: {
            title: '',
            description: '',
            passing_criteria: '',
            total_marks: 0,
            passing_marks: 0
          }
        })
        setEditingExam(null)
        break
      case 'blogs':
        setBlogsFormData({
          title: '',
          slug: '',
          category: '',
          tags: [],
          content: '',
          image: '',
          excerpt: '',
          is_active: true,
          related_exams: []
        })
        setEditingBlog(null)
        break
      case 'colleges':
        setCollegesFormData({
          name: '',
          slug: '',
          college_type: 'study_abroad',
          country_ref: '',
          exams: [],
          description: '',
          features: [],
          is_active: true,
          overview: {
            title: '',
            description: ''
          },
          key_highlights: {
            title: '',
            description: '',
            features: []
          },
          why_choose_us: {
            title: '',
            description: '',
            features: []
          },
          ranking_section: {
            title: '',
            description: '',
            country_ranking: '',
            world_ranking: '',
            accreditation: []
          },
          admission_process: {
            title: '',
            description: '',
            steps: []
          },
          documents_required: {
            title: '',
            description: '',
            documents: []
          },
          fees_structure: {
            title: '',
            description: '',
            courses: []
          },
          campus_highlights: {
            title: '',
            description: '',
            highlights: []
          }
        })
        setEditingCollege(null)
        break
      case 'enquiries':
        // Enquiries don't have forms, just reset selected enquiry
        setSelectedEnquiry(null)
        break
    }
  }

  const contextValue: AdminContextType = {
    countries: {
      isModalOpen: countriesModalOpen,
      setIsModalOpen: setCountriesModalOpen,
      editingCountry,
      setEditingCountry,
      formData: countriesFormData,
      setFormData: setCountriesFormData,
      countryToDelete,
      setCountryToDelete,
      deleteModalOpen: countriesDeleteModalOpen,
      setDeleteModalOpen: setCountriesDeleteModalOpen,
      searchTerm: countriesSearchTerm,
      setSearchTerm: setCountriesSearchTerm,
      selectedStatus: countriesSelectedStatus,
      setSelectedStatus: setCountriesSelectedStatus,
      currentPage: countriesCurrentPage,
      setCurrentPage: setCountriesCurrentPage,
      debouncedSearchTerm: countriesDebouncedSearchTerm,
      setDebouncedSearchTerm: setCountriesDebouncedSearchTerm
    },
    exams: {
      isModalOpen: examsModalOpen,
      setIsModalOpen: setExamsModalOpen,
      editingExam,
      setEditingExam,
      formData: examsFormData,
      setFormData: setExamsFormData,
      examToDelete,
      setExamToDelete,
      deleteModalOpen: examsDeleteModalOpen,
      setDeleteModalOpen: setExamsDeleteModalOpen,
      activeTab,
      setActiveTab,
      searchTerm: examsSearchTerm,
      setSearchTerm: setExamsSearchTerm,
      selectedType: examsSelectedType,
      setSelectedType: setExamsSelectedType,
      selectedStatus: examsSelectedStatus,
      setSelectedStatus: setExamsSelectedStatus,
      currentPage: examsCurrentPage,
      setCurrentPage: setExamsCurrentPage,
      debouncedSearchTerm: examsDebouncedSearchTerm,
      setDebouncedSearchTerm: setExamsDebouncedSearchTerm
    },
    blogs: {
      isModalOpen: blogsModalOpen,
      setIsModalOpen: setBlogsModalOpen,
      editingBlog,
      setEditingBlog,
      formData: blogsFormData,
      setFormData: setBlogsFormData,
      blogToDelete,
      setBlogToDelete,
      deleteModalOpen: blogsDeleteModalOpen,
      setDeleteModalOpen: setBlogsDeleteModalOpen,
      searchTerm: blogsSearchTerm,
      setSearchTerm: setBlogsSearchTerm,
      selectedCategory: blogsSelectedCategory,
      setSelectedCategory: setBlogsSelectedCategory,
      selectedStatus: blogsSelectedStatus,
      setSelectedStatus: setBlogsSelectedStatus,
      currentPage: blogsCurrentPage,
      setCurrentPage: setBlogsCurrentPage,
      debouncedSearchTerm: blogsDebouncedSearchTerm,
      setDebouncedSearchTerm: setBlogsDebouncedSearchTerm
    },
    colleges: {
      isModalOpen: collegesModalOpen,
      setIsModalOpen: setCollegesModalOpen,
      editingCollege,
      setEditingCollege,
      formData: collegesFormData,
      setFormData: setCollegesFormData,
      collegeToDelete,
      setCollegeToDelete,
      deleteModalOpen: collegesDeleteModalOpen,
      setDeleteModalOpen: setCollegesDeleteModalOpen,
      searchTerm: collegesSearchTerm,
      setSearchTerm: setCollegesSearchTerm,
      selectedCountry: collegesSelectedCountry,
      setSelectedCountry: setCollegesSelectedCountry,
      selectedStatus: collegesSelectedStatus,
      setSelectedStatus: setCollegesSelectedStatus,
      currentPage: collegesCurrentPage,
      setCurrentPage: setCollegesCurrentPage,
      debouncedSearchTerm: collegesDebouncedSearchTerm,
      setDebouncedSearchTerm: setCollegesDebouncedSearchTerm
    },
    enquiries: {
      isModalOpen: enquiriesModalOpen,
      setIsModalOpen: setEnquiriesModalOpen,
      selectedEnquiry,
      setSelectedEnquiry,
      enquiryToDelete,
      setEnquiryToDelete,
      deleteModalOpen: enquiriesDeleteModalOpen,
      setDeleteModalOpen: setEnquiriesDeleteModalOpen,
      searchTerm: enquiriesSearchTerm,
      setSearchTerm: setEnquiriesSearchTerm,
      selectedStatus: enquiriesSelectedStatus,
      setSelectedStatus: setEnquiriesSelectedStatus,
      selectedInterest: enquiriesSelectedInterest,
      setSelectedInterest: setEnquiriesSelectedInterest,
      currentPage: enquiriesCurrentPage,
      setCurrentPage: setEnquiriesCurrentPage,
      debouncedSearchTerm: enquiriesDebouncedSearchTerm,
      setDebouncedSearchTerm: setEnquiriesDebouncedSearchTerm
    },
    resetForm
  }

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  )
}

// Hook to use the context
export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
