'use client';

import { useRef, useEffect } from 'react';

/**
 * CausePlexField: Plasma field driven by causal event sources
 * 
 * The visual is fluid plasma, but the dynamics come from causal structure:
 * - Causal events act as "sources" that emit influence
 * - The plasma field responds to these sources
 * - Loops create stable attractor regions
 * - The field shows how causal influence propagates
 */
const CausePlexField = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;

    // Dynamically import THREE.js
    import('three').then((THREE) => {
      if (!mountRef.current) return;

      const rect = mount.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      // Causal sources - these drive the plasma
      interface CausalSource {
        x: number;
        y: number;
        vx: number;
        vy: number;
        strength: number;
        phase: number;
        isLoop: boolean;
        age: number;
      }

      const sources: CausalSource[] = [];
      const MAX_SOURCES = 12;

      // Initialize some sources
      for (let i = 0; i < 6; i++) {
        sources.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.001,
          vy: (Math.random() - 0.5) * 0.001 + 0.0005,
          strength: 0.5 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          isLoop: Math.random() > 0.7,
          age: 0,
        });
      }

      const plasmaMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(width, height) },
          // Pass causal sources to shader
          uSourceCount: { value: sources.length },
          uSources: { value: new Float32Array(MAX_SOURCES * 4) }, // x, y, strength, isLoop
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uResolution;
          uniform int uSourceCount;
          uniform float uSources[${MAX_SOURCES * 4}];
          varying vec2 vUv;

          #define NUM_OCTAVES 4

          float rand(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
          }

          float noise(vec2 p) {
            vec2 ip = floor(p);
            vec2 u = fract(p);
            u = u*u*(3.0-2.0*u);
            float res = mix(
              mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
              mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
            return res*res;
          }

          float fbm(vec2 x) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int i = 0; i < NUM_OCTAVES; ++i) {
              v += a * noise(x);
              x = rot * x * 2.0 + shift;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = vUv;
            float time = uTime * 0.15;
            float aspect = uResolution.x / uResolution.y;

            // Base plasma pattern
            vec2 baseUV = uv * 3.0;
            
            // Accumulate influence from causal sources
            float causalField = 0.0;
            float loopField = 0.0;
            vec2 flowDir = vec2(0.0);
            
            for (int i = 0; i < ${MAX_SOURCES}; i++) {
              if (i >= uSourceCount) break;
              
              float sx = uSources[i * 4];
              float sy = uSources[i * 4 + 1];
              float strength = uSources[i * 4 + 2];
              float isLoop = uSources[i * 4 + 3];
              
              vec2 sourcePos = vec2(sx, sy);
              vec2 toSource = sourcePos - uv;
              toSource.x *= aspect;
              float dist = length(toSource);
              
              // Causal influence falls off with distance
              float influence = strength * exp(-dist * 4.0);
              causalField += influence;
              
              // Loops create stable rotating regions
              if (isLoop > 0.5) {
                loopField += influence * 1.5;
                // Add rotation around loop sources
                vec2 perpendicular = vec2(-toSource.y, toSource.x);
                flowDir += perpendicular * influence * 0.5;
              }
              
              // Flow toward sources
              flowDir += normalize(toSource + 0.001) * influence * 0.3;
            }

            // Apply flow to UV for distortion
            vec2 distortedUV = baseUV + flowDir * 2.0;
            
            // Generate plasma waves influenced by causal field
            vec2 q = vec2(
              fbm(distortedUV + 0.1 * time),
              fbm(distortedUV + vec2(1.0) - 0.1 * time)
            );
            
            vec2 r = vec2(
              fbm(distortedUV + 4.0 * q + 0.15 * time + causalField),
              fbm(distortedUV + 4.0 * q - 0.126 * time + loopField)
            );
            
            float pattern = fbm(distortedUV + r);
            
            // Color palette - blue for flow, gold for loops
            vec3 flowColor1 = vec3(0.05, 0.2, 0.6);    // Deep blue
            vec3 flowColor2 = vec3(0.1, 0.4, 0.8);     // Ocean blue
            vec3 loopColor1 = vec3(0.8, 0.6, 0.2);     // Gold
            vec3 loopColor2 = vec3(0.6, 0.3, 0.5);     // Purple
            
            // Mix based on pattern and causal influence
            vec3 flowMix = mix(flowColor1, flowColor2, pattern);
            vec3 loopMix = mix(loopColor1, loopColor2, r.x);
            
            // Blend between flow and loop colors based on field strength
            float loopRatio = clamp(loopField / (causalField + 0.001), 0.0, 1.0);
            vec3 color = mix(flowMix, loopMix, loopRatio * 0.7);
            
            // Add glow around sources
            color += vec3(0.1, 0.15, 0.3) * causalField;
            color += vec3(0.2, 0.15, 0.05) * loopField;
            
            // Mouse interaction - local brightening
            vec2 mousePos = vec2(uMouse.x * aspect, uMouse.y);
            vec2 uvPos = vec2(uv.x * aspect, uv.y);
            float mouseDist = length(uvPos - mousePos);
            float mouseGlow = exp(-mouseDist * 5.0) * 0.3;
            color += vec3(0.2, 0.25, 0.4) * mouseGlow;
            
            // Enhance contrast and brightness
            color = pow(color, vec3(0.85));
            color *= 1.1;
            
            gl_FragColor = vec4(color, 0.95);
          }
        `,
        transparent: true,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, plasmaMaterial);
      scene.add(mesh);

      // Mouse interaction
      const handleMouseMove = (event: MouseEvent) => {
        const rect = mountRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (event.clientX - rect.left) / rect.width;
        const y = 1.0 - (event.clientY - rect.top) / rect.height;
        plasmaMaterial.uniforms.uMouse.value.set(x, y);
      };
      window.addEventListener('mousemove', handleMouseMove);

      const clock = new THREE.Clock();

      const animate = () => {
        const elapsed = clock.getElapsedTime();
        plasmaMaterial.uniforms.uTime.value = elapsed;

        // Update causal sources
        const sourceData = new Float32Array(MAX_SOURCES * 4);
        
        for (let i = sources.length - 1; i >= 0; i--) {
          const s = sources[i];
          s.age += 0.016;
          
          // Move sources
          s.x += s.vx;
          s.y += s.vy;
          
          // Wrap or remove
          if (s.y > 1.2 || s.y < -0.2 || s.x < -0.2 || s.x > 1.2) {
            sources.splice(i, 1);
            continue;
          }
          
          // Loops orbit slightly
          if (s.isLoop) {
            s.phase += 0.01;
            s.vx += Math.cos(s.phase) * 0.00005;
            s.vy += Math.sin(s.phase) * 0.00005;
          }
        }

        // Spawn new sources
        if (sources.length < MAX_SOURCES && Math.random() < 0.02) {
          sources.push({
            x: Math.random(),
            y: -0.05,
            vx: (Math.random() - 0.5) * 0.001,
            vy: 0.001 + Math.random() * 0.001,
            strength: 0.3 + Math.random() * 0.7,
            phase: Math.random() * Math.PI * 2,
            isLoop: Math.random() > 0.6,
            age: 0,
          });
        }

        // Occasionally form loop from nearby sources
        if (Math.random() < 0.005) {
          for (const s of sources) {
            if (s.isLoop) continue;
            for (const other of sources) {
              if (other === s || other.isLoop) continue;
              const dx = other.x - s.x;
              const dy = other.y - s.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 0.15) {
                // Merge into loop
                s.isLoop = true;
                s.x = (s.x + other.x) / 2;
                s.y = (s.y + other.y) / 2;
                s.strength = s.strength + other.strength * 0.5;
                s.vx *= 0.3;
                s.vy *= 0.3;
                const idx = sources.indexOf(other);
                if (idx >= 0) sources.splice(idx, 1);
                break;
              }
            }
          }
        }

        // Pack source data for shader
        for (let i = 0; i < sources.length && i < MAX_SOURCES; i++) {
          sourceData[i * 4] = sources[i].x;
          sourceData[i * 4 + 1] = sources[i].y;
          sourceData[i * 4 + 2] = sources[i].strength;
          sourceData[i * 4 + 3] = sources[i].isLoop ? 1.0 : 0.0;
        }
        
        plasmaMaterial.uniforms.uSourceCount.value = sources.length;
        plasmaMaterial.uniforms.uSources.value = sourceData;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        if (!mount) return;
        const rect = mount.getBoundingClientRect();
        const newWidth = rect.width || window.innerWidth;
        const newHeight = rect.height || window.innerHeight;
        renderer.setSize(newWidth, newHeight);
        plasmaMaterial.uniforms.uResolution.value.set(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', handleResize);

    }).catch((error) => {
      console.error('Failed to load Three.js:', error);
    });

    return () => {};
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full overflow-hidden" />;
};

export default CausePlexField;
