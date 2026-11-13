// GPU particles: slow flour dust and specks of neon light drifting through the film.
import * as THREE from "three";

export function makeParticles(count, color, pixelRatio, { size = 22, opacity = 0.5, fall = 0.18, spread = [12, 7, 10] } = {}) {
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const speed = new Float32Array(count);
  const seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread[0];
    pos[i * 3 + 1] = Math.random() * spread[1] - 1;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread[2];
    speed[i] = 0.4 + Math.random();
    seed[i] = Math.random() * 6.283;
  }
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
  g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  const m = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uBoost: { value: 0 },
      uFall: { value: fall },
      uColor: { value: new THREE.Color(color) },
      uSize: { value: size * pixelRatio },
      uOpacity: { value: opacity },
    },
    vertexShader: /* glsl */ `
      attribute float aSpeed;
      attribute float aSeed;
      uniform float uTime, uBoost, uSize, uFall;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y = mod(p.y - uTime * aSpeed * (uFall + uBoost * 0.6), 7.0) - 1.0;   // drift down, wrap
        p.x += sin(uTime * 0.35 + aSeed) * 0.25;                                 // lazy sideways sway
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uSize * aSpeed / -mv.z;
        vAlpha = smoothstep(9.0, 1.2, -mv.z) * (0.55 + 0.45 * sin(uTime * 1.3 + aSeed));
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float dot = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(uColor, dot * dot * vAlpha * uOpacity);
      }`,
  });
  const pts = new THREE.Points(g, m);
  pts.frustumCulled = false;
  return pts;
}
