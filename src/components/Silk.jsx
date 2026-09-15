import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Silk({
  speed = 3.9,
  scale = 0.8,
  color = "#464349",
  noiseIntensity = 0.4,
  rotation = 0,
  lightMode = false,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const parseColor = (hex) => {
      const clean = hex.replace("#", "");
      const r = parseInt(clean.slice(0, 2), 16) / 255;
      const g = parseInt(clean.slice(2, 4), 16) / 255;
      const b = parseInt(clean.slice(4, 6), 16) / 255;
      return new THREE.Color(r, g, b);
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;

      uniform float uTime;
      uniform vec3  uColor;
      uniform float uSpeed;
      uniform float uScale;
      uniform float uRotation;
      uniform float uNoiseIntensity;
      uniform float uLightMode;

      const float e = 2.71828182845904523536;

      float noise(vec2 texCoord) {
        float G = e;
        vec2  r = (G * sin(G * texCoord));
        return fract(r.x * r.y * (1.0 + texCoord.x));
      }

      vec2 rotateUvs(vec2 uv, float angle) {
        float c = cos(angle);
        float s = sin(angle);
        mat2  rot = mat2(c, -s, s, c);
        return rot * uv;
      }

      void main() {
        float rnd        = noise(gl_FragCoord.xy);
        vec2  uv         = rotateUvs(vUv * uScale, uRotation * 3.14159265 / 180.0);
        vec2  tex        = uv * uScale;
        float tOffset    = uSpeed * uTime * 0.15;

        tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

        float pattern = 0.6 +
                        0.4 * sin(5.0 * (tex.x + tex.y +
                                         cos(3.0 * tex.x + 5.0 * tex.y) +
                                         0.02 * tOffset) +
                                 sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

        float grain = rnd / 15.0 * uNoiseIntensity;
        vec3 result = uColor * pattern - vec3(grain);

        if (uLightMode > 0.5) {
          float fold = smoothstep(0.28, 0.9, pattern);
          float specular = smoothstep(0.72, 0.98, pattern);
          vec3 shadowColor = uColor * 0.72;
          vec3 bodyColor = min(uColor * 1.18, vec3(1.0));
          vec3 lightBase = mix(shadowColor, bodyColor, fold);
          lightBase = mix(lightBase, vec3(1.0), specular * 0.92);
          float fineNoise = noise(gl_FragCoord.xy * 0.63 + vec2(17.0, 41.0));
          float grainSignal = (rnd + fineNoise - 1.0);
          float grainStrength = clamp(uNoiseIntensity * 0.038, 0.0, 0.16);
          result = lightBase + grainSignal * grainStrength;
        }

        gl_FragColor = vec4(clamp(result, 0.0, 1.0), 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: parseColor(color) },
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uRotation: { value: rotation },
      uLightMode: { value: lightMode ? 1.0 : 0.0 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let rafId;
    const startTime = performance.now();

    const animate = () => {
      const delta = (performance.now() - startTime) / 1000;
      uniforms.uTime.value = delta;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [speed, scale, color, noiseIntensity, rotation, lightMode]);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none h-full w-full overflow-hidden"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
