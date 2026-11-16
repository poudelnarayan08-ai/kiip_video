# Production Design — KIIP 3 대인 관계

## Approved direction
- Full-screen minimal classroom whiteboard (warm white #FAFBF8).
- Exactly ONE simple header: "KIIP 3 · 대인관계". Do not repeat title as mini badge on textbook card.
- Do NOT add Gemini Notebook or WHITEBOARD labels, any extra time counters, or language info badges.
- Central area mostly textbook/educational content; show **large, readable** page crops from 1200×1562 JPG assets.
- Prefer recreating individual sentences as sharp text and using the PDF screenshot as authentic textbook reference.
- Nepali+Korean word-level captions in one clean bottom row, 2–4 words per group, current word yellow (#FFE08A), other words dark charcoal; no moving underline/fast lines.
- Exactly ONE lesson-long progress bar at bottom; fill = absolute audio timestamp / 392557 ms. No duplicate timers.
- No continuous motion; animate when narration introduces a new concept then hold for reading. Camera zoom/pan 1.5–2.5 sec; text fades 0.4–0.6 sec, diagram arrows 0.7 sec.
- Illustrated characters, arrows and animated grammar cards can appear in center only when they help the *current spoken lesson*.
- Use Korean Hangul and Nepali Devanagari fonts with correct shaping; never draw glyphs as placeholder squares.

## Strict content and technical QC
- Original Nepali/Korean audio must remain completely intact at native timing; do not replace TTS or accelerate.
- Read full_transcript.json and use its ABSOLUTE millisecond timestamps; offset media time for clipped previews.
- 914 transcribed words: 20 flagged needs_review, 914 confidence fields are null. Verify uncertain/cut words against audio manually; do not call them 100% accurate.
- PDF chapter contains both grammar forms: textbook page 15 -고 해서, page 16 -(으)면 되다. Narration explicitly says the latter is **next lesson**, so this video must NOT teach it.
- PDF images are 1200×1562 (adequate source), but avoid >1.5–2× digital zoom which cannot invent pixels.
- Spell the title consistently as 대인관계/대인 관계 according to pedagogical style and user branding.
- Check first 30s, grammar transitions, 2-minute section boundaries, audio/video final duration, no logos from old source video, and final progress=100%.