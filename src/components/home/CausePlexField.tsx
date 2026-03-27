'use client';

import { useRef, useEffect } from 'react';

/**
 * CausePlexField: Phase-based causal dynamics
 * 
 * Each event has a phase θ. Interactions are determined by phase:
 * - Opposite phase (Δθ ≈ π) → annihilation (destructive interference)
 * - Same phase (Δθ ≈ 0) → reinforcement
 * - Loops form when N events arrange with phases summing to 2πn
 * - Stable loops persist; unstable configurations dissolve
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

    const width = () => canvas.offsetWidth;
    const height = () => canvas.offsetHeight;

    const TAU = Math.PI * 2;

    interface Event {
      id: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      phase: number; // θ ∈ [0, 2π)
      radius: number;
      alpha: number;
      loopId: number | null;
      dying: boolean;
      dyingProgress: number;
    }

    interface Loop {
      id: number;
      events: number[];
      centerX: number;
      centerY: number;
      totalPhase: number; // Should be ≈ 2πn for stability
      rotation: number;
      rotationRate: number; // Based on total phase
      stable: boolean;
      tier: number; // 1 = basic loop, 2 = merged loop, etc.
    }

    let events: Event[] = [];
    let loops: Loop[] = [];
    let nextId = 0;
    let nextLoopId = 0;

    const MAX_EVENTS = 80;
    const MAX_LOOPS = 6;
    const ANNIHILATION_DIST = 12;
    const LOOP_FORMATION_DIST = 40;
    const MIN_LOOP_SIZE = 3;
    const MAX_LOOP_SIZE = 6;

    // Phase to color: smooth rainbow based on phase
    const phaseToColor = (phase: number, alpha: number): string => {
      const hue = (phase / TAU) * 360;
      return `hsla(${hue}, 70%, 60%, ${alpha})`;
    };

    // Check if two phases are opposite (destructive)
    const areOpposite = (p1: number, p2: number): boolean => {
      const diff = Math.abs(((p1 - p2 + Math.PI) % TAU) - Math.PI);
      return diff < 0.4; // ~23 degrees tolerance
    };

    // Check if two phases are aligned (constructive)
    const areAligned = (p1: number, p2: number): boolean => {
      const diff = Math.abs(((p1 - p2 + Math.PI) % TAU) - Math.PI);
      return diff > 2.7; // Close to π means opposite, close to 0 means aligned
    };

    // Check if loop phases sum to 2πn (quantization)
    const isQuantized = (phases: number[]): boolean => {
      const sum = phases.reduce((a, b) => a + b, 0);
      const remainder = sum % TAU;
      return remainder < 0.5 || remainder > TAU - 0.5;
    };

    const createEvent = (): Event | null => {
      if (events.filter(e => !e.loopId).length >= MAX_EVENTS) return null;

      const event: Event = {
        id: nextId++,
        x: width() * (0.1 + Math.random() * 0.8),
        y: -10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 0.5 + Math.random() * 0.5,
        phase: Math.random() * TAU,
        radius: 3,
        alpha: 0,
        loopId: null,
        dying: false,
        dyingProgress: 0,
      };
      events.push(event);
      return event;
    };

    // Try to form a loop from nearby events
    const tryFormLoop = () => {
      if (loops.length >= MAX_LOOPS) return;

      const freeEvents = events.filter(e => !e.loopId && !e.dying && e.y > 50 && e.y < height() - 100);
      if (freeEvents.length < MIN_LOOP_SIZE) return;

      // Find a cluster
      for (const seed of freeEvents) {
        const nearby = freeEvents.filter(e => {
          if (e.id === seed.id) return false;
          const dx = e.x - seed.x;
          const dy = e.y - seed.y;
          return Math.sqrt(dx * dx + dy * dy) < LOOP_FORMATION_DIST;
        });

        if (nearby.length >= MIN_LOOP_SIZE - 1) {
          // Take seed + enough nearby to form loop
          const loopEvents = [seed, ...nearby.slice(0, MAX_LOOP_SIZE - 1)];
          const phases = loopEvents.map(e => e.phase);

          // Check quantization condition
          if (isQuantized(phases)) {
            // Form stable loop!
            const cx = loopEvents.reduce((s, e) => s + e.x, 0) / loopEvents.length;
            const cy = loopEvents.reduce((s, e) => s + e.y, 0) / loopEvents.length;

            const totalPhase = phases.reduce((a, b) => a + b, 0);
            // Direction based on whether total phase is above or below π per element
            const avgPhase = totalPhase / loopEvents.length;
            const direction = avgPhase > Math.PI ? -1 : 1;
            const speed = 0.008 + Math.abs(avgPhase - Math.PI) * 0.005;
            
            const loop: Loop = {
              id: nextLoopId++,
              events: loopEvents.map(e => e.id),
              centerX: cx,
              centerY: cy,
              totalPhase: totalPhase,
              rotation: 0,
              rotationRate: direction * speed, // Direction AND speed from phase
              stable: true,
              tier: 1,
            };

            // Arrange events in circle
            const radius = 18 + loopEvents.length * 2;
            loopEvents.forEach((e, i) => {
              const angle = (i / loopEvents.length) * TAU;
              e.x = cx + Math.cos(angle) * radius;
              e.y = cy + Math.sin(angle) * radius;
              e.vx = 0;
              e.vy = 0;
              e.loopId = loop.id;
              e.radius = 4;
            });

            loops.push(loop);
            return;
          }
        }
      }
    };

    // Try to merge two nearby loops with compatible phases
    const tryMergeLoops = () => {
      for (let i = 0; i < loops.length; i++) {
        for (let j = i + 1; j < loops.length; j++) {
          const loop1 = loops[i];
          const loop2 = loops[j];

          const dx = loop2.centerX - loop1.centerX;
          const dy = loop2.centerY - loop1.centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Check if close enough to interact
          if (dist < 60) {
            // Check phase compatibility (aligned phases can merge)
            const phaseDiff = Math.abs(((loop1.totalPhase - loop2.totalPhase + Math.PI) % TAU) - Math.PI);
            
            if (phaseDiff > 2.5) {
              // Compatible! Merge into higher-tier structure
              const allEventIds = [...loop1.events, ...loop2.events];
              const allEvents = allEventIds
                .map(id => events.find(e => e.id === id))
                .filter(Boolean) as Event[];

              if (allEvents.length > MAX_LOOP_SIZE * 2) continue; // Too big

              const newCx = (loop1.centerX + loop2.centerX) / 2;
              const newCy = (loop1.centerY + loop2.centerY) / 2;
              const newTotalPhase = loop1.totalPhase + loop2.totalPhase;

              // Create merged loop - inherit combined rotation properties
              const avgPhase = newTotalPhase / allEvents.length;
              const direction = avgPhase > Math.PI ? -1 : 1;
              const speed = 0.006 + Math.abs(avgPhase - Math.PI) * 0.003;
              
              const mergedLoop: Loop = {
                id: nextLoopId++,
                events: allEventIds,
                centerX: newCx,
                centerY: newCy,
                totalPhase: newTotalPhase,
                rotation: 0,
                rotationRate: direction * speed,
                stable: true,
                tier: Math.max(loop1.tier, loop2.tier) + 1,
              };

              // Arrange in larger circle
              const radius = 25 + allEvents.length * 3;
              allEvents.forEach((e, idx) => {
                const angle = (idx / allEvents.length) * TAU;
                e.x = newCx + Math.cos(angle) * radius;
                e.y = newCy + Math.sin(angle) * radius;
                e.loopId = mergedLoop.id;
                e.radius = 4 + mergedLoop.tier;
              });

              // Remove old loops, add new
              loops.splice(j, 1);
              loops.splice(i, 1);
              loops.push(mergedLoop);
              return;
            } else if (phaseDiff < 0.5) {
              // Opposite phases - loops annihilate each other!
              const allEventIds = [...loop1.events, ...loop2.events];
              allEventIds.forEach(id => {
                const e = events.find(ev => ev.id === id);
                if (e) {
                  e.dying = true;
                  e.loopId = null;
                }
              });
              loops.splice(j, 1);
              loops.splice(i, 1);
              return;
            }
          }
        }
      }
    };

    // Initialize
    for (let i = 0; i < 15; i++) {
      const e = createEvent();
      if (e) {
        e.y = Math.random() * height() * 0.7;
        e.alpha = 1;
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 26, 1)';
      ctx.fillRect(0, 0, width(), height());

      // Spawn new events
      if (Math.random() < 0.04) {
        createEvent();
      }

      // Try to form loops occasionally
      if (Math.random() < 0.02) {
        tryFormLoop();
      }

      // Try to merge nearby compatible loops
      if (Math.random() < 0.01 && loops.length >= 2) {
        tryMergeLoops();
      }

      // Update loops
      for (let i = loops.length - 1; i >= 0; i--) {
        const loop = loops[i];
        loop.rotation += loop.rotationRate; // Each loop rotates at its own rate
        loop.centerY += 0.15 / loop.tier; // Higher tier = slower drift

        // Get loop events
        const loopEvents = loop.events
          .map(id => events.find(e => e.id === id))
          .filter(Boolean) as Event[];

        if (loopEvents.length < MIN_LOOP_SIZE || loop.centerY > height() + 50) {
          // Loop dies
          loopEvents.forEach(e => {
            e.loopId = null;
            e.dying = true;
          });
          loops.splice(i, 1);
          continue;
        }

        // Update positions
        const radius = 18 + loopEvents.length * 2;
        loopEvents.forEach((e, j) => {
          const angle = loop.rotation + (j / loopEvents.length) * TAU;
          e.x = loop.centerX + Math.cos(angle) * radius;
          e.y = loop.centerY + Math.sin(angle) * radius;
          e.alpha = Math.min(1, e.alpha + 0.02);
        });
      }

      // Update free events and check interactions
      const freeEvents = events.filter(e => !e.loopId);

      for (let i = freeEvents.length - 1; i >= 0; i--) {
        const e = freeEvents[i];

        if (e.dying) {
          e.dyingProgress += 0.05;
          e.alpha = 1 - e.dyingProgress;
          if (e.dyingProgress >= 1) {
            const idx = events.indexOf(e);
            if (idx >= 0) events.splice(idx, 1);
          }
          continue;
        }

        // Fade in
        e.alpha = Math.min(1, e.alpha + 0.02);

        // Move
        e.x += e.vx;
        e.y += e.vy;

        // Gentle center drift
        e.vx += (width() / 2 - e.x) * 0.00003;
        e.vx *= 0.99;

        // Remove if off screen
        if (e.y > height() + 20 || e.x < -20 || e.x > width() + 20) {
          const idx = events.indexOf(e);
          if (idx >= 0) events.splice(idx, 1);
          continue;
        }

        // Check for annihilation with other free events
        for (let j = i + 1; j < freeEvents.length; j++) {
          const other = freeEvents[j];
          if (other.dying || other.loopId) continue;

          const dx = other.x - e.x;
          const dy = other.y - e.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < ANNIHILATION_DIST) {
            if (areOpposite(e.phase, other.phase)) {
              // Destructive interference - annihilate!
              e.dying = true;
              other.dying = true;
            } else if (areAligned(e.phase, other.phase)) {
              // Constructive - merge phases slightly
              const avgPhase = (e.phase + other.phase) / 2;
              e.phase = avgPhase;
              other.phase = avgPhase;
              // Push apart gently
              const pushX = dx / dist * 0.5;
              const pushY = dy / dist * 0.5;
              e.vx -= pushX;
              e.vy -= pushY;
              other.vx += pushX;
              other.vy += pushY;
            }
          }
        }
      }

      // Draw connections within loops
      ctx.lineWidth = 2;
      for (const loop of loops) {
        const loopEvents = loop.events
          .map(id => events.find(e => e.id === id))
          .filter(Boolean) as Event[];

        if (loopEvents.length < 2) continue;

        // Draw loop polygon
        ctx.beginPath();
        loopEvents.forEach((e, j) => {
          if (j === 0) ctx.moveTo(e.x, e.y);
          else ctx.lineTo(e.x, e.y);
        });
        ctx.closePath();

        // Color based on tier: gold → cyan → magenta for higher tiers
        const avgAlpha = loopEvents.reduce((s, e) => s + e.alpha, 0) / loopEvents.length;
        let strokeColor: string;
        let fillColor: string;
        
        if (loop.tier === 1) {
          strokeColor = `rgba(255, 200, 100, ${avgAlpha * 0.8})`;
          fillColor = `rgba(255, 200, 100, ${avgAlpha * 0.1})`;
        } else if (loop.tier === 2) {
          strokeColor = `rgba(100, 220, 255, ${avgAlpha * 0.9})`;
          fillColor = `rgba(100, 220, 255, ${avgAlpha * 0.15})`;
        } else {
          strokeColor = `rgba(255, 100, 255, ${avgAlpha * 0.95})`;
          fillColor = `rgba(255, 100, 255, ${avgAlpha * 0.2})`;
        }
        
        ctx.lineWidth = 1.5 + loop.tier;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
        ctx.fillStyle = fillColor;
        ctx.fill();
      }

      // Draw events
      for (const e of events) {
        if (e.dying) {
          // Annihilation flash
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius + 5 * e.dyingProgress, 0, TAU);
          ctx.fillStyle = `rgba(255, 100, 100, ${e.alpha * 0.5})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, TAU);
        ctx.fillStyle = phaseToColor(e.phase, e.alpha);
        ctx.fill();

        // Subtle glow
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius + 2, 0, TAU);
        ctx.fillStyle = phaseToColor(e.phase, e.alpha * 0.2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default CausePlexField;
