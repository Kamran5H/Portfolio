import { NextResponse } from 'next/server';
import { insertInquiry } from '@/lib/db';

const ipTimestamps = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'local';

    // Simple 10-second spam throttling
    const now = Date.now();
    const lastTime = ipTimestamps.get(ip);
    if (lastTime && now - lastTime < 10000) {
      return NextResponse.json(
        { success: false, error: 'Please wait a few seconds before sending another message.' },
        { status: 429 }
      );
    }
    ipTimestamps.set(ip, now);

    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields (name, email, subject, message) are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Insert into Neon Database (or mock store if credentials pending)
    const record = await insertInquiry({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      ipHash: ip,
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been successfully recorded in the database.',
      id: record.id,
      timestamp: record.created_at,
    });
  } catch (error) {
    console.error('[API Contact Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry. Please try again.' },
      { status: 500 }
    );
  }
}
