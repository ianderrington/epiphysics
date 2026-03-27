'use client';

import { useRef, useEffect } from 'react';

/**
 * CausePlexField: A visualization of causal event structure
 * 
 * Nodes = causal events (state transitions)
 * Edges = causal precedence (one event enables another)
 * Branches = multiway structure (alternative histories)
 * Loops = stable entities (causors)
 * Annihilation = when branches meet and cancel (interference)
 */
const CausePlexField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

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
      dying: boolean;
      deathTime: number;
    }

    const events: CausalEvent[] = [];
    let nextId = 0;
    let time = 0;

    const width = () => canvas.offsetWidth;
    const height = () => canvas.offsetHeight;

    // Max events to prevent overwhelming
    const MAX_EVENTS = 80;

    // Create initial seed events
    const createEvent = (x: number, y: number, generation: number, branch: number, parent?: CausalEvent): CausalEvent | null => {
      // Don't create if at max
      if (events.length >= MAX_EVENTS) return null;
      
      const event: CausalEvent = {
        id: nextId++,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 0.4 + Math.random() * 0.4, // Drift downward (time flows down)
        generation,
        branch,
        isLoop: false,
        connections: parent ? [parent.id] : [],
        birth: time,
        alpha: 0,
        dying: false,
        deathTime: 0,
      };
      events.push(event);
      return event;
    };

    // Seed the initial events
    for (let i = 0; i < 3; i++) {
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

      // Spawn new events from top (rate limited)
      if (Math.random() < 0.02 && events.length < MAX_EVENTS) {
        createEvent(
          width() * (0.2 + Math.random() * 0.6),
          -10,
          0,
          Math.floor(Math.random() * 5)
        );
      }

      // Check for annihilation (nearby events from different branches cancel)
      for (let i = 0; i < events.length; i++) {
        for (let j = i + 1; j < events.length; j++) {
          const e1 = events[i];
          const e2 = events[j];
          
          if (e1.dying || e2.dying) continue;
          if (Math.abs(e1.branch - e2.branch) < 0.3) continue; // Same branch, no annihilation
          
          const dx = e2.x - e1.x;
          const dy = e2.y - e1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Annihilation when different branches get very close
          if (dist < 15 && Math.random() < 0.3) {
            e1.dying = true;
            e2.dying = true;
            e1.deathTime = time;
            e2.deathTime = time;
          }
        }
      }

      // Update and draw events
      for (let i = events.length - 1; i >= 0; i--) {
        const e = events[i];
        
        // Handle dying events (annihilation flash then remove)
        if (e.dying) {
          const deathProgress = (time - e.deathTime) / 0.3; // 0.3 second death
          if (deathProgress > 1) {
            events.splice(i, 1);
            continue;
          }
          // Flash bright then fade
          e.alpha = Math.max(0, 1 - deathProgress);
          
          // Draw annihilation flash
          ctx.beginPath();
          ctx.arc(e.x, e.y, 8 * (1 - deathProgress) + 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 100, 100, ${e.alpha * 0.5})`;
          ctx.fill();
          continue;
        }
        
        // Fade in
        e.alpha = Math.min(1, e.alpha + 0.03);
        
        // Move
        e.x += e.vx;
        e.y += e.vy;
        
        // Slight horizontal drift toward center
        e.vx += (width() / 2 - e.x) * 0.0002;
        // Dampen horizontal velocity
        e.vx *= 0.99;
        
        // Remove if off screen (bottom or sides)
        if (e.y > height() + 30 || e.x < -30 || e.x > width() + 30) {
          events.splice(i, 1);
          continue;
        }

        // Occasionally branch (multiway structure) - less frequent
        if (Math.random() < 0.001 && e.y > 50 && e.y < height() - 150 && events.length < MAX_EVENTS - 2) {
          const child1 = createEvent(e.x - 15, e.y + 10, e.generation + 1, e.branch - 0.5, e);
          const child2 = createEvent(e.x + 15, e.y + 10, e.generation + 1, e.branch + 0.5, e);
          if (child1) child1.vx = -0.4;
          if (child2) child2.vx = 0.4;
        }

        // Occasionally form loops (causor structures) - less frequent
        if (Math.random() < 0.0005 && !e.isLoop) {
          for (const other of events) {
            if (other.id !== e.id && !other.dying && !e.connections.includes(other.id)) {
              const dx = other.x - e.x;
              const dy = other.y - e.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 60 && dist > 15 && Math.abs(e.branch - other.branch) < 0.5) {
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
        if (e.dying) continue;
        for (const connId of e.connections) {
          const other = events.find(ev => ev.id === connId);
          if (other && !other.dying) {
            const gradient = ctx.createLinearGradient(e.x, e.y, other.x, other.y);
            if (e.isLoop || other.isLoop) {
              gradient.addColorStop(0, `rgba(255, 200, 100, ${e.alpha * 0.5})`);
              gradient.addColorStop(1, `rgba(255, 200, 100, ${other.alpha * 0.5})`);
            } else {
              gradient.addColorStop(0, `rgba(100, 150, 255, ${e.alpha * 0.3})`);
              gradient.addColorStop(1, `rgba(100, 150, 255, ${other.alpha * 0.3})`);
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
        if (e.dying) continue;
        
        const size = e.isLoop ? 3.5 : 2;
        const color = e.isLoop 
          ? `rgba(255, 220, 150, ${e.alpha})` 
          : `rgba(150, 200, 255, ${e.alpha * 0.8})`;
        
        ctx.beginPath();
        ctx.arc(e.x, e.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Subtle glow for loop nodes
        if (e.isLoop) {
          ctx.beginPath();
          ctx.arc(e.x, e.y, size + 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 100, ${e.alpha * 0.15})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
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
