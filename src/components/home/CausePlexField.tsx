'use client';

import { useRef, useEffect } from 'react';

/**
 * CausePlexField: A visualization of causal event structure
 * 
 * Based on the epimechanics theory:
 * - Causal events flow and connect (partial order)
 * - Chains that form loops become stable entities (causors)
 * - Unstable chains naturally fade
 * - Stable loops persist and glow
 */
const CausePlexField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    interface CausalEvent {
      id: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      stable: boolean; // Part of a stable loop
      loopId: number | null; // Which loop it belongs to
      parent: number | null;
      children: number[];
      age: number;
    }

    interface StableLoop {
      id: number;
      events: number[];
      centerX: number;
      centerY: number;
      radius: number;
      rotation: number;
      pulsePhase: number;
    }

    const events: CausalEvent[] = [];
    const loops: StableLoop[] = [];
    let nextId = 0;
    let nextLoopId = 0;
    let time = 0;

    const width = () => canvas.offsetWidth;
    const height = () => canvas.offsetHeight;

    const MAX_EVENTS = 100;
    const MAX_LOOPS = 8;

    // Create a new causal event
    const createEvent = (x: number, y: number, parent: CausalEvent | null = null): CausalEvent | null => {
      if (events.filter(e => !e.stable).length >= MAX_EVENTS) return null;

      const event: CausalEvent = {
        id: nextId++,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: 0.3 + Math.random() * 0.2,
        alpha: 0,
        stable: false,
        loopId: null,
        parent: parent?.id ?? null,
        children: [],
        age: 0,
      };

      if (parent) {
        parent.children.push(event.id);
      }

      events.push(event);
      return event;
    };

    // Create a stable loop structure
    const createLoop = (x: number, y: number): StableLoop | null => {
      if (loops.length >= MAX_LOOPS) return null;

      const loopEventCount = 4 + Math.floor(Math.random() * 3); // 4-6 events per loop
      const radius = 15 + Math.random() * 10;
      const loop: StableLoop = {
        id: nextLoopId++,
        events: [],
        centerX: x,
        centerY: y,
        radius,
        rotation: 0,
        pulsePhase: Math.random() * Math.PI * 2,
      };

      // Create events in a circle
      for (let i = 0; i < loopEventCount; i++) {
        const angle = (i / loopEventCount) * Math.PI * 2;
        const ex = x + Math.cos(angle) * radius;
        const ey = y + Math.sin(angle) * radius;

        const event: CausalEvent = {
          id: nextId++,
          x: ex,
          y: ey,
          vx: 0,
          vy: 0,
          alpha: 0,
          stable: true,
          loopId: loop.id,
          parent: null,
          children: [],
          age: 0,
        };

        events.push(event);
        loop.events.push(event.id);
      }

      loops.push(loop);
      return loop;
    };

    // Seed initial events
    for (let i = 0; i < 5; i++) {
      createEvent(width() * (0.2 + Math.random() * 0.6), Math.random() * height() * 0.3);
    }

    // Create a couple initial stable loops
    createLoop(width() * 0.3, height() * 0.5);
    createLoop(width() * 0.7, height() * 0.6);

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width(), height());

      // Spawn new events from top
      if (Math.random() < 0.03 && events.filter(e => !e.stable).length < MAX_EVENTS) {
        createEvent(width() * (0.15 + Math.random() * 0.7), -5);
      }

      // Occasionally form a new stable loop from flowing events
      if (Math.random() < 0.002 && loops.length < MAX_LOOPS) {
        // Find a cluster of nearby unstable events
        const unstable = events.filter(e => !e.stable && e.y > 100 && e.y < height() - 100);
        if (unstable.length > 3) {
          const seed = unstable[Math.floor(Math.random() * unstable.length)];
          const nearby = unstable.filter(e => {
            const dx = e.x - seed.x;
            const dy = e.y - seed.y;
            return Math.sqrt(dx * dx + dy * dy) < 50;
          });

          if (nearby.length >= 3) {
            // Convert to stable loop
            const avgX = nearby.reduce((s, e) => s + e.x, 0) / nearby.length;
            const avgY = nearby.reduce((s, e) => s + e.y, 0) / nearby.length;

            // Remove the unstable events
            nearby.forEach(e => {
              const idx = events.indexOf(e);
              if (idx >= 0) events.splice(idx, 1);
            });

            // Create stable loop
            createLoop(avgX, avgY);
          }
        }
      }

      // Update stable loops
      for (let i = loops.length - 1; i >= 0; i--) {
        const loop = loops[i];

        // Slow drift downward
        loop.centerY += 0.15;
        loop.rotation += 0.008;
        loop.pulsePhase += 0.03;

        // Remove if off screen
        if (loop.centerY > height() + 50) {
          // Remove associated events
          loop.events.forEach(eid => {
            const idx = events.findIndex(e => e.id === eid);
            if (idx >= 0) events.splice(idx, 1);
          });
          loops.splice(i, 1);
          continue;
        }

        // Update event positions in loop
        const loopEvents = loop.events.map(eid => events.find(e => e.id === eid)).filter(Boolean) as CausalEvent[];
        const pulseRadius = loop.radius + Math.sin(loop.pulsePhase) * 2;

        loopEvents.forEach((e, j) => {
          const angle = loop.rotation + (j / loopEvents.length) * Math.PI * 2;
          e.x = loop.centerX + Math.cos(angle) * pulseRadius;
          e.y = loop.centerY + Math.sin(angle) * pulseRadius;
          e.alpha = Math.min(1, e.alpha + 0.02);
        });
      }

      // Update unstable events
      for (let i = events.length - 1; i >= 0; i--) {
        const e = events[i];
        if (e.stable) continue;

        e.age += 0.016;
        e.alpha = Math.min(0.8, e.alpha + 0.02);

        // Move
        e.x += e.vx;
        e.y += e.vy;

        // Gentle drift toward center
        e.vx += (width() / 2 - e.x) * 0.00005;
        e.vx *= 0.995;

        // Fade out older events
        if (e.age > 3) {
          e.alpha -= 0.01;
        }

        // Remove if faded or off screen
        if (e.alpha <= 0 || e.y > height() + 20 || e.x < -20 || e.x > width() + 20) {
          events.splice(i, 1);
          continue;
        }

        // Occasionally branch
        if (Math.random() < 0.003 && e.y > 30 && e.y < height() - 100 && e.children.length === 0) {
          const child = createEvent(e.x + (Math.random() - 0.5) * 20, e.y + 10, e);
          if (child) {
            child.vx = e.vx + (Math.random() - 0.5) * 0.3;
          }
        }
      }

      // Draw connections for unstable events (to parents)
      ctx.lineWidth = 1;
      for (const e of events) {
        if (e.stable || e.parent === null) continue;
        const parent = events.find(p => p.id === e.parent);
        if (parent) {
          ctx.strokeStyle = `rgba(100, 150, 255, ${Math.min(e.alpha, parent.alpha) * 0.3})`;
          ctx.beginPath();
          ctx.moveTo(e.x, e.y);
          ctx.lineTo(parent.x, parent.y);
          ctx.stroke();
        }
      }

      // Draw stable loops
      for (const loop of loops) {
        const loopEvents = loop.events.map(eid => events.find(e => e.id === eid)).filter(Boolean) as CausalEvent[];
        if (loopEvents.length < 2) continue;

        const avgAlpha = loopEvents.reduce((s, e) => s + e.alpha, 0) / loopEvents.length;

        // Draw loop connections
        ctx.strokeStyle = `rgba(255, 200, 100, ${avgAlpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        loopEvents.forEach((e, j) => {
          if (j === 0) ctx.moveTo(e.x, e.y);
          else ctx.lineTo(e.x, e.y);
        });
        ctx.closePath();
        ctx.stroke();

        // Draw soft glow
        const gradient = ctx.createRadialGradient(
          loop.centerX, loop.centerY, 0,
          loop.centerX, loop.centerY, loop.radius + 10
        );
        gradient.addColorStop(0, `rgba(255, 200, 100, ${avgAlpha * 0.15})`);
        gradient.addColorStop(1, `rgba(255, 200, 100, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(loop.centerX, loop.centerY, loop.radius + 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw event nodes
      for (const e of events) {
        const size = e.stable ? 3 : 2;
        const color = e.stable
          ? `rgba(255, 220, 150, ${e.alpha})`
          : `rgba(150, 200, 255, ${e.alpha})`;

        ctx.beginPath();
        ctx.arc(e.x, e.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
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
