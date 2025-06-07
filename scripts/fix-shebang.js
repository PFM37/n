const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../dist/index.js');
const code = fs.readFileSync(filePath, 'utf8');

if (!code.startsWith('#!')) {
  const fixed = '#!/usr/bin/env node\n' + code;
  fs.writeFileSync(filePath, fixed, 'utf8');
  console.log('✅ Shebang added to dist/index.js');
}