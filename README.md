# KIIP 3 — Animated Whiteboard Video

A project for rebuilding a **Nepali + Korean KIIP Level 3, Chapter 1 (대인관계)** lesson as a clean whiteboard classroom video.

## Current repository contents
- `CODEX_MASTER_PROMPT.md` — implementation brief for Codex Cloud.
- `DESIGN_RULES.md` — visual requirements agreed by the user.
- `data/full_transcript.json` — 914 timed Nepali/Korean/English words; confidence fields are unverified.
- `data/manifest.json` — 392.557-second total timeline and 14 planned parts.
- `data/part_*.json` — available uploaded caption/scene chunks.
- `src/` and scripts — minimal Remotion project scaffolding.

**Important:** This repository is currently **PUBLIC**. Source audio/video, scanned textbook PDF and textbook images are *intentionally not committed* here. Do not redistribute textbook scans in public without permission. The repository alone does not contain enough media to render the finished voiced lesson.

## Codex Cloud setup
1. Open this repository in Codex Cloud.
2. Read `CODEX_MASTER_PROMPT.md` and `DESIGN_RULES.md`.
3. Run `npm install`, then `npm run validate` and `npm run dev`.
4. Supply the original lesson MP3 (path `public/media/original_audio.mp3`) and permitted textbook page assets under `public/textbook/` in a **private** runtime or repository.
5. Implement/verify the full 6:33 timeline, word-level active highlight, native textbook pan/zoom, slow annotation animations, font shaping, progress bar, and rendering.
6. Render 30-second and 4:00–4:24 grammar previews before the full lesson.

### User-approved design
Full-screen warm whiteboard, **one header**, one overall progress bar; slow readable book zoom; no Gemini Notebook watermark, WHITEBOARD badge, duplicated KIIP labels or duplicated clocks; original narration preserved.

### Source honesty
The audio data and transcript came from user-supplied files. Transcription includes uncertain words. The new Remotion project must not claim precise alignment or a finished MP4 without actual audio QA and rendering.
