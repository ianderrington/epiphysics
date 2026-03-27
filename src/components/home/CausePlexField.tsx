'use client';

import { useRef, useEffect } from 'react';

/**
 * CausePlexField: A visualization of causal event structure
 * 
 * Nodes = causal events (state transitions)
 * Edges = causal precedence (one event enables another)
 * Branches = multiway structure (alternative histories)
 * Loops = stable entities (causors)
 */
const CausePlexField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Causal event node
    interface CausalEvent {
      id: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      generation: number;
      branch: number;
      isLoop: boolean;
      connections: number[];
      birth: number;
      alpha: number;
    }

    const events: CausalEvent[] = [];
    let nextId = 0;
    let time = 0;

    const width = () => canvas.offsetWidth;
    const height = () => canvas.offsetHeight;

    // Create initial seed events
    const createEvent = (x: number, y: number, generation: number, branch: number, parent?: CausalEvent): CausalEvent => {
      const event: CausalEvent = {
        id: nextId++,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: 0.2 + Math.random() * 0.3, // Drift downward (time flows down)
        generation,
        branch,
        isLoop: false,
        connections: parent ? [parent.id] : [],
        birth: time,
        alpha: 0,
      };
      events.push(event);
      return event;
    };

    // Seed the initial events
    for (let i = 0; i < 5; i++) {
      createEvent(
        width() * (0.3 + Math.random() * 0.4),
        -20,
        0,
        i
      );
    }

    // Animation loop
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width(), height());

      // Spawn new events from top
      if (Math.random() < 0.03 && events.length < 150) {
        createEvent(
          width() * (0.2 + Math.random() * 0.6),
          -10,
          0,
          Math.floor(Math.random() * 5)
        );
      }

      // Update and draw events
      for (let i = events.length - 1; i >= 0; i--) {
        const e = events[i];
        
        // Fade in
        e.alpha = Math.min(1, e.alpha + 0.02);
        
        // Move
        e.x += e.vx;
        e.y += e.vy;
        
        // Slight horizontal drift toward center
        e.vx += (width() / 2 - e.x) * 0.0001;
        
        // Remove if off screen
        if (e.y > height() + 50) {
          events.splice(i, 1);
          continue;
        }

        // Occasionally branch (multiway structure)
        if (Math.random() < 0.002 && e.y > 50 && e.y < height() - 100) {
          const child1 = createEvent(e.x - 20, e.y + 10, e.generation + 1, e.branch, e);
          const child2 = createEvent(e.x + 20, e.y + 10, e.generation + 1, e.branch + 0.5, e);
          child1.vx = -0.3;
          child2.vx = 0.3;
        }

        // Occasionally form loops (causor structures)
        if (Math.random() < 0.001 && !e.isLoop) {
          // Find nearby event to connect to (simulating causal loop)
          for (const other of events) {
            if (other.id !== e.id && !e.connections.includes(other.id)) {
              const dx = other.x - e.x;
              const dy = other.y - e.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 80 && dist > 20) {
                e.connections.push(other.id);
                e.isLoop = true;
                other.isLoop = true;
                break;
              }
            }
          }
        }
      }

      // Draw connections (causal edges)
      ctx.lineWidth = 1;
      for (const e of events) {
        for (const connId of e.connections) {
          const other = events.find(ev => ev.id === connId);
          if (other) {
            const gradient = ctx.createLinearGradient(e.x, e.y, other.x, other.y);
            if (e.isLoop || other.isLoop) {
              // Loop connections glow gold
              gradient.addColorStop(0, `rgba(255, 200, 100, ${e.alpha * 0.6})`);
              gradient.addColorStop(1, `rgba(255, 200, 100, ${other.alpha * 0.6})`);
            } else {
              // Normal causal connections are blue
              gradient.addColorStop(0, `rgba(100, 150, 255, ${e.alpha * 0.4})`);
              gradient.addColorStop(1, `rgba(100, 150, 255, ${other.alpha * 0.4})`);
            }
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(e.x, e.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      // Draw events (nodes)
      for (const e of events) {
        const size = e.isLoop ? 4 : 2.5;
        const color = e.isLoop 
          ? `rgba(255, 220, 150, ${e.alpha})` // Gold for loop nodes
          : `rgba(150, 200, 255, ${e.alpha})`; // Blue for regular nodes
        
        ctx.beginPath();
        ctx.arc(e.x, e.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Glow effect for loop nodes
        if (e.isLoop) {
          ctx.beginPath();
          ctx.arc(e.x, e.y, size + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 100, ${e.alpha * 0.2})`;
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(to bottom, #0a0a1a, #1a1a3a)' }}
    />
  );
};

export default CausePlexField;
