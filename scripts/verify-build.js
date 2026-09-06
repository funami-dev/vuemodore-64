/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

/**
 * Fails the build unless every entry point the deployment needs is on disk.
 *
 * Storybook can lose its preview build and still exit 0: it writes a complete
 * manager, no iframe.html, and reports success. A deployment then goes green
 * while the site is a spinner. Nothing catches that but a file check, so this
 * runs as the last step of the build command.
 */
const REQUIRED = [
  ['dist/index.html', 'Storybook manager'],
  ['dist/iframe.html', 'Storybook preview -- exits 0 even when it fails'],
  ['dist/project.json', 'Storybook story index'],
  ['dist/example/index.html', 'Example magazine'],
];

const root = path.resolve(__dirname, '..');
const missing = REQUIRED.filter(([file]) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error('\nBuild incomplete. Missing:');
  missing.forEach(([file, what]) => console.error(`  ${file}  (${what})`));
  console.error('');
  process.exit(1);
}

// A preview bundle that exists but is a stub would pass the check above.
const bundles = fs.readdirSync(path.join(root, 'dist'))
  .filter(name => name.includes('.iframe.bundle.js'));
if (!bundles.length) {
  console.error('\nBuild incomplete: dist/ has iframe.html but no preview bundle.\n');
  process.exit(1);
}

console.log(`Build complete: ${REQUIRED.length} entry points, ${bundles.length} preview bundles.`);
