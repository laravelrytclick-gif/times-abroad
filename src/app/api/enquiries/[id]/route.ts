import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Enquiry from '@/models/Enquiry'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('PUT API called with params:', params)
    console.log('Request URL:', request.url)
    
    // Extract ID from params (it's a Promise in Next.js 13+)
    const { id } = await params
    
    console.log('Extracted ID:', id)
    
    if (!id) {
      console.log('No ID found in params')
      return NextResponse.json(
        { error: 'Enquiry ID is required' },
        { status: 400 }
      )
    }

    // Parse request body
    const body = await request.json()
    console.log('Request body:', body)

    // Validate required fields
    if (!body.status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    // Validate status values
    const validStatuses = ['pending', 'contacted', 'resolved', 'closed']
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    console.log('Connecting to database...')
    // Connect to database
    await connectDB()

    console.log('Updating enquiry with ID:', id, 'to status:', body.status)
    // Update enquiry
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { 
        status: body.status,
        updated_at: new Date()
      },
      { new: true, runValidators: true }
    )

    if (!updatedEnquiry) {
      console.log('Enquiry not found')
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      )
    }

    console.log('Enquiry updated successfully:', updatedEnquiry)

    // Map database fields to frontend interface
    const mappedEnquiry = {
      ...updatedEnquiry.toObject(),
      createdAt: updatedEnquiry.created_at,
      updatedAt: updatedEnquiry.updated_at,
      _id: updatedEnquiry._id?.toString()
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry status updated successfully',
      enquiry: mappedEnquiry
    })

  } catch (error) {
    console.error('Error in PUT API:', error)
    return NextResponse.json(
      { error: 'Failed to update enquiry' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('DELETE API called with params:', params)
    console.log('Request URL:', request.url)
    
    // Extract ID from params (it's a Promise in Next.js 13+)
    const { id } = await params
    
    console.log('Extracted ID:', id)
    
    if (!id) {
      console.log('No ID found in params')
      return NextResponse.json(
        { error: 'Enquiry ID is required' },
        { status: 400 }
      )
    }

    console.log('Connecting to database...')
    // Connect to database
    await connectDB()

    console.log('Deleting enquiry with ID:', id)
    // Delete enquiry
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id)
    console.log('Delete result:', deletedEnquiry)

    if (!deletedEnquiry) {
      console.log('Enquiry not found')
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      )
    }

    console.log('Enquiry deleted successfully')
    return NextResponse.json(
      { 
        success: true, 
        message: 'Enquiry deleted successfully'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error in DELETE API:', error)
    return NextResponse.json(
      { error: 'Failed to delete enquiry' },
      { status: 500 }
    )
  }
}
