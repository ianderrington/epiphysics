'use client';

import { useRef, useEffect } from 'react';

/**
 * CausePlexField: Deterministic causal graph evolution
 * 
 * Based on a simple rewriting rule:
 * - Each event has inputs and outputs (state domains)
 * - New events are created when outputs connect to inputs
 * - The graph grows according to local rules, not randomness
 * - Loops form when causal paths return to compatible states
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

    // A causal event with a discrete "state" value
    // Events connect when output state matches input state
    interface Event {
      id: number;
      x: number;
      y: number;
      state: number; // discrete state value (0-7)
      inputFrom: number | null; // parent event id
      outputTo: number[]; // child event ids
      depth: number; // causal depth from root
      birthTime: number;
      alpha: number;
    }

    interface Edge {
      from: number;
      to: number;
      alpha: number;
    }

    let events: Event[] = [];
    let edges: Edge[] = [];
    let nextId = 0;
    let time = 0;
    let stepCount = 0;

    const MAX_EVENTS = 120;
    const NUM_STATES = 6;

    // Deterministic state transition rule
    // Given current state and position, compute next state(s)
    const transitionRule = (state: number, depth: number): number[] => {
      // Simple rule: state evolves based on depth mod pattern
      // This creates structured, non-random growth
      const base = (state + 1) % NUM_STATES;
      
      // At certain depths, branch into two states
      if (depth % 4 === 3) {
        return [base, (base + 3) % NUM_STATES];
      }
      return [base];
    };

    // Check if two states can form a loop (compatible for recurrence)
    const canLoop = (state1: number, state2: number): boolean => {
      // States loop if they're equal or complementary
      return state1 === state2 || (state1 + state2) % NUM_STATES === 0;
    };

    // Initialize with seed events across the top
    const initialize = () => {
      events = [];
      edges = [];
      nextId = 0;
      stepCount = 0;

      // Create initial events with different states
      const numSeeds = 5;
      for (let i = 0; i < numSeeds; i++) {
        events.push({
          id: nextId++,
          x: width() * (0.15 + (i / (numSeeds - 1)) * 0.7),
          y: 30,
          state: i % NUM_STATES,
          inputFrom: null,
          outputTo: [],
          depth: 0,
          birthTime: time,
          alpha: 1,
        });
      }
    };

    // One step of causal evolution
    const evolveStep = () => {
      if (events.length >= MAX_EVENTS) return;

      // Find frontier events (those that can spawn children)
      const frontier = events.filter(e => 
        e.outputTo.length === 0 && 
        e.y < height() - 80 &&
        e.depth < 25
      );

      if (frontier.length === 0) {
        // Reset when graph is complete
        setTimeout(() => initialize(), 1000);
        return;
      }

      // Process one frontier event per step (deterministic order)
      const parent = frontier[stepCount % frontier.length];
      const nextStates = transitionRule(parent.state, parent.depth);

      const childSpacing = 40;
      const baseX = parent.x - ((nextStates.length - 1) * childSpacing) / 2;

      for (let i = 0; i < nextStates.length; i++) {
        if (events.length >= MAX_EVENTS) break;

        const childState = nextStates[i];
        const childX = baseX + i * childSpacing;
        const childY = parent.y + 35 + (parent.depth % 2) * 5;

        // Check for loop closure with existing events
        let loopTarget: Event | null = null;
        for (const existing of events) {
          if (existing.id === parent.id) continue;
          if (existing.depth < parent.depth - 1) continue; // Must be recent
          
          const dx = existing.x - childX;
          const dy = existing.y - childY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 30 && canLoop(childState, existing.state)) {
            loopTarget = existing;
            break;
          }
        }

        if (loopTarget) {
          // Form a loop edge instead of new event
          edges.push({
            from: parent.id,
            to: loopTarget.id,
            alpha: 1,
          });
          parent.outputTo.push(loopTarget.id);
        } else {
          // Create new child event
          const child: Event = {
            id: nextId++,
            x: Math.max(20, Math.min(width() - 20, childX)),
            y: childY,
            state: childState,
            inputFrom: parent.id,
            outputTo: [],
            depth: parent.depth + 1,
            birthTime: time,
            alpha: 0,
          };

          events.push(child);
          parent.outputTo.push(child.id);

          edges.push({
            from: parent.id,
            to: child.id,
            alpha: 0,
          });
        }
      }

      stepCount++;
    };

    initialize();

    // State colors (deterministic, based on state value)
    const stateColors = [
      [100, 180, 255], // 0: blue
      [150, 220, 180], // 1: teal
      [200, 180, 255], // 2: purple
      [255, 200, 150], // 3: gold
      [180, 255, 200], // 4: green
      [255, 150, 180], // 5: pink
    ];

    const getColor = (state: number, alpha: number): string => {
      const c = stateColors[state % stateColors.length];
      return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
    };

    let lastStep = 0;
    const STEP_INTERVAL = 150; // ms between evolution steps

    const animate = (timestamp: number) => {
      time = timestamp / 1000;

      // Evolve at fixed intervals
      if (timestamp - lastStep > STEP_INTERVAL) {
        evolveStep();
        lastStep = timestamp;
      }

      ctx.clearRect(0, 0, width(), height());

      // Update alphas (fade in)
      for (const e of events) {
        e.alpha = Math.min(1, e.alpha + 0.05);
      }
      for (const edge of edges) {
        edge.alpha = Math.min(1, edge.alpha + 0.05);
      }

      // Draw edges
      ctx.lineWidth = 1.5;
      for (const edge of edges) {
        const from = events.find(e => e.id === edge.from);
        const to = events.find(e => e.id === edge.to);
        if (!from || !to) continue;

        // Check if this is a loop edge (to an earlier event)
        const isLoop = to.depth <= from.depth;

        if (isLoop) {
          // Loop edges are gold and curved
          ctx.strokeStyle = `rgba(255, 200, 100, ${edge.alpha * 0.8})`;
          ctx.lineWidth = 2;
          
          const midX = (from.x + to.x) / 2 + (from.x - to.x) * 0.3;
          const midY = (from.y + to.y) / 2;
          
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.quadraticCurveTo(midX, midY, to.x, to.y);
          ctx.stroke();
          ctx.lineWidth = 1.5;
        } else {
          // Normal causal edges
          const avgState = Math.floor((from.state + to.state) / 2);
          ctx.strokeStyle = getColor(avgState, edge.alpha * 0.5);
          
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        }
      }

      // Draw events
      for (const e of events) {
        // Check if part of a loop
        const hasLoopEdge = edges.some(edge => 
          (edge.from === e.id || edge.to === e.id) && 
          events.find(ev => ev.id === edge.to)?.depth <= events.find(ev => ev.id === edge.from)?.depth
        );

        const size = hasLoopEdge ? 4 : 3;
        
        ctx.beginPath();
        ctx.arc(e.x, e.y, size, 0, Math.PI * 2);
        ctx.fillStyle = getColor(e.state, e.alpha);
        ctx.fill();

        // Glow for loop nodes
        if (hasLoopEdge) {
          ctx.beginPath();
          ctx.arc(e.x, e.y, size + 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 100, ${e.alpha * 0.2})`;
          ctx.fill();
        }
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
      style={{ background: 'linear-gradient(to bottom, #0a0a1a, #1a1a3a)' }}
    />
  );
};

export default CausePlexField;
