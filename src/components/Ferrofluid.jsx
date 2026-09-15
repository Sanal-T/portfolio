import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Ferrofluid({
  colors = ["#ffffff", "#ffffff", "#ffffff"],
  speed = 0.1,
  scale = 1.6,
  turbulence = 1,
  fluidity = 0.1,
  rimWidth = 0.2,
  sharpness = 2.5,
  shimmer = 1.5,
  glow = 2,
  flowDirection = "down",
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 0.9,
  mouseRadius = 0.35,
}) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });

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
      const c = new THREE.Color(hex);
      return [c.r, c.g, c.b];
    };

    const c0 = parseColor(colors[0] || "#ffffff");
    const c1 = parseColor(colors[1] || "#aaaaaa");
    const c2 = parseColor(colors[2] || "#555555");

    const flowVec = flowDirection === "down"
      ? [0.0, -1.0]
      : flowDirection === "up"
      ? [0.0, 1.0]
      : flowDirection === "left"
      ? [-1.0, 0.0]
      : [1.0, 0.0];

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2  uResolution;
      uniform vec2  uMouse;
      uniform float uMouseStrength;
      uniform float uMouseRadius;
      uniform float uSpeed;
      uniform float uScale;
      uniform float uTurbulence;
      uniform float uFluidity;
      uniform float uRimWidth;
      uniform float uSharpness;
      uniform float uShimmer;
      uniform float uGlow;
      uniform float uOpacity;
      uniform vec2  uFlowDir;
      uniform vec3  uColor0;
      uniform vec3  uColor1;
      uniform vec3  uColor2;
      uniform int   uMouseActive;
      varying vec2 vUv;

      /* ---- GLSL Simplex 3D noise ---- */
      vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
      vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
      vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

      float snoise(vec3 v){
        const vec2 C=vec2(1./6.,1./3.);
        const vec4 D=vec4(0.,.5,1.,2.);
        vec3 i=floor(v+dot(v,C.yyy));
        vec3 x0=v-i+dot(i,C.xxx);
        vec3 g=step(x0.yzx,x0.xyz);
        vec3 l=1.-g;
        vec3 i1=min(g.xyz,l.zxy);
        vec3 i2=max(g.xyz,l.zxy);
        vec3 x1=x0-i1+C.xxx;
        vec3 x2=x0-i2+C.yyy;
        vec3 x3=x0-D.yyy;
        i=mod289(i);
        vec4 p=permute(permute(permute(
          i.z+vec4(0.,i1.z,i2.z,1.))
          +i.y+vec4(0.,i1.y,i2.y,1.))
          +i.x+vec4(0.,i1.x,i2.x,1.));
        float n_=.142857142857;
        vec3 ns=n_*D.wyz-D.xzx;
        vec4 j=p-49.*floor(p*ns.z*ns.z);
        vec4 x_=floor(j*ns.z);
        vec4 y_=floor(j-7.*x_);
        vec4 x=x_*ns.x+ns.yyyy;
        vec4 y=y_*ns.x+ns.yyyy;
        vec4 h=1.-abs(x)-abs(y);
        vec4 b0=vec4(x.xy,y.xy);
        vec4 b1=vec4(x.zw,y.zw);
        vec4 s0=floor(b0)*2.+1.;
        vec4 s1=floor(b1)*2.+1.;
        vec4 sh=-step(h,vec4(0.));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
        vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,h.x);
        vec3 p1=vec3(a0.zw,h.y);
        vec3 p2=vec3(a1.xy,h.z);
        vec3 p3=vec3(a1.zw,h.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
        vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
        m=m*m;
        return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
      }

      /* ---- FBM ---- */
      float fbm(vec3 p, int octaves){
        float v=0., a=.5;
        vec3 shift=vec3(100.);
        for(int i=0;i<8;i++){
          if(i>=octaves) break;
          v+=a*snoise(p);
          p=p*2.+shift;
          a*=.5;
        }
        return v;
      }

      void main(){
        vec2 uv = vUv;

        /* flow drift */
        float t = uTime * uSpeed;
        vec2 drift = uFlowDir * t;

        /* mouse distortion */
        vec2 distort = vec2(0.);
        if(uMouseActive == 1){
          vec2 diff = uv - uMouse;
          float dist = length(diff);
          float influence = exp(-dist * dist / (uMouseRadius * uMouseRadius));
          distort = normalize(diff + 0.001) * influence * uMouseStrength * 0.12;
        }

        vec2 st = (uv + drift + distort) * uScale;

        /* noise field */
        int oct = max(1, int(uTurbulence * 5.));
        float n1 = fbm(vec3(st * 1.0, t * 0.3), oct);
        float n2 = fbm(vec3(st * 2.0 + n1 * uFluidity * 3., t * 0.5), oct);
        float n3 = fbm(vec3(st * 4.0 + n2 * uFluidity * 2., t * 0.7), oct);

        float field = n1 * 0.5 + n2 * 0.35 + n3 * 0.15;
        field = field * 0.5 + 0.5; /* remap to [0,1] */

        /* ferrofluid spikes: sharp banding */
        float band = sin(field * uSharpness * 12.) * 0.5 + 0.5;
        float spike = pow(band, uSharpness * 2.0);
        float body  = smoothstep(0.35, 0.65, field);

        /* rim light */
        float rim = abs(field - 0.5) * 2.0;
        rim = smoothstep(1.0 - uRimWidth, 1.0, rim);

        /* shimmer */
        float shimmerNoise = snoise(vec3(st * 8., t * 3.)) * 0.5 + 0.5;
        float shimmerMask  = shimmerNoise * spike * uShimmer;

        /* composite */
        vec3 col = mix(uColor2, uColor1, body);
        col = mix(col, uColor0, spike);
        col += vec3(1.) * shimmerMask * 0.6;
        col += uColor0 * rim * 0.8;

        /* glow halo */
        float glowField = exp(-abs(field - 0.5) * uGlow * 4.);
        col += uColor0 * glowField * uGlow * 0.3;

        /* vignette */
        vec2 vig = vUv * 2. - 1.;
        float vignette = 1. - dot(vig, vig) * 0.35;
        col *= vignette;

        gl_FragColor = vec4(col, uOpacity);
      }
    `;

    const uniforms = {
      uTime:         { value: 0 },
      uResolution:   { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uMouse:        { value: new THREE.Vector2(0.5, 0.5) },
      uMouseStrength:{ value: mouseStrength },
      uMouseRadius:  { value: mouseRadius },
      uMouseActive:  { value: mouseInteraction ? 1 : 0 },
      uSpeed:        { value: speed },
      uScale:        { value: scale },
      uTurbulence:   { value: turbulence },
      uFluidity:     { value: fluidity },
      uRimWidth:     { value: rimWidth },
      uSharpness:    { value: sharpness },
      uShimmer:      { value: shimmer },
      uGlow:         { value: glow },
      uOpacity:      { value: opacity },
      uFlowDir:      { value: new THREE.Vector2(flowVec[0], flowVec[1]) },
      uColor0:       { value: new THREE.Vector3(...c0) },
      uColor1:       { value: new THREE.Vector3(...c1) },
      uColor2:       { value: new THREE.Vector3(...c2) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /* mouse tracking */
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      uniforms.uMouse.value.set(
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      );
    };

    if (mouseInteraction) {
      window.addEventListener("mousemove", onMouseMove);
    }

    let rafId;
    const startTime = performance.now();
    const animate = () => {
      uniforms.uTime.value = (performance.now() - startTime) / 1000;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (mouseInteraction) window.removeEventListener("mousemove", onMouseMove);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [speed, scale, turbulence, fluidity, rimWidth, sharpness, shimmer, glow, opacity,
      mouseInteraction, mouseStrength, mouseRadius, flowDirection,
      colors[0], colors[1], colors[2]]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", pointerEvents: mouseInteraction ? "auto" : "none" }}
    />
  );
}
