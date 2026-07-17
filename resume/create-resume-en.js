import fs from "node:fs";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

const outputPath = process.argv[2];
if (!outputPath) throw new Error("Usage: node create.js /absolute/path/output.docx");

const T = String.raw;

// Single-column professional palette.
// Restrained dark slate-blue accent for the NAME and SECTION TITLES only.
const BLACK = "000000";
const GRAY = "404040";
const ACCENT = "2F4656";

// Letter page, 0.5 in side margins (same as the .tex/Jake's Resume layout):
// content width = 12240 - 2*720 = 10800 twips
const MARGIN = 720; // 0.5 in
const CONTENT_WIDTH = 12240 - 2 * MARGIN;

// Body text: 10 pt Times New Roman with EXACT 11 pt line height (a standard
// compact-resume setting, no clipping for 10 pt TNR). "exact" is honored by
// Word and Pages alike, unlike fractional "auto" spacing which Pages ignores.
const BODY_LINE = 220;
const BODY_RULE = "exact";

const font = { name: "Times New Roman" };
const run = (text, options = {}) =>
  new TextRun({ text, font, size: 20, color: BLACK, ...options }); // 10 pt body

const para = (children, options = {}) =>
  new Paragraph({
    spacing: { after: 12, line: BODY_LINE, lineRule: BODY_RULE },
    ...options,
    children: Array.isArray(children) ? children : [children],
  });

// Section heading: bold small-caps, accent color, thin bottom rule
const sectionHeading = (text) =>
  para(run(text.toUpperCase(), { bold: true, size: 24, smallCaps: true, color: ACCENT }), {
    spacing: { before: 40, after: 20, line: 240 },
    border: {
      bottom: { color: ACCENT, space: 2, style: BorderStyle.SINGLE, size: 6 },
    },
  });

// Bullet item
const bullet = (children, options = {}) =>
  para(children, {
    bullet: { level: 0 },
    spacing: { after: 12, line: BODY_LINE, lineRule: BODY_RULE },
    ...options,
  });

// Bullet with a bold lead-in phrase, e.g. "Agent Skill Engineering: ..."
const leadBullet = (lead, rest) => bullet([run(lead, { bold: true }), run(rest)]);

// Left/right header row rendered as a borderless 2-column table so the
// right-aligned date survives import in Word, Pages and LibreOffice alike
// (custom tab stops are dropped by Pages' docx importer).
const NO_BORDERS = {
  top: { style: BorderStyle.NONE, size: 0, color: "auto" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
  left: { style: BorderStyle.NONE, size: 0, color: "auto" },
  right: { style: BorderStyle.NONE, size: 0, color: "auto" },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "auto" },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: "auto" },
};
const DATE_W = 2000; // right cell width (twips) — fits "Jun 2024 – Sep 2025"
const NO_CELL_MARGINS = { top: 0, bottom: 0, left: 0, right: 0 };

const lrRow = (leftRuns, rightText) =>
  new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [CONTENT_WIDTH - DATE_W, DATE_W],
    layout: TableLayoutType.FIXED,
    borders: NO_BORDERS,
    indent: { size: 0, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_WIDTH - DATE_W, type: WidthType.DXA },
            margins: NO_CELL_MARGINS,
            children: [
              para(leftRuns, { spacing: { after: 6, line: BODY_LINE, lineRule: BODY_RULE } }),
            ],
          }),
          new TableCell({
            width: { size: DATE_W, type: WidthType.DXA },
            margins: NO_CELL_MARGINS,
            children: [
              para(run(rightText, { italics: true }), {
                alignment: AlignmentType.RIGHT,
                spacing: { after: 6, line: BODY_LINE, lineRule: BODY_RULE },
              }),
            ],
          }),
        ],
      }),
    ],
  });

// Project meta line (role | links), italic gray, sits under the title/date row
const metaLine = (text) =>
  para(run(text, { italics: true, size: 19, color: GRAY }), {
    spacing: { after: 12, line: BODY_LINE, lineRule: BODY_RULE },
  });

// Project description sentence (plain paragraph)
const descLine = (text) => para(run(text), { spacing: { after: 12, line: BODY_LINE, lineRule: BODY_RULE } });

