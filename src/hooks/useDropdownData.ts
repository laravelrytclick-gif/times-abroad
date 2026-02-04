import { useQuery } from '@tanstack/react-query'

interface College {
  _id: string
  name: string
  slug: string
  college_type?: 'study_abroad' | 'mbbs_abroad'
  category?: string
}

interface Exam {
  _id: string
  short_name: string
  slug: string
}

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
}

interface DropdownData {
  colleges: College[]
  exams: Exam[]
  countries: Country[]
  loading: boolean
  error: string | null
}

const fetchColleges = async (): Promise<College[]> => {
  console.log('🔍 [Dropdown] Fetching colleges from API...')
  const response = await fetch('/api/colleges?limit=100') // Fetch even more colleges
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const result = await response.json()
  console.log('🔍 [Dropdown] API response:', result)
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch colleges')
  }
  const colleges = result.data.colleges || []
  console.log('🔍 [Dropdown] Colleges fetched:', colleges.length)
  console.log('🔍 [Dropdown] Colleges with college_type:', colleges.filter((c: any) => c.college_type).length)
  console.log('🔍 [Dropdown] Study abroad colleges:', colleges.filter((c: any) => c.college_type === 'study_abroad').length)
  console.log('🔍 [Dropdown] MBBS abroad colleges:', colleges.filter((c: any) => c.college_type === 'mbbs_abroad').length)
  console.log('🔍 [Dropdown] Sample college data:', colleges[0])
  return colleges
}

const fetchExams = async (): Promise<Exam[]> => {
  const response = await fetch('/api/exams')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch exams')
  }
  return result.data
}

const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch('/api/countries')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch countries')
  }
  return result.data
}

export function useDropdownData(): DropdownData {
  const collegesQuery = useQuery({
    queryKey: ['dropdown-colleges'],
    queryFn: fetchColleges,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  })

  const examsQuery = useQuery({
    queryKey: ['dropdown-exams'],
    queryFn: fetchExams,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  })

  const countriesQuery = useQuery({
    queryKey: ['dropdown-countries'],
    queryFn: fetchCountries,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 45 * 60 * 1000, // 45 minutes
    retry: 2,
  })

  const isLoading = collegesQuery.isLoading || examsQuery.isLoading || countriesQuery.isLoading
  const error = collegesQuery.error || examsQuery.error || countriesQuery.error

  return {
    colleges: collegesQuery.data || [],
    exams: examsQuery.data || [],
    countries: countriesQuery.data || [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null
  }
}
