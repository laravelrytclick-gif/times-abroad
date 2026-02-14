import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";
import { handleApiError, validateRequiredFields, createSuccessResponse, ValidationError } from "@/lib/validation";

export async function GET() {
  try {
    console.log('🚀 [API] GET /api/admin/colleges - Request received');
    
    console.log(' [API] Connecting to database...');
    await connectDB();
    console.log('✅ [API] Database connected successfully');
    
    console.log('📋 [API] Fetching all colleges...');
    const colleges = await College.find({}).populate('country_ref').sort({ createdAt: -1 });
    console.log('✅ [API] Colleges fetched:', colleges.length, 'colleges found');

    return NextResponse.json({
      success: true,
      message: "Colleges fetched successfully",
      data: colleges,
    });
  } catch (error) {
    console.error("💥 [API] Error fetching colleges:", error);
    console.error("💥 [API] Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack available'
    });
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

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 [API] POST /api/admin/colleges - Request received');
    
    console.log('🔗 [API] Connecting to database...');
    await connectDB();
    console.log('✅ [API] Database connected successfully');
    
    console.log('📥 [API] Parsing request body...');
    const body = await request.json();
    console.log('📦 [API] Request body:', body);
    
    const { 
      name, 
      slug, 
      college_type,
      country_ref, 
      exams,
      // New comprehensive sections
      overview,
      key_highlights,
      why_choose_us,
      ranking,
      admission_process,
      documents_required,
      fees_structure,
      campus_highlights,
      // Legacy fields for backward compatibility
      fees, 
      duration, 
      establishment_year,
      ranking: legacyRanking,
      banner_url, 
      about_content, 
      is_active 
    } = body;

    console.log('🔍 [API] Extracted fields:', {
      name,
      slug,
      college_type,
      college_type_type: typeof college_type,
      college_type_valid: ['study_abroad', 'mbbs_abroad'].includes(college_type),
      country_ref,
      overview,
      key_highlights,
      why_choose_us,
      ranking,
      admission_process,
      documents_required,
      fees_structure,
      campus_highlights,
      is_active,
      // Debug specific fields
      overview_description: overview?.description,
      key_highlights_features: key_highlights?.features?.length,
      why_choose_us_features: why_choose_us?.features?.length,
      ranking_country_ranking: ranking?.country_ranking,
      admission_process_steps: admission_process?.steps?.length,
      documents_required_documents: documents_required?.documents?.length,
      fees_structure_courses: fees_structure?.courses?.length,
      campus_highlights_highlights: campus_highlights?.highlights?.length
    });

    // Validation using utility
    console.log('✅ [API] Starting validation...');
    console.log('🔍 [API] Validating college_type:', college_type);
    validateRequiredFields(body, ['name', 'slug', 'college_type', 'country_ref']);
    console.log('✅ [API] College type validation passed');
    
    // Validate that at least overview description is provided
    if (!overview?.description) {
      throw new ValidationError("Overview description is required");
    }
    console.log('✅ [API] Validation passed');

    // Find country by slug to get ObjectId
    console.log('🔍 [API] Finding country with slug:', country_ref);
    const country = await Country.findOne({ slug: country_ref });
    if (!country) {
      console.log('❌ [API] Country not found with slug:', country_ref);
      
      // Get available countries for helpful error message
      const availableCountries = await Country.find({}).select('slug name flag');
      const countryList = availableCountries.map(c => `- ${c.slug} (${c.flag} ${c.name})`).join('\n');
      
      throw new ValidationError(
        "Country not found",
        {
          invalidCountry: country_ref,
          availableCountries: availableCountries,
          message: `Country with slug '${country_ref}' not found. Available countries:\n${countryList}`
        }
      );
    }
    console.log('✅ [API] Country found:', country.name);

    // Check if college with same slug already exists
    console.log('🔍 [API] Checking for existing college with slug:', slug);
    const existingCollege = await College.findOne({ slug });
    if (existingCollege) {
      console.log('❌ [API] College with slug already exists:', existingCollege.name);
      throw new ValidationError(
        "College with this slug already exists",
        { existingSlug: slug, existingCollege: existingCollege.name }
      );
    }
    console.log('✅ [API] No existing college found with slug');

    console.log('🏗️ [API] Creating new college document...');
    console.log('🔍 [API] Setting college_type to:', college_type || 'study_abroad');
    console.log('🔍 [API] Overview section:', overview);
    console.log('🔍 [API] Key highlights section:', key_highlights);
    console.log('🔍 [API] Why choose us section:', why_choose_us);
    console.log('🔍 [API] Ranking section:', ranking);
    console.log('🔍 [API] Admission process section:', admission_process);
    console.log('🔍 [API] Documents required section:', documents_required);
    console.log('🔍 [API] Fees structure section:', fees_structure);
    console.log('🔍 [API] Campus highlights section:', campus_highlights);
    const college = new College({
      name,
      slug,
      college_type: college_type || 'study_abroad',
      country_ref: country._id, // Use the ObjectId from the found country
      exams: exams || [],
      
      // New comprehensive structure
      overview: overview || {
        title: "Overview",
        description: about_content || ""
      },
      key_highlights: key_highlights || {
        title: "Key Highlights",
        description: "",
        features: []
      },
      why_choose_us: why_choose_us || {
        title: "Why Choose Us",
        description: "",
        features: []
      },
      ranking: ranking || {
        title: "Ranking & Recognition",
        description: "",
        country_ranking: legacyRanking || "",
        world_ranking: "",
        accreditation: []
      },
      admission_process: admission_process || {
        title: "Admission Process",
        description: "",
        steps: []
      },
      documents_required: documents_required || {
        title: "Documents Required",
        description: "",
        documents: []
      },
      fees_structure: fees_structure || {
        title: "Fees Structure",
        description: "",
        courses: [{
          course_name: "Program",
          duration: duration || "N/A",
          annual_tuition_fee: fees ? `₹${fees.toLocaleString()}` : "N/A"
        }]
      },
      campus_highlights: campus_highlights || {
        title: "Campus Highlights",
        description: "",
        highlights: []
      },

      // Legacy fields for backward compatibility
      fees: fees ? Number(fees) : undefined,
      duration,
      establishment_year,
      banner_url: banner_url || "",
      about_content,
      
      is_active: is_active !== undefined ? is_active : true,
    });

    console.log('💾 [API] Saving college to database...');
    console.log('🔍 [API] College object before save:', JSON.stringify(college, null, 2));
    console.log('🔍 [API] College college_type before save:', college.college_type);
    console.log('🔍 [API] College college_type type:', typeof college.college_type);
    const savedCollege = await college.save();
    console.log('✅ [API] College saved successfully:', savedCollege);
    console.log('🔍 [API] Saved college college_type:', savedCollege.college_type);
    console.log('🔍 [API] Saved college college_type type:', typeof savedCollege.college_type);
    console.log('🔍 [API] Saved college overview:', savedCollege.overview);
    console.log('🔍 [API] Saved college key_highlights:', savedCollege.key_highlights);
    console.log('🔍 [API] Saved college why_choose_us:', savedCollege.why_choose_us);
    console.log('🔍 [API] Saved college ranking:', savedCollege.ranking);
    console.log('🔍 [API] Saved college admission_process:', savedCollege.admission_process);
    console.log('🔍 [API] Saved college documents_required:', savedCollege.documents_required);
    console.log('🔍 [API] Saved college fees_structure:', savedCollege.fees_structure);
    console.log('🔍 [API] Saved college campus_highlights:', savedCollege.campus_highlights);

    return createSuccessResponse(savedCollege, "College created successfully");
    
  } catch (error) {
    return handleApiError(error);
  }
}