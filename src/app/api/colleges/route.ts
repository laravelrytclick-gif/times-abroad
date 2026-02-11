import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') || '12') : null;
    const search = searchParams.get('search');
    const countrySlug = searchParams.get('country');
    const exam = searchParams.get('exam');
    const collegeType = searchParams.get('college_type');
    
    const skip = limit ? (page - 1) * limit : 0;
    
    // Build query
    const query: Record<string, unknown> = { is_active: true };
    
    // Search by name or about content
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { about_content: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by country
    if (countrySlug && countrySlug !== 'all') {
      const country = await Country.findOne({ slug: countrySlug, is_active: true });
      if (country) {
        query.country_ref = country._id;
      } else {
        return NextResponse.json({
          success: true,
          message: "Colleges fetched successfully",
          data: { colleges: [], total: 0 },
        });
      }
    }
    
    // Filter by exam
    if (exam && exam !== 'all') {
      query.exams = { $in: [exam] };
    }
    
    // Filter by college type
    if (collegeType && collegeType !== 'all') {
      query.college_type = collegeType;
    }
    
    // Get total count for pagination
    const total = await College.countDocuments(query);
    
    // Fetch paginated results
    const collegesQuery = College.find(query)
      .populate('country_ref', 'name slug flag')
      .sort({ ranking: 1, name: 1 })
      .skip(skip);
    
    // Only apply limit if it exists
    if (limit) {
      collegesQuery.limit(limit);
    }
    
    const colleges = await collegesQuery.lean(); // Use lean() for better performance
    
    const response = NextResponse.json({
      success: true,
      message: "Colleges fetched successfully",
      data: {
        colleges,
        total,
        page,
        limit: limit || total,
        totalPages: limit ? Math.ceil(total / limit) : 1,
        hasNext: limit ? skip + limit < total : false
      },
    });
    
    // Add caching headers
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=180, stale-while-revalidate=300'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=300');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=300');
    
    return response;
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch colleges",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
