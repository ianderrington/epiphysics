'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { ChatSegmentData } from '@/lib/content';

// Import the base ChatRenderer with no SSR
const BaseChatRenderer = dynamic(() => import('./ChatRenderer'), { 
  ssr: false,
  loading: () => (
    <div className="space-y-4 px-2 animate-pulse">
      <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
    </div>
  )
});

export interface DynamicChatRendererProps {
  chatSegments: ChatSegmentData[];
  config?: any;
}

// Memoize to prevent unnecessary re-renders from parent
const DynamicChatRenderer = memo(function DynamicChatRenderer({
  chatSegments,
}: DynamicChatRendererProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  if (!chatSegments || chatSegments.length === 0) {
    return null;
  }

  return (
    <BaseChatRenderer
      segments={chatSegments}
      isDark={isDark}
    />
  );
});

export default DynamicChatRenderer;
