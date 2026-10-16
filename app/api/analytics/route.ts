import { NextResponse } from 'next/server';
import { logAnalyticsEvent } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventType, assetId } = body;

    const referrer = req.headers.get('referer') || '';
    const userAgent = req.headers.get('user-agent') || '';

    if (eventType) {
      await logAnalyticsEvent(eventType, assetId, referrer, userAgent);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
