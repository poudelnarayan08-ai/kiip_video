# Source media required before final video rendering

The code and complete transcript/scene metadata were uploaded to this repository through the GitHub connection.

**Large binary media assets were NOT uploaded by the connector.** This is not a fully rendered video. The original source archive is `KIIP3_Whiteboard_Codex_Starter.zip` from the ChatGPT conversation.

## Assets needed in the private build environment

| Source inside starter ZIP | Required runtime path | Purpose |
| --- | --- | --- |
| `media/original_audio.mp3` | `public/media/original_audio.mp3` | Original 6m32.557s voiceover |
| `assets/textbook_pages/page-000.jpg` … `page-010.jpg` | `public/textbook/page-000.jpg` … `page-010.jpg` | Readable textbook pages |
| `reference/KIIP3_Chapter1_textbook.pdf` | Private workspace only | Page/source verification |
| `reference/original_lesson_reference.mp4` | Private workspace only | Earlier video as an editing reference |
| `previews/KIIP3_PDF_whiteboard_grammar_24sec.mp4` | Private workspace only | Earlier video proof-of-concept |

## Workflow

1. Prefer making the repo **Private** before uploading personal audio/video and copyrighted textbook content.
2. Extract the starter ZIP. The data JSON files, scene plan, code instructions and captions have already been placed in this repository.
3. Copy the MP3 and 11 page images to their runtime paths above in the private Codex environment.
4. In `src/Lesson.tsx`, change `AUDIO_ASSET_PRESENT` and `TEXTBOOK_ASSETS_PRESENT` to `true` **only after** the corresponding files are present.
5. Run `npm install`, `npm run validate`, then `npm run dev`.
6. Ask Codex to build actual textbook focus/zoom and grammar slides from `CODEX_MASTER_PROMPT.md`. The existing component is only a working scaffold and must be expanded; do not publish an unchecked render.

## Quality and data notes

- Speech duration: 392,557 ms; scene plan: 13 broad sections; transcript: 914 word entries.
- Exactly 20 words are flagged as uncertain in `data/transcript_qa_report.json`.
- `data/part_04.json`, `part_08.json`, `part_11.json`, `part_12.json`, `part_13.json` and `part_14.json` were **reconstructed from the master transcript** because the matching individual upload files were not available to the GitHub connector. The full original word timestamps are preserved, but caption grouping and scene lists must be reviewed.
- The starter MP4 and textbook scans are *not* bundled in this GitHub repository. Do not claim final media is present.

Do not push any personal audio, video or scanned textbook pages to a public repository without confirming the sharing and copyright permissions.
