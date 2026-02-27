import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactSubmissions, emailLog } from "@/db/schema";
import { getResend } from "@/lib/resend";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const [submission] = await db
      .insert(contactSubmissions)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        companyName: data.companyName || null,
        companySize: data.companySize || null,
        itFrustration: data.itFrustration || null,
        message: data.message || null,
      })
      .returning();

    const subject = `New Contact Form: ${data.name}${
      data.companyName ? ` — ${data.companyName}` : ""
    }`;

    try {
      const { data: emailData, error } = await getResend().emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.CONTACT_NOTIFICATION_EMAIL!,
        subject,
        html: buildEmailHtml(data, submission.createdAt),
      });

      if (error) {
        await db.insert(emailLog).values({
          recipient: process.env.CONTACT_NOTIFICATION_EMAIL!,
          subject,
          status: "failed",
          errorCode: error.name,
          errorMessage: error.message,
          submissionId: submission.id,
        });
      } else {
        await db.insert(emailLog).values({
          recipient: process.env.CONTACT_NOTIFICATION_EMAIL!,
          subject,
          status: "sent",
          resendId: emailData?.id,
          submissionId: submission.id,
        });
      }
    } catch (err) {
      await db.insert(emailLog).values({
        recipient: process.env.CONTACT_NOTIFICATION_EMAIL!,
        subject,
        status: "failed",
        errorCode: "EXCEPTION",
        errorMessage: String(err),
        submissionId: submission.id,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function buildEmailHtml(
  data: {
    name: string;
    email: string;
    phone?: string;
    companyName?: string;
    companySize?: string;
    itFrustration?: string;
    message?: string;
  },
  timestamp: Date | null
) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <div style="border-bottom: 3px solid #B91C1C; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #0A1628; font-size: 24px; margin: 0;">New Contact Form Submission</h1>
        <p style="color: #6B7280; font-size: 14px; margin: 8px 0 0 0;">
          ${timestamp ? new Date(timestamp).toLocaleString() : "Just now"}
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #6B7280; font-size: 14px; width: 140px; vertical-align: top;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #1E293B; font-size: 14px; font-weight: 600;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #6B7280; font-size: 14px; vertical-align: top;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #1E293B; font-size: 14px;">
            <a href="mailto:${data.email}" style="color: #B91C1C;">${data.email}</a>
          </td>
        </tr>
        ${
          data.phone
            ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #6B7280; font-size: 14px; vertical-align: top;">Phone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #1E293B; font-size: 14px;">${data.phone}</td>
        </tr>`
            : ""
        }
        ${
          data.companyName
            ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #6B7280; font-size: 14px; vertical-align: top;">Company</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #1E293B; font-size: 14px;">${data.companyName}</td>
        </tr>`
            : ""
        }
        ${
          data.companySize
            ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #6B7280; font-size: 14px; vertical-align: top;">Company Size</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #1E293B; font-size: 14px;">${data.companySize} employees</td>
        </tr>`
            : ""
        }
        ${
          data.itFrustration
            ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #6B7280; font-size: 14px; vertical-align: top;">IT Frustration</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #1E293B; font-size: 14px;">${data.itFrustration}</td>
        </tr>`
            : ""
        }
        ${
          data.message
            ? `<tr>
          <td style="padding: 12px 0; color: #6B7280; font-size: 14px; vertical-align: top;">Message</td>
          <td style="padding: 12px 0; color: #1E293B; font-size: 14px; white-space: pre-wrap;">${data.message}</td>
        </tr>`
            : ""
        }
      </table>

      <div style="margin-top: 24px; padding: 16px; background: #F1F5F9; border-radius: 8px;">
        <p style="color: #6B7280; font-size: 12px; margin: 0;">
          This submission is also saved in your CJT admin dashboard.
        </p>
      </div>
    </div>
  `;
}
