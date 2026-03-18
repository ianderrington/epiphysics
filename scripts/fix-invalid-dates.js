const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const files = [
  'musings/growing_corner/the-fundaments/published/aiery-intro-published.md',
  'musings/growing_corner/the-fundaments/published/liquo-intro-published.md',
  'musings/growing_corner/the-fundaments/published/matterics-journey-published.md',
  'musings/growing_corner/the-fundaments/published/meet-the-fundaments-published.md',
  'musings/growing_corner/the-fundaments/published/solidic-intro-published.md',
  'musings/growing_corner/the-fundaments/stories/fieldix/blueo-intro.md',
  'musings/growing_corner/the-fundaments/stories/fieldix/greeno-intro.md',
  'musings/growing_corner/the-fundaments/stories/fieldix/indigo-intro.md',
  'musings/growing_corner/the-fundaments/stories/fieldix/orangio-intro.md',
  'musings/growing_corner/the-fundaments/stories/fieldix/rainbow-wavelics.md',
  'musings/growing_corner/the-fundaments/stories/fieldix/reddo-intro.md',
  'musings/growing_corner/the-fundaments/stories/fieldix/violeto-intro.md',
  'musings/growing_corner/the-fundaments/stories/fieldix/yello-intro.md',
  'musings/growing_corner/the-fundaments/stories/forcix/electromago-intro.md',
  'musings/growing_corner/the-fundaments/stories/forcix/gravito-intro.md',
  'musings/growing_corner/the-fundaments/stories/forcix/strongy-intro.md',
  'musings/growing_corner/the-fundaments/stories/forcix/weaklo-intro.md',
  'musings/growing_corner/the-fundaments/stories/matterix/plasmo-power.md',
  'musings/growing_corner/the-fundaments/stories/spacetimix/spaceo-intro.md',
  'musings/growing_corner/the-fundaments/stories/spacetimix/tempo-intro.md',
];

const docsPath = path.join(process.cwd(), 'docs');

files.forEach(file => {
  const filePath = path.join(docsPath, file);

  if (!fs.existsSync(filePath)) {
    console.log('File not found:', file);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: markdown } = matter(content);

  // Add date field if it doesn't exist
  if (!frontmatter.date) {
    // Use file modification time
    const stats = fs.statSync(filePath);
    const mtime = stats.mtime;
    frontmatter.date = mtime.toISOString();

    // Reconstruct the file with updated frontmatter
    const newContent = matter.stringify(markdown, frontmatter);
    fs.writeFileSync(filePath, newContent);
    console.log('Updated:', file);
  }
});

console.log('\nDone! All files now have dates.');
