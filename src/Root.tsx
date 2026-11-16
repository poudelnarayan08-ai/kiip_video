import React from 'react';
import {Composition} from 'remotion';
import {Lesson} from './Lesson';
import manifest from '../data/manifest.json';

const FPS = 30;
const durationInFrames = Math.ceil((manifest.source_audio_duration_ms / 1000) * FPS);

export const Root: React.FC = () => (
  <Composition
    id="KIIP3Whiteboard"
    component={Lesson}
    width={1920}
    height={1080}
    fps={FPS}
    durationInFrames={durationInFrames}
  />
);
