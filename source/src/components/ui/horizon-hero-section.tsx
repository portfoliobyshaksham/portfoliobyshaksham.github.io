"use client";

/*
 * Horizon hero section (based on the 21st.dev component).
 * Kept: the Three.js scene (star field, nebula, mountain layers, atmosphere,
 * bloom), the camera flight driven by scroll, and the GSAP intro animation.
 * Changed:
 *  - Typed for TypeScript; content comes from props (`title`, `subtitle`,
 *    `sections`), so each scroll section can showcase a project.
 *  - Styled with Tailwind; the original relied on CSS classes it didn't ship.
 *  - Scroll progress is measured across this component, not the whole page.
 *  - Removed the decorative side menu (the site has its own navigation).
 *  - Fixed: duplicate stars under React StrictMode, a shared ref on several
 *    titles, missing disposal of the composer, no WebGL fallback.
 *  - Reduced motion: no intro animation, no drifting stars or floating camera.
 *  - The camera travels a shorter path and the mountains stay in place, and a
 *    dark tint sits over the scene, so text over it stays readable.
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export interface HorizonSection {
  id: string;
  eyebrow?: string;
  title: string;
  body?: string;
  tags?: string;
  image?: { src: string; width: number; height: number; alt: string };
  href?: string;
  cta?: string;
}

export interface HorizonHeroProps {
  title?: string;
  subtitle?: [string, string];
  sections?: HorizonSection[];
}

const DEFAULT_SECTIONS: HorizonSection[] = [
  { id: "cosmos", title: "COSMOS", body: "Beyond the boundaries of imagination, lies the universe of possibilities" },
  { id: "infinity", title: "INFINITY", body: "In the space between thought and creation, we find the essence of true innovation" },
];

interface ThreeState {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>[];
  nebula: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null;
  mountains: THREE.Mesh<THREE.ShapeGeometry, THREE.MeshBasicMaterial>[];
  locations: number[];
  animationId: number | null;
  target: { x: number; y: number; z: number };
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const Component = ({
  title = "HORIZON",
  subtitle = ["Where vision meets reality,", "we shape the future of tomorrow"],
  sections = DEFAULT_SECTIONS,
}: HorizonHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 300 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const totalSections = sections.length;

  const three = useRef<ThreeState>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    locations: [],
    animationId: null,
    target: { x: 0, y: 30, z: 300 },
  });

  // Initialise Three.js
  useEffect(() => {
    const refs = three.current;
    const reduce = prefersReducedMotion();
    refs.stars = [];
    refs.mountains = [];

    try {
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
      refs.camera.position.set(0, 30, 300);

      refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      refs.composer = new EffectComposer(refs.renderer);
      refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
      refs.composer.addPass(
        new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.85)
      );
    } catch {
      setWebglFailed(true);
      setIsReady(true);
      return;
    }

    const scene = refs.scene;

    // Star field — three layers
    const starCount = 5000;
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let j = 0; j < starCount; j++) {
        const radius = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        const color = new THREE.Color();
        const choice = Math.random();
        if (choice < 0.7) color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        else if (choice < 0.9) color.setHSL(0.08, 0.5, 0.8);
        else color.setHSL(0.6, 0.5, 0.8);
        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;
        sizes[j] = Math.random() * 2 + 0.5;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 pos = position;
            float angle = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const stars = new THREE.Points(geometry, material);
      scene.add(stars);
      refs.stars.push(stars);
    }

    // Nebula
    {
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      scene.add(nebula);
      refs.nebula = nebula;
    }

    // Mountain layers
    const layers = [
      { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
      { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
      { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
      { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
    ];
    layers.forEach((layer, index) => {
      const points: THREE.Vector2[] = [];
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1000;
        const y =
          Math.sin(i * 0.1) * layer.height +
          Math.sin(i * 0.05) * layer.height * 0.5 +
          Math.random() * layer.height * 0.2 -
          100;
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(5000, -300));
      points.push(new THREE.Vector2(-5000, -300));

      const mountain = new THREE.Mesh(
        new THREE.ShapeGeometry(new THREE.Shape(points)),
        new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        })
      );
      mountain.position.z = layer.distance;
      mountain.position.y = layer.distance;
      mountain.userData = { baseZ: layer.distance, index };
      scene.add(mountain);
      refs.mountains.push(mountain);
    });
    refs.locations = refs.mountains.map((m) => m.position.z);

    // Atmosphere
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(600, 32, 32),
      new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            atmosphere *= sin(time * 2.0) * 0.1 + 0.9;
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      })
    );
    scene.add(atmosphere);

    const start = performance.now();
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const time = reduce ? 0 : (performance.now() - start) * 0.001;

      refs.stars.forEach((s) => (s.material.uniforms.time.value = time));
      if (refs.nebula) refs.nebula.material.uniforms.time.value = time * 0.5;

      if (refs.camera) {
        const k = reduce ? 1 : 0.05;
        const c = smoothCameraPos.current;
        c.x += (refs.target.x - c.x) * k;
        c.y += (refs.target.y - c.y) * k;
        c.z += (refs.target.z - c.z) * k;
        refs.camera.position.set(c.x + Math.sin(time * 0.1) * 2, c.y + Math.cos(time * 0.15), c.z);
        refs.camera.lookAt(0, 10, -600);
      }

      refs.mountains.forEach((m, i) => {
        const parallax = 1 + i * 0.5;
        m.position.x = Math.sin(time * 0.1) * 2 * parallax;
        m.position.y = 50 + Math.cos(time * 0.15) * parallax;
      });

      refs.composer?.render();
    };
    animate();
    setIsReady(true);

    const handleResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);
      refs.stars.forEach((s) => {
        s.geometry.dispose();
        s.material.dispose();
      });
      refs.mountains.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      refs.nebula?.geometry.dispose();
      refs.nebula?.material.dispose();
      atmosphere.geometry.dispose();
      (atmosphere.material as THREE.Material).dispose();
      refs.composer?.dispose();
      refs.renderer?.dispose();
      refs.stars = [];
      refs.mountains = [];
    };
  }, []);

  // GSAP intro
  useEffect(() => {
    if (!isReady) return;
    const els = [titleRef.current, subtitleRef.current, scrollProgressRef.current].filter(Boolean);
    gsap.set(els, { visibility: "visible" });
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline();
    if (titleRef.current) {
      tl.from(titleRef.current.querySelectorAll(".title-char"), {
        y: 200,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out",
      });
    }
    if (subtitleRef.current) {
      tl.from(
        subtitleRef.current.querySelectorAll(".subtitle-line"),
        { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=0.8"
      );
    }
    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, { opacity: 0, y: 50, duration: 1, ease: "power2.out" }, "-=0.5");
    }
    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Scroll → camera
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const refs = three.current;
      const range = el.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - el.offsetTop;
      const progress = Math.min(Math.max(range > 0 ? scrolled / range : 0, 0), 1);

      setScrollProgress(progress);
      const total = progress * totalSections;
      const section = Math.min(Math.floor(total), totalSections);
      setCurrentSection(section);

      // Camera stops: from far out (z 300) up to the front mountain layer (z -30).
      // Going further flies into the atmosphere glow and washes the scene out.
      const stop = (n: number) => ({
        x: 0,
        y: 30 + (20 * n) / totalSections,
        z: 300 - (330 * n) / totalSections,
      });
      const cur = stop(section);
      const next = stop(Math.min(section + 1, totalSections));
      const t = total - section;
      refs.target = {
        x: cur.x + (next.x - cur.x) * t,
        y: cur.y + (next.y - cur.y) * t,
        z: cur.z + (next.z - cur.z) * t,
      };

      // The original removed the mountains at 70% scroll, which left a flat,
      // washed-out glow behind the last projects; they now stay in place.
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [totalSections]);

  return (
    <div ref={containerRef} className="relative bg-black text-white">
      {/* Fixed 3D background, clipped to this component */}
      <div className="pointer-events-none sticky top-0 -mb-[100svh] h-[100svh] w-full overflow-hidden" aria-hidden="true">
        {webglFailed ? (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_bottom,#0f3460_0%,#000_70%)]" />
        ) : (
          <canvas ref={canvasRef} className="block h-full w-full" />
        )}
        {/* Tint so text stays readable over the bright horizon glow */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Intro */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
        <h1
          ref={titleRef}
          aria-label={title}
          className="overflow-hidden font-[Anton,Impact,sans-serif] text-[clamp(64px,16vw,200px)] uppercase leading-none tracking-[0.04em]"
          style={{ visibility: "hidden" }}
        >
          {title.split("").map((char, i) => (
            <span key={i} aria-hidden="true" className="title-char inline-block">
              {char === " " ? " " : char}
            </span>
          ))}
        </h1>
        <div ref={subtitleRef} className="mt-6 text-lg text-white/75 sm:text-xl" style={{ visibility: "hidden" }}>
          <p className="subtitle-line">{subtitle[0]}</p>
          <p className="subtitle-line">{subtitle[1]}</p>
        </div>
      </div>

      {/* Scroll sections */}
      {sections.map((s, i) => (
        <section key={s.id} id={s.id} className="relative z-10 flex min-h-[100svh] items-center py-24">
          <div className="wrap grid w-full items-center gap-8 md:grid-cols-[1fr_1.25fr] md:gap-12">
            <div className={i % 2 ? "md:order-2" : undefined}>
              {s.eyebrow && <p className="mb-3 text-sm font-semibold text-[#d1e1e8]">{s.eyebrow}</p>}
              <h2 className="font-[Anton,Impact,sans-serif] text-[clamp(40px,6vw,80px)] uppercase leading-[0.95]">
                {s.title}
              </h2>
              {s.tags && <p className="mt-3 text-sm text-white/60">{s.tags}</p>}
              {s.body && <p className="mt-5 max-w-[48ch] text-base text-white/80 sm:text-lg">{s.body}</p>}
              {s.href && (
                <a className="btn btn-primary mt-8" href={s.href}>
                  {s.cta ?? "View project"}
                </a>
              )}
            </div>
            {s.image && (
              <a
                href={s.href}
                tabIndex={-1}
                aria-hidden="true"
                className="block overflow-hidden rounded-xl ring-1 ring-white/15 transition-shadow duration-150 hover:ring-[#d1e1e8]"
              >
                <img
                  src={s.image.src}
                  width={s.image.width}
                  height={s.image.height}
                  alt=""
                  loading="lazy"
                  className="block aspect-[16/10] w-full object-cover"
                />
              </a>
            )}
          </div>
        </section>
      ))}

      {/* Scroll progress */}
      <div
        ref={scrollProgressRef}
        aria-hidden="true"
        className="pointer-events-none sticky bottom-6 z-[5] mx-auto flex w-fit items-center gap-3 rounded-md bg-black/60 px-3 py-2 text-xs tracking-[0.15em] text-white/70"
        style={{ visibility: "hidden" }}
      >
        <span>SCROLL</span>
        <span className="relative h-px w-24 bg-white/20">
          <span className="absolute inset-y-0 left-0 bg-[#d1e1e8]" style={{ width: `${scrollProgress * 100}%` }} />
        </span>
        <span>
          {String(Math.min(Math.max(currentSection, 1), totalSections)).padStart(2, "0")} /{" "}
          {String(totalSections).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default Component;
