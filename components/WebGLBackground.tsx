"use client";

import { useEffect, useRef } from "react";

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  // Target mouse position (raw)
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5 });
  // Smoothed mouse position (lerped in render loop)
  const mouseSmoothedRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip WebGL on reduced-motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const glRaw = canvas.getContext("webgl");
    if (!glRaw) return;
    const gl = glRaw as WebGLRenderingContext;

    // Adaptive quality based on device type
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isTablet = window.matchMedia("(max-width: 1024px)").matches;
    const DPR = isMobile ? Math.min(window.devicePixelRatio, 0.85)
              : isTablet ? Math.min(window.devicePixelRatio, 1.25)
              :             Math.min(window.devicePixelRatio, 1.5);

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Simplex noise background — 3 octaves desktop, 2 octaves mobile
    const octave3 = isMobile ? "" : `
        float n3 = snoise(p*3.2 + vec2(t*0.25, -t*0.18) + n2*0.2);
    `;
    const mixNoise = isMobile
      ? `float noise = (n1*0.6 + n2*0.4) * 0.5 + 0.5;`
      : `float noise = (n1*0.5 + n2*0.3 + n3*0.2) * 0.5 + 0.5;`;

    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform int u_dark;

      vec3 mod289v3(vec3 x) { return x - floor(x*(1.0/289.0))*289.0; }
      vec2 mod289v2(vec2 x) { return x - floor(x*(1.0/289.0))*289.0; }
      vec3 permute3(vec3 x) { return mod289v3(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
        vec2 i  = floor(v + dot(v,C.yy));
        vec2 x0 = v - i + dot(i,C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289v2(i);
        vec3 p = permute3(permute3(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0*fract(p*C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x+0.5);
        m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
        vec3 g;
        g.x  = a0.x*x0.x  + h.x*x0.y;
        g.yz = a0.yz*x12.xz + h.yz*x12.yw;
        return 130.0*dot(m,g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float t  = u_time * 0.12;
        vec2 p   = uv * 2.5;

        float n1 = snoise(p + vec2(t*0.3, t*0.2));
        float n2 = snoise(p*1.8 + vec2(-t*0.15, t*0.35) + n1*0.3);
        ${octave3}
        ${mixNoise}

        float mouseDist = 1.0 - clamp(distance(uv, u_mouse) * 1.6, 0.0, 1.0);
        float mi = mouseDist * mouseDist * 0.10;
        noise = clamp(noise + mi, 0.0, 1.0);

        vec3 color;
        if (u_dark == 1) {
          vec3 base = vec3(0.047, 0.055, 0.055);
          vec3 mid  = vec3(0.068, 0.088, 0.072);
          vec3 hi   = vec3(0.090, 0.118, 0.088);
          color = mix(base, mix(mid, hi, noise*0.6), noise*0.42);
        } else {
          vec3 base = vec3(0.984, 0.980, 0.957);
          vec3 mid  = vec3(0.968, 0.960, 0.930);
          vec3 hi   = vec3(0.945, 0.935, 0.895);
          color = mix(base, mix(mid, hi, noise*0.5), noise*0.38);
        }

        vec3 accent = vec3(0.753, 0.996, 0.016);
        color += accent * mi * 0.045;
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compileShader(type: number, src: string): WebGLShader | null {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),
      gl.STATIC_DRAW);

    const aPos   = gl.getAttribLocation(prog, "a_position");
    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uRes   = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uDark  = gl.getUniformLocation(prog, "u_dark");

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth  * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width  = window.innerWidth  + "px";
      canvas.style.height = window.innerHeight + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    // Raw mouse target
    const onMove = (e: MouseEvent) => {
      mouseTargetRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Pause when page is hidden
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current);
      } else {
        animRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const MOUSE_LERP = isMobile ? 0 : 0.055; // no lerp on mobile (no mouse)

    function render(ts: number) {
      if (!canvas) return;

      // Smooth mouse interpolation
      const mt = mouseTargetRef.current;
      const ms = mouseSmoothedRef.current;
      ms.x += (mt.x - ms.x) * MOUSE_LERP;
      ms.y += (mt.y - ms.y) * MOUSE_LERP;

      const isDark = document.documentElement.classList.contains("dark") ? 1 : 0;

      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(uTime, ts * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, ms.x, ms.y);
      gl.uniform1i(uDark, isDark);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: -10, pointerEvents: "none",
      }}
    />
  );
}
