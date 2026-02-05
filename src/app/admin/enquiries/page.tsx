'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
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
import { Plus, Search, Filter, Mail, Phone, Calendar, User, MessageSquare, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface Enquiry {
  _id?: string
  id?: string
  name: string
  email: string
  phone: string
  city: string
  interest: string
  message?: string
  status: 'pending' | 'contacted' | 'resolved' | 'closed'
  createdAt: string
  updatedAt: string
}

// Mock data - replace with actual API call
const mockEnquiries: Enquiry[] = [
  {
    _id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 9876543210',
    city: 'Delhi',
    interest: 'study-abroad',
    message: 'I want to study engineering in USA',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    _id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 9876543211',
    city: 'Mumbai',
    interest: 'mbbs-abroad',
    message: 'Interested in MBBS in Russia',
    status: 'contacted',
    createdAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-15T09:20:00Z'
  },
  {
    _id: '3',
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 9876543212',
    city: 'Bangalore',
    interest: 'study-abroad',
    message: 'Looking for MBA programs in Canada',
    status: 'resolved',
    createdAt: '2024-01-13T12:15:00Z',
    updatedAt: '2024-01-16T14:30:00Z'
  }
]

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [interestFilter, setInterestFilter] = useState<string>('all')
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<Enquiry | null>(null)

  // Fetch enquiries from API
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch('/api/enquiries')
        const data = await response.json()
        
        if (data.success) {
          setEnquiries(data.data)
        } else {
          setError(data.error || 'Failed to fetch enquiries')
        }
      } catch (err) {
        setError('Failed to fetch enquiries')
        console.error('Error fetching enquiries:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()
  }, [])

  // Filter enquiries
  const filteredEnquiries = useMemo(() => {
    let filtered = enquiries

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(enquiry => enquiry.status === statusFilter)
    }

    // Filter by interest
    if (interestFilter !== 'all') {
      filtered = filtered.filter(enquiry => enquiry.interest === interestFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(enquiry =>
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.phone.includes(searchTerm) ||
        enquiry.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [enquiries, searchTerm, statusFilter, interestFilter])

  const handleViewEnquiry = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setIsModalOpen(true)
  }

  const handleStatusChange = (enquiryId: string, newStatus: Enquiry['status']) => {
    if (!enquiryId) return
    
    setEnquiries(prev => prev.map(enquiry => 
      (enquiry._id || enquiry.id) === enquiryId 
        ? { ...enquiry, status: newStatus, updatedAt: new Date().toISOString() }
        : enquiry
    ))
    toast.success('Enquiry status updated successfully!')
  }

  const handleDeleteEnquiry = (enquiry: Enquiry) => {
    setDeleteConfirmOpen(enquiry)
  }

  const confirmDelete = async () => {
    if (!deleteConfirmOpen) return
    
    try {
      const enquiryId = deleteConfirmOpen._id || deleteConfirmOpen.id
      console.log('Deleting enquiry with ID:', enquiryId)
      console.log('Full enquiry object:', deleteConfirmOpen)
      
      if (!enquiryId) {
        toast.error('No enquiry ID found')
        return
      }
      
      // Call API to delete
      const response = await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'DELETE'
      })

      console.log('Delete response status:', response.status)
      const responseData = await response.json()
      console.log('Delete response data:', responseData)

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to delete enquiry')
      }

      setEnquiries(prev => prev.filter(e => (e._id || e.id) !== enquiryId))
      toast.success('Enquiry deleted successfully!')
      setDeleteConfirmOpen(null)
    } catch (error) {
      console.error('Error deleting enquiry:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to delete enquiry')
    }
  }

  const getStatusColor = (status: Enquiry['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200'
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getInterestColor = (interest: string) => {
    switch (interest) {
      case 'study-abroad': return 'bg-blue-600 text-white'
      case 'mbbs-abroad': return 'bg-purple-600 text-white'
      default: return 'bg-gray-600 text-white'
    }
  }

  const columns = [
    {
      key: 'name' as keyof Enquiry,
      title: 'Student Name',
      render: (value: string, record: Enquiry) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{record.city}</div>
          </div>
        </div>
      )
    },
    {
      key: 'email' as keyof Enquiry,
      title: 'Contact',
      render: (value: string, record: Enquiry) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <Mail className="w-3 h-3 text-gray-400" />
            <span className="truncate">{value}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Phone className="w-3 h-3 text-gray-400" />
            <span>{record.phone}</span>
          </div>
        </div>
      )
    },
    {
      key: 'interest' as keyof Enquiry,
      title: 'Interest',
      render: (value: string) => (
        <div className={`flex px-2 py-1 rounded-lg text-xs font-medium ${getInterestColor(value)}`}>
          {value === 'study-abroad' ? 'Study Abroad' : 'MBBS Abroad'}
        </div>
      )
    },
    {
      key: 'status' as keyof Enquiry,
      title: 'Status',
      render: (value: Enquiry['status'], record: Enquiry) => (
        <Select
          value={value}
          onValueChange={(newValue) => {
            const enquiryId = record._id || record.id
            if (enquiryId) {
              handleStatusChange(enquiryId, newValue as Enquiry['status'])
            }
          }}
        >
          <SelectTrigger className={`w-32 ${getStatusColor(value)}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )
    },
    {
      key: 'createdAt' as keyof Enquiry,
      title: 'Date',
      render: (value: string) => {
        const date = new Date(value)
        return (
          <div className="text-sm">
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-3 h-3" />
              {date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <div className="text-xs text-gray-400">
              {date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        )
      }
    },
    {
      key: 'actions' as keyof Enquiry,
      title: 'Actions',
      render: (value: any, record: Enquiry) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewEnquiry(record)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteEnquiry(record)}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Student Enquiries</h2>
          <p className="text-sm text-gray-500">
            Manage student enquiries and contact requests
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, email, phone, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={interestFilter} onValueChange={setInterestFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Interests</SelectItem>
            <SelectItem value="study-abroad">Study Abroad</SelectItem>
            <SelectItem value="mbbs-abroad">MBBS Abroad</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{enquiries.length}</div>
              <div className="text-sm text-gray-500">Total Enquiries</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {enquiries.filter(e => e.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {enquiries.filter(e => e.status === 'resolved').length}
              </div>
              <div className="text-sm text-gray-500">Resolved</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {enquiries.filter(e => e.interest === 'mbbs-abroad').length}
              </div>
              <div className="text-sm text-gray-500">MBBS Enquiries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <AdminTable
        data={filteredEnquiries}
        columns={columns}
        loading={loading}
      />

      {/* View Modal */}
      <AdminModal
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        title="Enquiry Details"
        size="lg"
      >
        {selectedEnquiry && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-gray-900 font-medium">{selectedEnquiry.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{selectedEnquiry.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-gray-900">{selectedEnquiry.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">City</label>
                <p className="mt-1 text-gray-900">{selectedEnquiry.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Interest</label>
                <div className="mt-1">
                  <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${getInterestColor(selectedEnquiry.interest)}`}>
                    {selectedEnquiry.interest === 'study-abroad' ? 'Study Abroad' : 'MBBS Abroad'}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(selectedEnquiry.status)}`}>
                    {selectedEnquiry.status.charAt(0).toUpperCase() + selectedEnquiry.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
            
            {selectedEnquiry.message && (
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedEnquiry.message}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <label className="text-sm font-medium text-gray-700">Created</label>
                <p className="mt-1">
                  {new Date(selectedEnquiry.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Last Updated</label>
                <p className="mt-1">
                  {new Date(selectedEnquiry.updatedAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </AdminModal>
      
      {/* Delete Confirmation Modal */}
      <AdminModal
        open={!!deleteConfirmOpen}
        onOpenChange={() => setDeleteConfirmOpen(null)}
        title="Confirm Delete"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are you sure?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone. This will permanently delete the enquiry from 
                <span className="font-medium">{deleteConfirmOpen?.name}</span>.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(null)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}
