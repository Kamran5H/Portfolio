import fs from 'fs';
import path from 'path';

const contentDir = path.resolve('content');

function validate() {
  const files = ['site.json', 'projects.json', 'lab.json', 'vault.json'];
  let errors = 0;

  for (const f of files) {
    const p = path.join(contentDir, f);
    if (!fs.existsSync(p)) {
      console.error(`[FAIL] Missing ${f}`);
      errors++;
      continue;
    }
    try {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      console.log(`[PASS] ${f} is valid JSON (${Array.isArray(data) ? data.length + ' items' : 'object'})`);
    } catch (e) {
      console.error(`[FAIL] Invalid JSON in ${f}:`, e.message);
      errors++;
    }
  }

  if (errors > 0) {
    process.exit(1);
  } else {
    console.log('✓ All content files are healthy and valid.');
  }
}

validate();
