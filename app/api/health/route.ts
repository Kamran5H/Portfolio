import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  const isNeonConnected = !!pool;
  return NextResponse.json({
    status: 'healthy',
    database: isNeonConnected ? 'Neon Serverless PostgreSQL (Active)' : 'Resilient Mock Mode (Local)',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
