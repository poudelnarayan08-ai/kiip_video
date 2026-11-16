# CODEX MASTER TASK — KIIP 3 Whiteboard Video

Create a NEW production-ready, reusable Remotion + React + TypeScript system from these inputs. This zip contains user-owned uploads and an existing lesson audio/textbook; do not hallucinate additional source material.

1. Read DESIGN_RULES.md and data/lesson_scene_plan.json in full.
2. Use media/original_audio.mp3 for the original uninterrupted narration, data/full_transcript.json for word-level ms start/end, and assets/textbook_pages/page-000.jpg..page-010.jpg for native pages.
3. Import the provided PDF in reference/ only for source verification; the JPG pages are already extracted at native 1200×1562 resolution.
4. Set 1920×1080 30fps, 392557ms (~6m32.557s) and derive total frames from actual audio duration, not a hard-coded integer; adjust duration for final audio tail if necessary.
5. Build three reusable scene types: TextbookFocus (page crops + slow zoom), IllustrationLesson (meaningful characters/icons), GrammarBreakdown (Korean sentence recreated as selectable sharp text + segmented arrows). Build separately a static lower CaptionBar with active-word highlight and a single full-lesson progress indicator.
6. DO NOT reuse the old dark dashboard UI. Keep only one small header. No Gemini Notebook, no WHITEBOARD, no duplicated KIIP label/timers/language labels.
7. Respect user-approved low-motion pacing: fade duration 0.4–0.6s, book zoom/pan 1.5–2.5s, diagram arrows ~0.7s, no fast moving subtitle line. Keep lesson material readable with large text.
8. Validate the 20 needs_review transcribed words and broken/hyphenated word segments; never silently rewrite a spoken phrase from general knowledge.
9. Audio/scene timeline in absolute milliseconds. If doing render-in-parts, offset video scene time but not original word timestamps, then concatenate losslessly as possible and ensure no repeated/missing audio.
10. Provide a first 30s preview and a 240–270s grammar-section preview before full render. Render entire synchronized MP4 only after successful preview validation.
11. Provide npm scripts for preview, render all, QA and transcript validation, plus a final output folder and README. Do NOT claim any rendering succeeded without actually testing outputs.
12. Use an official Remotion setup and current dependencies (verify versions in environment). Need proper Hangul/Devanagari font shaping. Do not package or redistribute font files; rely on licit installed or downloaded fonts.
13. Favor source-accurate textbook examples; PDF page 15 corresponds to page-003.jpg, and page 16 - (으)면 되다 is NOT taught in this narration (mentioned only as next lesson).
14. All output must be 16:9, not cropped vertical.

Deliver self-contained code, repeatable CLI render instructions, and previews. Prefer quality over excessive transitions. Keep user source media private.