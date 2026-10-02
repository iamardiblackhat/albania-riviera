'use client'

import { useEffect, useRef } from 'react'

const FS = `#version 300 es
precision highp float;

uniform vec2  u_res;
uniform float u_time;
out vec4 fragColor;

#define MAX_STEPS 80
#define MAX_DIST  12.0
#define SURF_DIST 0.004
#define PI        3.14159265359

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

vec3 ball(int i, float t) {
  float fi = float(i);
  float speed = 0.38 + fi * 0.07;
  float rx = 1.2 + fi * 0.18;
  float ry = 0.9 + fi * 0.14;
  float rz = 0.7 + fi * 0.11;
  return vec3(
    sin(t * speed       + fi * 1.3) * rx,
    cos(t * speed * 0.7 + fi * 0.9) * ry,
    sin(t * speed * 1.3 + fi * 2.1) * rz
  );
}

float scene(vec3 p, float t) {
  float d = 999.0;
  for (int i = 0; i < 5; i++) {
    float r = 0.55 + float(i) * 0.04;
    d = smin(d, length(p - ball(i, t)) - r, 0.55);
  }
  return d;
}

float softShadow(vec3 ro, vec3 rd, float mint, float maxt, float k, float t) {
  float res = 1.0, ph = 1e20;
  for (float tt = mint; tt < maxt; ) {
    float h = scene(ro + rd * tt, t);
    if (h < 0.001) return 0.0;
    float y = h * h / (2.0 * ph);
    float d = sqrt(max(0.0, h * h - y * y));
    res = min(res, k * d / max(0.0, tt - y));
    ph  = h;
    tt += h;
  }
  return clamp(res, 0.0, 1.0);
}

float ao(vec3 p, vec3 n, float t) {
  float occ = 0.0, sca = 1.0;
  for (int i = 0; i < 5; i++) {
    float h = 0.01 + 0.14 * float(i) / 4.0;
    occ += (h - scene(p + h * n, t)) * sca;
    sca *= 0.8;
  }
  return clamp(1.0 - 2.0 * occ, 0.0, 1.0);
}

vec3 calcNormal(vec3 p, float t) {
  const vec2 e = vec2(0.001, -0.001);
  return normalize(
    e.xyy * scene(p + e.xyy, t) +
    e.yyx * scene(p + e.yyx, t) +
    e.yxy * scene(p + e.yxy, t) +
    e.xxx * scene(p + e.xxx, t)
  );
}

float trace(vec3 ro, vec3 rd, float t) {
  float d = 0.0;
  for (int i = 0; i < MAX_STEPS; i++) {
    float h = scene(ro + rd * d, t);
    if (abs(h) < SURF_DIST || d > MAX_DIST) break;
    d += h;
  }
  return d;
}

vec3 palette(float t2) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 0.8);
  vec3 d2 = vec3(0.00, 0.15, 0.30);
  return a + b * cos(2.0 * PI * (c * t2 + d2));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t  = u_time;

  float camAngle = t * 0.12;
  float camDist  = 5.5;
  vec3 ro = vec3(sin(camAngle) * camDist, 1.2 + sin(t * 0.07) * 0.4, cos(camAngle) * camDist);
  vec3 ww = normalize(-ro);
  vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
  vec3 vv = normalize(cross(uu, ww));
  vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.8 * ww);

  // Deep teal water, lifted so the hero does not read as black
  vec3 col = mix(vec3(0.06, 0.17, 0.21), vec3(0.10, 0.26, 0.29), 1.0 - length(uv) * 0.6);

  float d = trace(ro, rd, t);

  if (d < MAX_DIST) {
    vec3 p   = ro + rd * d;
    vec3 n   = calcNormal(p, t);
    vec3 lig = normalize(vec3(1.8, 2.5, 1.2));

    float dif  = clamp(dot(n, lig), 0.0, 1.0);
    float sha  = softShadow(p + n * 0.01, lig, 0.02, 5.0, 16.0, t);
    float dif2 = clamp(dot(n, normalize(vec3(-1.2, 0.5, -1.0))), 0.0, 1.0) * 0.25;
    float fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 4.0);
    float spec = pow(clamp(dot(n, normalize(lig - rd)), 0.0, 1.0), 64.0);
    float occ  = ao(p, n, t);

    float colT  = dot(n, vec3(0.577)) * 0.5 + 0.5 + length(p) * 0.1 + t * 0.03;
    vec3 surfCol = palette(colT);

    col  = surfCol * (dif * sha * 1.2 + dif2 + 0.08 * occ);
    col += spec * sha * vec3(1.0, 0.95, 0.85) * 0.8;
    col += fres * vec3(0.16, 0.50, 0.55) * 1.1 * occ; // teal fresnel to match #2A7F8A
    float sss = pow(clamp(dot(rd, -lig), 0.0, 1.0), 3.0) * 0.3;
    col += surfCol * sss * vec3(0.3, 0.8, 0.9);
  }

  // Darken bottom half so text above remains readable
  float fadeBottom = smoothstep(-0.6, 0.1, uv.y);
  col *= mix(0.3, 1.0, fadeBottom);

  col *= 1.0 - 0.5 * dot(uv, uv);
  col  = col * (2.51 * col + 0.03) / (col * (2.43 * col + 0.59) + 0.14);
  col  = pow(clamp(col, 0.0, 1.0), vec3(0.4545));

  fragColor = vec4(col, 1.0);
}
`

const VS = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

export default function MetaballHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null
    if (!gl) return

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(s))
      }
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')

    let raf: number
    let start: number | null = null

    const resize = () => {
      const w = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth
      const h = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = Math.max(2, Math.floor(w * dpr))
      canvas.height = Math.max(2, Math.floor(h * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const frame = (now: number) => {
      if (!start) start = now
      const t = (now - start) / 1000
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(frame)
    }

    window.addEventListener('resize', resize)
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)
    resize()
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      ro.disconnect()
      gl.deleteProgram(prog)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
