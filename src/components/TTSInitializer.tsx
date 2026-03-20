'use client';

import { TTSInitializer } from '@supernal/tts-widget/react';
import '@supernal/tts-widget/widget.css';

export default function TTSInit() {
  return (
    <TTSInitializer
      apiUrl="https://tts-api.supernal.ai"
      apiKey={process.env.NEXT_PUBLIC_TTS_API_KEY}
      mode="bundled"
      devMode={process.env.NODE_ENV === 'development'}
    />
  );
}
