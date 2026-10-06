// Generates the Lottie line icons used by the homepage process section:
//   node scripts/generate-process-lottie.mjs
// Each icon draws itself once (no loops). Strokes carry the classes lottie-base / lottie-accent and
// fills lottie-base-fill, so CSS can recolor them for light or dark sections; the colors below are fallbacks.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputDirectory = join(dirname(dirname(fileURLToPath(import.meta.url))), "src", "assets", "lottie");

const FRAME_RATE = 60;
const DURATION = 100;
const SIZE = 96;
const STROKE = 5;
const BASE = [0.027, 0.031, 0.024, 1];
const ACCENT = [0.337, 0.518, 0, 1];

const EASE_OUT = { o: { x: [0.16], y: [1] }, i: { x: [0.3], y: [1] } };
const EASE_BACK = { o: { x: [0.34], y: [1.56] }, i: { x: [0.64], y: [1] } };
const EASE_IN_OUT = { o: { x: [0.45], y: [0] }, i: { x: [0.55], y: [1] } };

const value = (k) => ({ a: 0, k });
const toArray = (s) => (Array.isArray(s) ? s : [s]);
const animated = (keyframes, easing = EASE_OUT) => ({
  a: 1,
  k: keyframes.map(([t, s], index) => (index === keyframes.length - 1 ? { t, s: toArray(s) } : { t, s: toArray(s), ...easing })),
});

const path = (vertices, { closed = false, inTangents, outTangents } = {}) => ({
  ty: "sh",
  ks: value({ i: inTangents ?? vertices.map(() => [0, 0]), o: outTangents ?? vertices.map(() => [0, 0]), v: vertices, c: closed }),
});
const ellipse = (center, size) => ({ ty: "el", p: value(center), s: value(size), d: 1 });
const rect = (center, size, radius) => ({ ty: "rc", p: value(center), s: value(size), r: value(radius), d: 1 });
const stroke = (accent = false, width = STROKE) => ({
  ty: "st", c: value(accent ? ACCENT : BASE), o: value(100), w: value(width), lc: 2, lj: 2, cl: accent ? "lottie-accent" : "lottie-base",
});
const fill = () => ({ ty: "fl", c: value(BASE), o: value(100), r: 1, cl: "lottie-base-fill" });
const drawOn = (from, to, easing) => ({ ty: "tm", s: value(0), e: animated([[from, 0], [to, 100]], easing), o: value(0), m: 1 });
const transform = ({ position = [0, 0], anchor = position, scale = value([100, 100]), rotation = value(0) } = {}) => ({
  ty: "tr", p: value(position), a: value(anchor), s: scale, r: rotation, o: value(100), sk: value(0), sa: value(0),
});
const group = (items, transformOptions) => ({ ty: "gr", it: [...items, transform(transformOptions)] });

// A stroked line that draws on between two frames.
const drawnPath = (vertices, from, to, { accent = false, width, ...pathOptions } = {}) => group([path(vertices, pathOptions), drawOn(from, to), stroke(accent, width)]);
// A shape that pops in from its center.
const popIn = (shapes, center, from, to) => group(shapes, { position: center, scale: animated([[from, [0, 0]], [to, [100, 100]]], EASE_BACK) });

const layer = (name, shapes, transformOverrides = {}) => ({
  ddd: 0,
  ty: 4,
  nm: name,
  sr: 1,
  ks: { o: value(100), r: value(0), p: value([0, 0, 0]), a: value([0, 0, 0]), s: value([100, 100, 100]), ...transformOverrides },
  ao: 0,
  shapes,
  ip: 0,
  op: DURATION,
  st: 0,
  bm: 0,
});

const composition = (name, layers) => ({
  v: "5.12.2",
  fr: FRAME_RATE,
  ip: 0,
  op: DURATION,
  w: SIZE,
  h: SIZE,
  nm: name,
  ddd: 0,
  assets: [],
  layers: layers.map((item, index) => ({ ind: index + 1, ...item })),
});

