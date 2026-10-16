import { NextResponse } from 'next/server';
import { insertCollaboration } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const scholarName = body.scholarName || body.lead_investigator || '';
    const institution = body.institution || '';
    const email = body.email || '';
    const projectTopic = body.projectTopic || body.title || body.domain || '';
    const proposalSummary = body.proposalSummary || body.abstract || '';

    if (!scholarName || !institution || !email || !projectTopic || !proposalSummary) {
      return NextResponse.json(
        { success: false, error: 'All collaboration proposal fields are required.' },
        { status: 400 }
      );
    }

    const record = await insertCollaboration({
      scholarName: scholarName.trim(),
      institution: institution.trim(),
      email: email.trim(),
      projectTopic: projectTopic.trim(),
      proposalSummary: proposalSummary.trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Research collaboration proposal recorded successfully.',
      id: record.id,
    });
  } catch (error) {
    console.error('[API Collaboration Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Could not submit collaboration proposal.' },
      { status: 500 }
    );
  }
}
