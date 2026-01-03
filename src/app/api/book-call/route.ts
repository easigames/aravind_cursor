import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * API route to handle book call form submissions
 * Sends an email via SMTP with the booking information
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, contentType, monthlyBudget, preferredTime, hearAbout } = body;

    // Validate required fields
    if (!name || !email || !contentType || !monthlyBudget || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpFrom = process.env.SMTP_FROM || smtpUser;
    const smtpTo = process.env.SMTP_TO || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error('Missing SMTP configuration');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Format content type for display
    const contentTypeLabels: Record<string, string> = {
      'tiktok-reels': 'TikTok/Reels',
      'youtube-shorts': 'YouTube Shorts',
      'long-form-youtube': 'Long-form YouTube',
      'tv-film': 'TV/Film',
      'brand-commercial': 'Brand / Commercial',
      'other': 'Other',
    };

    // Format budget for display
    const budgetLabels: Record<string, string> = {
      'under-500': 'Under $500/month',
      '500-1000': '$500 - $1,000/month',
      '1000-2500': '$1,000 - $2,500/month',
      '2500-5000': '$2,500 - $5,000/month',
      '5000-plus': '$5,000+/month',
    };

    // Format time for display
    const timeLabels: Record<string, string> = {
      '9am': '9:00 AM',
      '10am': '10:00 AM',
      '11am': '11:00 AM',
      '12pm': '12:00 PM',
      '1pm': '1:00 PM',
      '2pm': '2:00 PM',
      '3pm': '3:00 PM',
      '4pm': '4:00 PM',
      '5pm': '5:00 PM',
    };

    // Email content
    const mailOptions = {
      from: `"${name}" <${smtpFrom}>`,
      to: smtpTo,
      replyTo: email,
      subject: `New Call Booking Request - ${contentTypeLabels[contentType] || contentType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Call Booking Request</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Booking Details</h3>
            <p><strong>Content Type:</strong> ${contentTypeLabels[contentType] || contentType}</p>
            <p><strong>Monthly Budget:</strong> ${budgetLabels[monthlyBudget] || monthlyBudget}</p>
            <p><strong>Preferred Time:</strong> ${timeLabels[preferredTime] || preferredTime}</p>
            ${hearAbout ? `<p><strong>How they heard about you:</strong> ${hearAbout}</p>` : ''}
          </div>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            This email was sent from the book call form on your website.
          </p>
        </div>
      `,
      text: `
New Call Booking Request

Contact Information:
- Name: ${name}
- Email: ${email}
${company ? `- Company: ${company}` : ''}

Booking Details:
- Content Type: ${contentTypeLabels[contentType] || contentType}
- Monthly Budget: ${budgetLabels[monthlyBudget] || monthlyBudget}
- Preferred Time: ${timeLabels[preferredTime] || preferredTime}
${hearAbout ? `- How they heard about you: ${hearAbout}` : ''}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}