// Discover: a magnifier draws on, a glint appears in the lens, then it scans left and right.
const discover = composition("process-discover", [
  layer("magnifier", [
    group([ellipse([42, 42], [40, 40]), drawOn(0, 30), stroke()]),
    drawnPath([[57, 57], [75, 75]], 16, 36),
    drawnPath([[30, 42], [42, 30]], 40, 58, { accent: true, width: 4.5, outTangents: [[0, -6.6], [0, 0]], inTangents: [[0, 0], [-6.6, 0]] }),
  ], {
    a: value([42, 42, 0]),
    p: value([42, 42, 0]),
    r: animated([[56, 0], [68, -12], [80, 8], [92, 0]], EASE_IN_OUT),
  }),
]);

// Plan: a parent page pops in, branches grow outward, child pages appear, and one gets approved.
const plan = composition("process-plan", [
  layer("sitemap", [
    popIn([rect([48, 22], [30, 18], 4), stroke()], [48, 22], 0, 16),
    drawnPath([[48, 31], [48, 44]], 10, 20),
    drawnPath([[48, 44], [24, 44], [24, 56]], 18, 32),
    drawnPath([[48, 44], [72, 44], [72, 56]], 18, 32),
    popIn([rect([24, 68], [28, 20], 4), stroke()], [24, 68], 28, 44),
    popIn([rect([72, 68], [28, 20], 4), stroke(true)], [72, 68], 34, 50),
    drawnPath([[66, 68.5], [70.5, 73], [78, 64]], 52, 68, { accent: true, width: 4.5 }),
  ]),
]);

// Build: a browser window draws on, its toolbar dots pop in, then the code brackets are written.
const build = composition("process-build", [
  layer("browser", [
    group([rect([48, 49], [74, 58], 8), drawOn(0, 30), stroke()]),
    drawnPath([[11, 33], [85, 33]], 16, 32),
    popIn([ellipse([20, 26.5], [4.5, 4.5]), fill()], [20, 26.5], 24, 34),
    popIn([ellipse([27.5, 26.5], [4.5, 4.5]), fill()], [27.5, 26.5], 27, 37),
    popIn([ellipse([35, 26.5], [4.5, 4.5]), fill()], [35, 26.5], 30, 40),
    drawnPath([[38, 48], [30, 56], [38, 64]], 34, 50),
    drawnPath([[58, 48], [66, 56], [58, 64]], 38, 54),
    drawnPath([[52, 45], [44, 67]], 44, 60, { accent: true }),
  ]),
]);

// Launch: a rocket draws on, lifts off with an exhaust trail, and settles slightly above its start.
const exhaust = (vertices) => group([
  path(vertices),
  { ty: "tm", s: animated([[50, 0], [72, 60]]), e: animated([[36, 0], [50, 100]]), o: value(0), m: 1 },
  stroke(true, 4.5),
]);
const launch = composition("process-launch", [
  layer("rocket", [
    group([
      path([[48, 16], [59, 62], [37, 62]], { closed: true, inTangents: [[-9, 8], [1, -18], [0, 0]], outTangents: [[9, 8], [0, 0], [-1, -18]] }),
      drawOn(0, 30),
      stroke(),
    ]),
    popIn([ellipse([48, 38], [11, 11]), stroke()], [48, 38], 18, 32),
    drawnPath([[37, 48], [27, 60], [27, 70], [37, 62]], 14, 30),
    drawnPath([[59, 48], [69, 60], [69, 70], [59, 62]], 14, 30),
    exhaust([[42, 70], [42, 80]]),
    exhaust([[48, 70], [48, 88]]),
    exhaust([[54, 70], [54, 80]]),
  ], {
    p: animated([[34, [0, 0, 0]], [52, [0, -9, 0]], [70, [0, -6, 0]]]),
  }),
]);

await mkdir(outputDirectory, { recursive: true });
const icons = { discover, plan, build, launch };
for (const [name, data] of Object.entries(icons)) {
  await writeFile(join(outputDirectory, `process-${name}.json`), JSON.stringify(data));
}
console.log(`Wrote ${Object.keys(icons).length} Lottie icons to src/assets/lottie.`);