// Tech stack line: bold "Stack:" lead-in + italic list; extra space after each project
const stackLine = (text) =>
  para([run("Stack: ", { bold: true }), run(text, { italics: true })], {
    spacing: { after: 30, line: BODY_LINE, lineRule: BODY_RULE },
  });

const children = [
  // ---------- Header ----------
  para(run("Yan Zhengkai", { bold: true, size: 40, color: ACCENT }), {
    alignment: AlignmentType.CENTER,
    spacing: { after: 8, line: 240 },
  }),
  para(run("AI Agent Engineer (Remote)", { size: 24 }), {
    alignment: AlignmentType.CENTER,
    spacing: { after: 8, line: 240 },
  }),
  para(
    run(T`+86 178-5729-4938 | zhengkaibys@163.com | github.com/zkbys | Portfolio: github.com/zkbys/PW`, {
      size: 19,
      color: GRAY,
    }),
    { alignment: AlignmentType.CENTER, spacing: { after: 30, line: 240 } },
  ),

  // ---------- Education ----------
  sectionHeading("Education"),
  lrRow(
    [run("Hangzhou Dianzi University", { bold: true }), run(T` — M.Eng. in Computer Technology`)],
    "Incoming, Sep 2026",
  ),
  lrRow(
    [run("NingboTech University", { bold: true }), run(T` — B.Eng. in Computer Science and Technology`)],
    T`Sep 2022 – Jun 2026`,
  ),
  bullet(run("GPA: 4.09/5.0 (Top 5% of major), multi-year scholarship recipient")),
  bullet(
    run("Core Coursework: Artificial Intelligence, Machine Learning, Deep Learning, Data Structures & Algorithms"),
  ),
  bullet(
    run(T`Research: covert multimodal backdoor attack research at NBT-AILAB; first-author paper submitted to ICME 2026 (CCF-B), with positive reviewer feedback (scores 5/4/3/3/2)`),
  ),

  // ---------- Project-based Collaboration ----------
  sectionHeading("Project-based Collaboration"),
  lrRow(
    [run("Wanliuliang Culture Media Co., Ltd.", { bold: true }), run(T` — AI Workflow Engineer (Project-based Contractor)`)],
    T`Jul 2026 – Present`,
  ),
  metaLine("Remote"),
  bullet(
    run(T`Partnered with the company on a project basis as an independent developer, designing and building AI agent workflows end-to-end for short-video content production; delivered two production-grade agent pipelines (Whiteboard Pipeline / Reverse Editing)`),
  ),

  // ---------- Featured Projects ----------
  sectionHeading("Featured Projects"),

  // --- 1. Whiteboard Pipeline ---
  lrRow(
    [run("Whiteboard Pipeline", { bold: true }), run(T` — AI Whiteboard Infographic Video Pipeline`)],
    "Jul 2026",
  ),
  metaLine(T`Solo Developer | github.com/zkbys/whiteboard (13 stars on GitHub)`),
  descLine(
    T`An end-to-end agent pipeline that turns a single topic into a 30–60s whiteboard explainer video, covering the full chain: script beats → infographic planning → model image generation → auto-calibration → animation control → voiceover/subtitles → QA acceptance.`,
  ),
  leadBullet(
    "Agent Skill Engineering: ",
    T`packaged the entire pipeline as an Agent Skill installable in one command by Claude Code / Codex, with install scripts and a doctor environment self-check tool, enabling agent-driven multi-stage orchestration`,
  ),
  leadBullet(
    "Multi-backend Auto-calibration: ",
    T`designed a four-level fallback calibration chain (Claude vision model → OpenAI-compatible VLM → local EasyOCR → deterministic mock) that detects the real positions of elements in generated images, fixing layout drift between model output and templates`,
  ),
  leadBullet(
    "Deterministic Delivery & Acceptance: ",
    T`local FFmpeg rendering with a validator script producing an integration report, making every run reproducible and verifiable`,
  ),
  stackLine("Python, Node.js, FFmpeg, edge-tts, HyperFrames, OpenAI API, EasyOCR"),

  // --- 2. Reverse Editing ---
  lrRow(
    [run("Reverse Editing", { bold: true }), run(T` — Reverse Video Deconstruction & Content Assetization`)],
    "Jul 2026",
  ),
  metaLine(T`Solo Developer | github.com/zkbys/reverse-editing`),
  descLine(
    T`A workflow that reverse-engineers benchmark short videos into an executable, editable, re-shootable production package: shot-deconstruction report, storyboard, shot list, word-level script/voiceover files, an openable Jianying (CapCut China) draft, and an internal preview MP4.`,
  ),
  leadBullet(
    "Six-stage Pipeline: ",
    T`AI shot-structure analysis → storyboard & shooting guidance → word-level timestamped script layer (VTT/SRT subtitles) → Tesseract OCR frame QC → scripted Jianying project assembly → deterministic FFmpeg preview rendering`,
  ),
  leadBullet(
    "Local-first Architecture: ",
    T`FFmpeg/ffprobe + Tesseract OCR run locally by default; AI video-generation and TTS APIs are opt-in extensions disabled by default, balancing cost and controllability`,
  ),
  stackLine("Python, FFmpeg, Tesseract OCR, jsonschema, Pillow, Jianying Pro scripting"),

  // ---------- Additional Projects ----------
  sectionHeading("Additional Projects"),
  para([
    run("Scrollish", { bold: true }),
    run(T` — dopamine-driven English-acquisition PWA (Co-Lead, team of 3; live at keyai.uno/scrollish): infinite scroll + immersive translation + AI contextual explanations, full-cycle Vibe Coding delivery with Qwen-powered voice cloning and adaptive leveling`),
  ]),
  para([
    run("Covert Multimodal Backdoor Attacks on Medical Vision-Language Models", { bold: true }),
    run(T` — First Author (NBT-AILAB, Jun 2024 – Sep 2025): PyTorch/MedCLIP federated-learning backdoor attack, 98% ASR and 0.998 SSIM; paper submitted to ICME 2026 (CCF-B, review scores 5/4/3/3/2)`),
  ]),
  para([
    run("Multimodal Intelligent Diagnosis System for Laryngeal Diseases", { bold: true }),
    run(T` — Technical Lead (with Ningbo Lihuili Hospital, Apr – Nov 2024): ResNet-50 + wav2vec 2.0 multimodal 4-class classifier, 80.75% diagnostic accuracy`),
  ]),
  para([
    run("PW", { bold: true }),
    run(T` — personal portfolio site (React + Vite + TypeScript + Tailwind) | github.com/zkbys/PW`),
  ]),

  // ---------- Skills ----------
  sectionHeading("Skills"),
  bullet([run("Programming Languages: ", { bold: true }), run("Python, Java, C/C++")]),
  bullet([
    run("AI Agent & AI Coding Tools: ", { bold: true }),
    run(T`agent workflow design, Agent Skill development (Claude Code / Codex), prompt engineering, multi-stage pipeline orchestration; proficient with Cursor, Antigravity and other AI-assisted coding tools`),
  ]),
  bullet([
    run("Deep Learning: ", { bold: true }),
    run(T`PyTorch (proficient), TensorFlow (familiar); Transformer architecture, model tuning, multimodal fusion`),
  ]),
  bullet([
    run("End-to-End AI Development: ", { bold: true }),
    run(T`full-cycle AI-assisted product delivery — UI design, front/back-end code generation, database setup, deployment and operations — able to independently ship complete applications`),
  ]),
  bullet([
    run("Developer Tools: ", { bold: true }),
    run("Git/GitHub, Linux, Jupyter Notebook, OpenCV, Conda, FFmpeg"),
  ]),

  // ---------- Honors ----------
  sectionHeading("Honors"),
  para(
    run(T`National Encouragement Scholarship · Zhejiang Provincial Government Scholarship · First-Class University Scholarship · Outstanding Student Leader`),
    { spacing: { after: 0, line: BODY_LINE, lineRule: BODY_RULE } },
  ),
];

const doc = new Document({
  features: { updateFields: false },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 520, bottom: 520, left: MARGIN, right: MARGIN },
        },
      },
      children,
    },
  ],
});

fs.writeFileSync(outputPath, await Packer.toBuffer(doc));
console.log("Wrote", outputPath);
