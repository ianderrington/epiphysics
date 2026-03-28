'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatSegmentData } from '@/lib/content';

interface ChatRendererProps {
  segments: ChatSegmentData[]; 
  isDark: boolean;
}

const ChatRenderer: React.FC<ChatRendererProps> = ({ 
  segments,
  isDark
}) => {
  // Memoize segments to prevent unnecessary re-renders
  const processedSegments = useMemo(() => {
    let stopIndex = segments.length;
    
    for (let i = 0; i < segments.length; i++) {
      if (segments[i].metadata.storyControl?.action === 'stop') {
        stopIndex = i;
        break;
      }
    }
    
    return segments.slice(0, stopIndex).map((segment, index) => ({
      ...segment,
      key: `segment-${index}-${segment.content.slice(0, 20)}` // Stable key
    }));
  }, [segments]);

  return (
    <div className="space-y-4 px-2 chat-renderer-container">
      <AnimatePresence mode="sync" initial={false}>
        {processedSegments.map((segment, index) => (
          <motion.div 
            key={segment.key}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                duration: 0.35,
                delay: index * 0.03,
                ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -8,
              scale: 0.98,
              transition: { duration: 0.2 }
            }}
            layout
            className="chat-bubble prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: segment.content }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChatRenderer;
