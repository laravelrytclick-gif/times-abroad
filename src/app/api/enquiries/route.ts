import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Enquiry from '@/models/Enquiry'
import { sendEmail, emailTemplates } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, city, interest } = body

    if (!name || !email || !phone || !city || !interest) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, city, interest are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Create new enquiry
    const enquiry = new Enquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: city.trim(),
      interest: interest,
      message: body.message?.trim() || '',
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    })

    // Save to database
    await enquiry.save()

    // Send email notification to admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL
      if (adminEmail) {
        const adminTemplate = emailTemplates.enquiryNotification({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          city: city.trim(),
          interest: interest,
          message: body.message?.trim() || ''
        })

        const emailResult = await sendEmail({
          to: adminEmail,
          subject: adminTemplate.subject,
          html: adminTemplate.html,
          text: adminTemplate.text
        })

        if (!emailResult.success) {
          console.error('Failed to send admin notification email:', emailResult.error)
        } else {
          console.log('Admin notification email sent successfully')
        }

        // Send confirmation email to student
        const studentTemplate = emailTemplates.enquiryConfirmation({
          name: name.trim(),
          interest: interest
        })

        const studentEmailResult = await sendEmail({
          to: email.trim().toLowerCase(),
          subject: studentTemplate.subject,
          html: studentTemplate.html,
          text: studentTemplate.text
        })

        if (!studentEmailResult.success) {
          console.error('Failed to send student confirmation email:', studentEmailResult.error)
        } else {
          console.log('Student confirmation email sent successfully')
        }
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully',
        enquiryId: enquiry._id
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error saving enquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const interest = searchParams.get('interest')
    const search = searchParams.get('search')

    // Build query
    const query: any = {}

    if (status && status !== 'all') {
      query.status = status
    }

    if (interest && interest !== 'all') {
      query.interest = interest
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ]
    }

    // Connect to database
    await connectDB()

    // Get enquiries with pagination
    const skip = (page - 1) * limit
    const enquiries = await Enquiry
      .find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count for pagination
    const total = await Enquiry.countDocuments(query)

    // Map database fields to frontend interface
    const mappedEnquiries = enquiries.map(enquiry => ({
      ...enquiry,
      createdAt: enquiry.created_at,
      updatedAt: enquiry.updated_at,
      _id: enquiry._id?.toString() || enquiry.id?.toString()
    }))

    return NextResponse.json({
      success: true,
      data: mappedEnquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    })

  } catch (error) {
    console.error('Error fetching enquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    )
  }
}