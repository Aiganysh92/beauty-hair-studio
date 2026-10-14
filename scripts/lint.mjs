import fs from 'node:fs';

for (const file of ['index.html', 'style.css', 'script.js']) {
  if (!fs.existsSync(file)) {
    console.error(`Missing file: ${file}`);
    process.exitCode = 1;
  }
}

if (!process.exitCode) {
  console.log('Lint check passed!');
}
