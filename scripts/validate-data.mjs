import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const manifest = read('data/manifest.json');
const full = read('data/full_transcript.json');
const errors = [];
const warnings = [];
const all = new Set();

if (manifest.total_words !== full.transcript.length) errors.push('Master word count differs from manifest');
if (manifest.source_audio_duration_ms !== full.duration_ms) errors.push('Audio duration differs from master JSON');

let previous = -1;
for (const w of full.transcript) {
  if (all.has(w.id)) errors.push('Duplicate word id: ' + w.id);
  all.add(w.id);
  if (!(Number.isFinite(w.start_ms) && Number.isFinite(w.end_ms)) || w.end_ms <= w.start_ms) {
    errors.push('Invalid timestamp on ' + w.id);
  }
  if (w.start_ms < previous) warnings.push('Non-monotonic start time ' + w.id);
  previous = w.start_ms;
}
for (const m of manifest.parts) {
  const filename = m.file;
  const p = read('data/' + filename);
  if (p.part !== m.part || p.start_ms !== m.start_ms || p.end_ms !== m.end_ms) errors.push('Part boundary mismatch: ' + filename);
  if (p.transcript.length !== m.word_count) errors.push('Part word count mismatch: ' + filename);
  const partIds = new Set(p.transcript.map(w => w.id));
  for (const w of p.transcript) {
    if (!all.has(w.id)) errors.push('Unknown word id in ' + filename + ': ' + w.id);
    if (w.start_ms < m.start_ms || w.start_ms >= m.end_ms) errors.push('Word outside part: ' + w.id);
  }
  for (const g of p.caption_groups) {
    if (!(g.start_ms < g.end_ms)) errors.push('Invalid caption duration ' + filename);
    for (const id of g.word_ids) if (!partIds.has(id)) errors.push('Caption references missing word ' + id + ' in ' + filename);
  }
  if (p.caption_groups.length !== m.caption_group_count) warnings.push('Caption group count differs: ' + filename);
}
const flagged = full.transcript.filter(w => w.needs_review);
console.log(JSON.stringify({
  valid: !errors.length,
  parts: manifest.parts.length,
  words: full.transcript.length,
  captionGroups: manifest.parts.reduce((sum, p) => sum + p.caption_group_count, 0),
  flaggedWords: flagged.length,
  errors: errors.slice(0,30),
  warnings: warnings.slice(0,30)
}, null, 2));
if (errors.length) process.exit(1);
