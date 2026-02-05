import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Enquiry from '@/models/Enquiry'

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
