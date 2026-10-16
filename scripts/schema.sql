-- ==============================================================
-- MUHAMMAD KAMRAN ASHRAF — ACADEMIC PORTFOLIO DATABASE SCHEMA
-- Target Database: Neon Serverless PostgreSQL
-- ==============================================================

-- 1. Inquiries & Direct Academic Messages
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    ip_hash VARCHAR(64),
    status VARCHAR(50) DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);

-- 2. Research Collaboration Inquiries (Specific Project Proposals)
CREATE TABLE IF NOT EXISTS collaborations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scholar_name VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    project_topic VARCHAR(100) NOT NULL, -- 'zinc-air', 'chitosan-grafting', 'ce-nico-mof', 'biosensors', 'other'
    proposal_summary TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_collaborations_topic ON collaborations(project_topic);
CREATE INDEX IF NOT EXISTS idx_collaborations_created_at ON collaborations(created_at DESC);

-- 3. Anonymous Site Telemetry & Document Verifications
CREATE TABLE IF NOT EXISTS site_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL, -- 'page_view', 'cv_download', 'doc_inspection', 'recipe_copied'
    asset_id VARCHAR(255),            -- e.g. 'bs_degree_pu.jpg', 'ce_nico_mof', 'solution_calc'
    referrer TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON site_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON site_analytics(created_at DESC);
