/**
 * Neon Serverless PostgreSQL Database Client
 * Built with @neondatabase/serverless and resilient fallback mode
 */

import { Pool, QueryResult, QueryResultRow } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

// Initialize connection pool only if valid connection string is provided
export const pool = connectionString
  ? new Pool({ connectionString })
  : null;

// In-memory fallback store for local development before DATABASE_URL is set
const mockStore = {
  inquiries: [] as Array<Record<string, unknown>>,
  collaborations: [] as Array<Record<string, unknown>>,
  analytics: [] as Array<Record<string, unknown>>,
};

export async function query<R extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<R>> {
  if (pool) {
    try {
      return await pool.query<R>(text, params);
    } catch (error) {
      console.error('[Neon DB Error]:', error);
      throw error;
    }
  }

  // Graceful Fallback Mode for local builds and offline development
  console.log('[Neon Mock Mode] Query executed:', text.substring(0, 60), params || []);
  
  return {
    rows: [] as R[],
    rowCount: 0,
    command: 'MOCK',
    oid: 0,
    fields: [],
  };
}

export async function insertInquiry(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  ipHash?: string;
}) {
  if (pool) {
    const text = `
      INSERT INTO inquiries (name, email, subject, message, ip_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at;
    `;
    const res = await query<{ id: string; created_at: string }>(text, [
      data.name,
      data.email,
      data.subject,
      data.message,
      data.ipHash || 'anon',
    ]);
    return res.rows[0];
  }

  // Save to mock store
  const mockRecord = {
    id: `mock-${Date.now()}`,
    ...data,
    created_at: new Date().toISOString(),
  };
  mockStore.inquiries.push(mockRecord);
  return mockRecord;
}

export async function insertCollaboration(data: {
  scholarName: string;
  institution: string;
  email: string;
  projectTopic: string;
  proposalSummary: string;
}) {
  if (pool) {
    const text = `
      INSERT INTO collaborations (scholar_name, institution, email, project_topic, proposal_summary)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at;
    `;
    const res = await query<{ id: string; created_at: string }>(text, [
      data.scholarName,
      data.institution,
      data.email,
      data.projectTopic,
      data.proposalSummary,
    ]);
    return res.rows[0];
  }

  const mockRecord = {
    id: `mock-collab-${Date.now()}`,
    ...data,
    created_at: new Date().toISOString(),
  };
  mockStore.collaborations.push(mockRecord);
  return mockRecord;
}

export async function logAnalyticsEvent(eventType: string, assetId?: string, referrer?: string, userAgent?: string) {
  if (pool) {
    const text = `
      INSERT INTO site_analytics (event_type, asset_id, referrer, user_agent)
      VALUES ($1, $2, $3, $4);
    `;
    await query(text, [eventType, assetId || null, referrer || null, userAgent || null]);
    return true;
  }

  mockStore.analytics.push({
    eventType,
    assetId,
    timestamp: new Date().toISOString(),
  });
  return true;
}
