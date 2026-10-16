/**
 * Database Migration & Table Provisioning Script for Neon PostgreSQL
 * Run: npm run db:init
 */

const fs = require('fs');
const path = require('path');

// Try loading .env.local or .env if present
try {
  const envPath = fs.existsSync('.env.local') ? '.env.local' : (fs.existsSync('.env') ? '.env' : null);
  if (envPath) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || '';
        val = val.trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) process.env[key] = val;
      }
    });
  }
} catch (e) {
  // Ignore dotenv reading errors
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.log('\n--------------------------------------------------------------');
  console.log('ℹ️  NEON DATABASE NOTICE:');
  console.log('DATABASE_URL is not currently defined in .env.local or environment.');
  console.log('To connect your live Neon database:');
  console.log('1. Go to https://console.neon.tech');
  console.log('2. Create or select your PostgreSQL project.');
  console.log('3. Copy your Connection string (postgresql://...neon.tech/neondb?sslmode=require)');
  console.log('4. Create a .env.local file with: DATABASE_URL="your-connection-string"');
  console.log('5. Re-run: npm run db:init');
  console.log('--------------------------------------------------------------\n');
  console.log('The application will run in Resilient Mock Mode in the meantime.\n');
  process.exit(0);
}

async function runMigration() {
  console.log('🔌 Connecting to Neon PostgreSQL...');
  let Pool;
  try {
    const neon = require('@neondatabase/serverless');
    Pool = neon.Pool;
  } catch (err) {
    console.error('Could not load @neondatabase/serverless. Run npm install first.');
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  try {
    console.log('🚀 Executing database schema migrations...');
    await pool.query(sql);
    console.log('✅ Tables provisioned successfully in Neon PostgreSQL:');
    console.log('   - inquiries (Direct scholar messages)');
    console.log('   - collaborations (Research partnership proposals)');
    console.log('   - site_analytics (Anonymous verification metrics)');
    console.log('\nYour Neon database is live and fully synchronized!\n');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await pool.end();
  }
}

runMigration();
