import React, {useMemo} from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import data from '../data/full_transcript.json';
import scenePlan from '../data/lesson_scene_plan.json';
import manifest from '../data/manifest.json';

type Word = {
  id: string;
  text: string;
  start_ms: number;
  end_ms: number;
  language: string;
  needs_review?: boolean;
};
type Scene = (typeof scenePlan.scenes)[number];
type CaptionGroup = {start: number; end: number; words: Word[]};

const WORDS: Word[] = data.transcript;
const SCENES: Scene[] = scenePlan.scenes;

// Sources intentionally excluded from a PUBLIC repository.
// Codex should set these to true only when files are present at the locations below.
const AUDIO_ASSET_PRESENT = false;
const TEXTBOOK_ASSETS_PRESENT = false;

const COLORS = {
  paper: '#FAFBF8', ink: '#25372D', secondary: '#586F61',
  light: '#E4EEE7', green: '#6D9480', line: '#D5E2D9',
  yellow: '#FFDB79',
};

const FONT = '"Noto Sans Devanagari", "Noto Sans KR", "Nirmala UI", sans-serif';

function groupWords(words: Word[]): CaptionGroup[] {
  const groups: CaptionGroup[] = [];
  let current: Word[] = [];
  for (const word of words) {
    const previous = current[current.length - 1];
    const mustBreak =
      current.length >= 4 ||
      (previous && word.start_ms - previous.end_ms > 280) ||
      (previous && previous.language !== word.language && current.length >= 2);
    if (mustBreak && current.length) {
      groups.push({
        start: current[0].start_ms,
        end: current[current.length - 1].end_ms,
        words: current,
      });
      current = [];
    }
    current.push(word);
  }
  if (current.length) {
    groups.push({
      start: current[0].start_ms,
      end: current[current.length - 1].end_ms,
      words: current,
    });
  }
  return groups;
}

function activeScene(timeMs: number): Scene {
  return SCENES.find((s) => timeMs >= s.start_ms && timeMs < s.end_ms)
    ?? SCENES[SCENES.length - 1];
}

const EducationalVisual: React.FC<{scene: Scene; frame: number; fps: number}> = ({
  scene, frame, fps,
}) => {
  const sceneStartFrame = Math.round(scene.start_ms / 1000 * fps);
  const localFrame = Math.max(0, frame - sceneStartFrame);
  const entry = spring({frame: localFrame, fps, config: {damping: 19, stiffness: 80}});
  const keywords = scene.speech_topics.split(/[,;]/).map((s) => s.trim()).filter(Boolean).slice(0, 3);
  const grammar = scene.kind.startsWith('grammar') || scene.kind.includes('practice');
  const pageIndex = Math.max(0, (scene.pdf_pages[0] || 1) - 1);
  const pageName = 'textbook/page-' + String(pageIndex).padStart(3, '0') + '.jpg';

  return (
    <div style={{
      position: 'absolute', left: 72, right: 72, top: 105, bottom: 235,
      border: '2px solid ' + COLORS.line, borderRadius: 26, overflow: 'hidden',
      background: 'white', boxShadow: '0 18px 50px #213F3012',
    }}>
      {TEXTBOOK_ASSETS_PRESENT ? (
        <Img src={staticFile(pageName)} style={{
          height: '100%', width: '100%', objectFit: 'contain',
          transform: 'scale(' + interpolate(localFrame, [0, 75], [1, 1.16], {
            extrapolateRight: 'clamp',
          }) + ')',
        }} />
      ) : (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: 80}}>
          <div style={{fontSize: 34, letterSpacing: 2, color: COLORS.green, fontWeight: 700}}>
            {grammar ? '문법 · GRAMMAR' : '어휘 · KEY EXPRESSIONS'}
          </div>
          <div style={{
            maxWidth: 1500, fontSize: grammar ? 72 : 82, fontWeight: 750,
            color: COLORS.ink, textAlign: 'center', lineHeight: 1.5,
            opacity: entry, transform: 'translateY(' + (1 - entry) * 28 + 'px)',
          }}>
            {keywords[0] || '대인관계'}
          </div>
          <div style={{display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center'}}>
            {keywords.slice(1).map((text, i) => {
              const delay = 12 + i * 12;
              const anim = spring({frame: Math.max(0, localFrame - delay), fps, config: {damping: 22}});
              return (
                <div key={i} style={{
                  fontSize: 38, color: COLORS.ink, background: COLORS.light,
                  border: '2px solid ' + COLORS.line, borderRadius: 22,
                  padding: '25px 35px', opacity: anim,
                  transform: 'translateY(' + (1 - anim) * 22 + 'px)',
                }}>{text}</div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const Lesson: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = 1000 * frame / fps;
  const duration = manifest.source_audio_duration_ms;
  const scene = activeScene(t);
  const groups = useMemo(() => groupWords(WORDS), []);
  const group = groups.find((g) => t >= g.start - 130 && t < g.end + 350);
  const progress = Math.min(1, Math.max(0, t / duration));

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.paper, fontFamily: FONT, color: COLORS.ink}}>
      {AUDIO_ASSET_PRESENT && <Audio src={staticFile('media/original_audio.mp3')} />}
      <div style={{position: 'absolute', left: 72, right: 72, top: 22,
        height: 65, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: 33, fontWeight: 750, color: COLORS.secondary}}>KIIP 3 · 대인관계</div>
        <div style={{fontSize: 29, color: COLORS.secondary}}>Chapter 01</div>
      </div>
      <EducationalVisual scene={scene} frame={frame} fps={fps}/>
      <div style={{
        position: 'absolute', left: 72, right: 72, bottom: 55, height: 155,
        borderRadius: 24, border: '2px solid ' + COLORS.line, background: '#FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingLeft: 45, paddingRight: 45,
      }}>
        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
          {group?.words.map((word) => {
            const active = t >= word.start_ms && t < word.end_ms;
            return (
              <span key={word.id} style={{
                fontSize: 49, lineHeight: 1.65, fontWeight: 720,
                color: COLORS.ink, background: active ? COLORS.yellow : 'transparent',
                padding: '0 9px', borderRadius: 8,
              }}>{word.text}</span>
            );
          })}
        </div>
      </div>
      <div style={{position: 'absolute', bottom: 22, left: 72, right: 72,
        height: 7, borderRadius: 6, background: '#E0E8E1', overflow: 'hidden'}}>
        <div style={{width: (100 * progress) + '%', height: '100%', background: COLORS.green}} />
      </div>
    </AbsoluteFill>
  );
};
