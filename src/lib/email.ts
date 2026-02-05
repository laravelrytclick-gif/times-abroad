import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  from?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const data = await resend.emails.send({
      from: options.from || 'onboarding@resend.dev',
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
    } as any) // Type assertion to bypass Resend type issues

    console.log('Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Predefined email templates
export const emailTemplates = {
  enquiryNotification: (data: {
    name: string
    email: string
    phone: string
    city: string
    interest: string
    message?: string
  }) => ({
    subject: `New Enquiry from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">New Student Enquiry</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Education Times Abroad</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #333; margin-bottom: 20px;">Student Details</h2>
          
          <div style="display: grid; gap: 15px;">
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
              <strong style="color: #667eea;">Name:</strong> ${data.name}
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
              <strong style="color: #667eea;">Email:</strong> ${data.email}
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
              <strong style="color: #667eea;">Phone:</strong> ${data.phone}
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
              <strong style="color: #667eea;">City:</strong> ${data.city}
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
              <strong style="color: #667eea;">Interest:</strong> 
              <span style="background: ${data.interest === 'study-abroad' ? '#007bff' : '#6f42c1'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                ${data.interest === 'study-abroad' ? 'Study Abroad' : 'MBBS Abroad'}
              </span>
            </div>
            
            ${data.message ? `
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
              <strong style="color: #667eea;">Message:</strong><br/>
              <div style="margin-top: 8px; line-height: 1.5;">${data.message}</div>
            </div>
            ` : ''}
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
          <p>This enquiry was submitted through the Education Times Abroad website.</p>
          <p>Please respond to the student as soon as possible.</p>
        </div>
      </div>
    `,
    text: `
      New Student Enquiry - Education Times Abroad
      
      Student Details:
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      City: ${data.city}
      Interest: ${data.interest === 'study-abroad' ? 'Study Abroad' : 'MBBS Abroad'}
      ${data.message ? `Message: ${data.message}` : ''}
      
      This enquiry was submitted through the Education Times Abroad website.
      Please respond to the student as soon as possible.
    `
  }),

  enquiryConfirmation: (data: { name: string; interest: string }) => ({
    subject: 'Thank You for Your Enquiry - Education Times Abroad',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Thank You!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your enquiry has been received</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${data.name},</h2>
          
          <p style="line-height: 1.6; color: #555; margin-bottom: 20px;">
            Thank you for your interest in <strong>${data.interest === 'study-abroad' ? 'Study Abroad' : 'MBBS Abroad'}</strong> 
            programs at Education Times Abroad. We have successfully received your enquiry and our team will get back to you shortly.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">What happens next?</h3>
            <ul style="line-height: 1.6; color: #555; padding-left: 20px;">
              <li>Our team will review your enquiry within 24 hours</li>
              <li>You'll receive a personalized response based on your requirements</li>
              <li>We'll help you find the best educational opportunities</li>
              <li>Free consultation and guidance throughout the process</li>
            </ul>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
          <p>Need immediate assistance? Contact us at support@education-times-abroad.com</p>
          <p style="margin-top: 10px;">Best regards,<br/>The Education Times Abroad Team</p>
        </div>
      </div>
    `,
    text: `
      Thank You for Your Enquiry - Education Times Abroad
      
      Hello ${data.name},
      
      Thank you for your interest in ${data.interest === 'study-abroad' ? 'Study Abroad' : 'MBBS Abroad'} programs at Education Times Abroad. 
      We have successfully received your enquiry and our team will get back to you shortly.
      
      What happens next?
      - Our team will review your enquiry within 24 hours
      - You'll receive a personalized response based on your requirements
      - We'll help you find the best educational opportunities
      - Free consultation and guidance throughout the process
      
      Need immediate assistance? Contact us at support@education-times-abroad.com
      
      Best regards,
      The Education Times Abroad Team
    `
  })
}
