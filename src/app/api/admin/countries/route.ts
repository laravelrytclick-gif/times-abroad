import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    // Build query
    let query: any = {};
    
    if (status && status !== 'all') {
      query.is_active = status === 'active';
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count for pagination
    const total = await Country.countDocuments(query);
    
    // Get paginated countries
    const countries = await Country.find(query)
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    
    return NextResponse.json({
      success: true,
      message: "Countries fetched successfully",
      data: {
        countries,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: countries.length === limit
      },
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch countries",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const { name, slug, flag, description, meta_title, meta_description, is_active } = body;

    if (!name || !slug || !flag || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name, slug, flag, description",
        },
        { status: 400 }
      );
    }

    const existingCountry = await Country.findOne({ slug });
    if (existingCountry) {
      return NextResponse.json(
        {
          success: false,
          message: "Country with this slug already exists",
        },
        { status: 409 }
      );
    }

    const country = new Country({
      name,
      slug,
      flag,
      description,
      meta_title,
      meta_description,
      is_active: is_active !== undefined ? is_active : true,
    });

    await country.save();

    return NextResponse.json({
      success: true,
      message: "Country created successfully",
      data: country,
    });
  } catch (error) {
    console.error("Error creating country:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create country",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
