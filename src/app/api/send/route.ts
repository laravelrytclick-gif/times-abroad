import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, number, city, interest } = body;

    // 1. Enhanced Validation
    if (!name || !email || !number || !city || !interest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Format the "Interest" for the email display
    const interestLabel = interest === 'mbbs-abroad' ? 'MBBS Abroad' : 'Study Abroad';

    // 3. Send Email via Resend
    const data = await resend.emails.send({
      from: 'Education Times Abroad <onboarding@resend.dev>', // Update this once you verify your domain
      to: ['sagarbishtz589@gmail.com'],
      subject: `🎓 New ${interestLabel} Enquiry: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
              <div style="background: linear-gradient(to right, #2563eb, #4338ca); padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Admission Enquiry</h1>
                <p style="color: #bfdbfe; margin: 5px 0 0 0;">Education Times Abroad Portal</p>
              </div>

              <div style="padding: 30px; background-color: #ffffff;">
                <div style="margin-bottom: 25px;">
                  <span style="font-size: 12px; font-weight: bold; color: #2563eb; text-transform: uppercase; letter-spacing: 1px;">Program of Interest</span>
                  <div style="font-size: 20px; font-weight: bold; color: #1e293b; margin-top: 5px;">${interestLabel}</div>
                </div>

                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Full Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; text-align: right;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Email Address</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; text-align: right;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Phone Number</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; text-align: right;">${number}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">City / Location</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; text-align: right;">${city}</td>
                  </tr>
                </table>

                <div style="margin-top: 30px; padding: 15px; background-color: #f8fafc; border-radius: 8px; text-align: center;">
                  <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                    Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)
                  </p>
                </div>
              </div>

              <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
                This is an automated message from your website contact form.
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('RESEND_ERROR:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}