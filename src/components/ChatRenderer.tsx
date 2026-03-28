'use client';

import React from 'react';
import { motion } from 'framer-motion';
// Import the data type
import { ChatSegmentData } from '@/lib/content';

interface ChatRendererProps {
  // Expect ChatSegmentData objects
  segments: ChatSegmentData[]; 
  isDark: boolean;
}

const ChatRenderer: React.FC<ChatRendererProps> = ({ 
  segments,
  isDark
}) => {
  let stopRendering = false;
  
  return (
    <div className="space-y-4 px-2 chat-renderer-container">
      {segments.map((segment, index) => { // Now segment is ChatSegmentData
        if (stopRendering) return null; 

        // --- Use Pre-parsed Metadata --- 
        const { metadata, content: segmentHtml } = segment;

        // Handle stop action from metadata
        if (metadata.storyControl?.action === 'stop') {
          stopRendering = true;
          return null; // Don't render the stop segment itself
        }

        // Handle sound directive from metadata
        if (metadata.sound) {
          // TODO: Implement sound playback using metadata.sound path
          console.log('Sound directive found:', metadata.sound);
        }
        
        // --- End Metadata Handling ---

        // If it wasn't a directive that prevents rendering, render the segment content
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05, // Stagger effect
              ease: "easeOut" 
            }}
            className="chat-bubble prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: segmentHtml }}
          />
        );
      })}
    </div>
  );
};

export default ChatRenderer;
