// app/api/send/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  console.log('=== API /api/send called ===');
  
  try {
    const body = await req.json();
    console.log('Received request body:', body);
    
    const { name, email, number, city } = body;
    console.log('Extracted fields:', { name, email, number, city });

    // Validate required fields
    if (!name || !email || !number || !city) {
      console.log('Validation failed - missing fields:', { 
        hasName: !!name, 
        hasEmail: !!email, 
        hasNumber: !!number, 
        hasCity: !!city 
      });
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    console.log('Validation passed - all fields present');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email validation failed for:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    console.log('Email validation passed');
    console.log('Attempting to send email via Resend...');

    const data = await resend.emails.send({
      from: 'Alpha World Education <onboarding@resend.dev>', // Works with localhost for testing
      to: ['sagarbishtz589@gmail.com'], // Your email address
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Contact Information:</h3>
            
            <p style="margin: 10px 0;">
              <strong>Name:</strong> ${name}
            </p>
            
            <p style="margin: 10px 0;">
              <strong>Email:</strong> <a href="mailto:${email}" style="color: #10b981;">${email}</a>
            </p>
            
            <p style="margin: 10px 0;">
              <strong>Phone Number:</strong> ${number}
            </p>
            
            <p style="margin: 10px 0;">
              <strong>City:</strong> ${city}
            </p>
          </div>
          
          <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #065f46;">
              <strong>Submission Time:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px;">
            This email was sent from the Alpha World Education contact form.
          </p>
        </div>
      `,
    });
    
    console.log('Email sent successfully:', data);
    console.log('=== API /api/send completed successfully ===');
    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('=== API /api/send ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('=== END ERROR ===');
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}