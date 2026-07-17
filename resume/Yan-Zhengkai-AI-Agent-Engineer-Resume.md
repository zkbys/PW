# Yan Zhengkai

**AI Agent Engineer (Remote)**

+86 178-5729-4938 | zhengkaibys@163.com | github.com/zkbys | Portfolio: github.com/zkbys/PW

---

## Education

**Hangzhou Dianzi University** — M.Eng. in Computer Technology | *Incoming, Sep 2026*

**NingboTech University** — B.Eng. in Computer Science and Technology | *Sep 2022 – Jun 2026*

- GPA: 4.09/5.0 (Top 5% of major), multi-year scholarship recipient
- Core Coursework: Artificial Intelligence, Machine Learning, Deep Learning, Data Structures & Algorithms
- Research: covert multimodal backdoor attack research at NBT-AILAB; first-author paper submitted to ICME 2026 (CCF-B), with positive reviewer feedback (scores 5/4/3/3/2)

## Project-based Collaboration

**Wanliuliang Culture Media Co., Ltd.** — AI Workflow Engineer (Project-based Contractor) | Remote | *Jul 2026 – Present*

- Partnered with the company on a project basis as an independent developer, designing and building AI agent workflows end-to-end for short-video content production; delivered two production-grade agent pipelines (Whiteboard Pipeline / Reverse Editing)

## Featured Projects

### 1. Whiteboard Pipeline — AI Whiteboard Infographic Video Pipeline

*Solo Developer | Jul 2026 | github.com/zkbys/whiteboard (13 stars on GitHub)*

An end-to-end agent pipeline that turns a single topic into a 30–60s whiteboard explainer video, covering the full chain: script beats → infographic planning → model image generation → auto-calibration → animation control → voiceover/subtitles → QA acceptance.

**Core Work:**

- **Agent Skill Engineering:** packaged the entire pipeline as an Agent Skill installable in one command by Claude Code / Codex, with install scripts and a doctor environment self-check tool, enabling agent-driven multi-stage orchestration
- **Multi-backend Auto-calibration:** designed a four-level fallback calibration chain (Claude vision model → OpenAI-compatible VLM → local EasyOCR → deterministic mock) that detects the real positions of elements in generated images, fixing layout drift between model output and templates
- **Deterministic Delivery & Acceptance:** local FFmpeg rendering with a validator script producing an integration report, making every run reproducible and verifiable

**Stack:** Python, Node.js, FFmpeg, edge-tts, HyperFrames, OpenAI API, EasyOCR

### 2. Reverse Editing — Reverse Video Deconstruction & Content Assetization

*Solo Developer | Jul 2026 | github.com/zkbys/reverse-editing*

A workflow that reverse-engineers benchmark short videos into an executable, editable, re-shootable production package: shot-deconstruction report, storyboard, shot list, word-level script/voiceover files, an openable Jianying (CapCut China) draft, and an internal preview MP4.

**Core Work:**

- **Six-stage Pipeline:** AI shot-structure analysis → storyboard & shooting guidance → word-level timestamped script layer (VTT/SRT subtitles) → Tesseract OCR frame QC → scripted Jianying project assembly → deterministic FFmpeg preview rendering
- **Local-first Architecture:** FFmpeg/ffprobe + Tesseract OCR run locally by default; AI video-generation and TTS APIs are opt-in extensions disabled by default, balancing cost and controllability

**Stack:** Python, FFmpeg, Tesseract OCR, jsonschema, Pillow, Jianying Pro scripting

## Additional Projects

- **Scrollish** — dopamine-driven English-acquisition PWA (Co-Lead, team of 3; live at keyai.uno/scrollish): infinite scroll + immersive translation + AI contextual explanations, full-cycle Vibe Coding delivery with Qwen-powered voice cloning and adaptive leveling
- **Covert Multimodal Backdoor Attacks on Medical Vision-Language Models** — First Author (NBT-AILAB, Jun 2024 – Sep 2025): PyTorch/MedCLIP federated-learning backdoor attack, 98% ASR and 0.998 SSIM; paper submitted to ICME 2026 (CCF-B, review scores 5/4/3/3/2)
- **Multimodal Intelligent Diagnosis System for Laryngeal Diseases** — Technical Lead (with Ningbo Lihuili Hospital, Apr – Nov 2024): ResNet-50 + wav2vec 2.0 multimodal 4-class classifier, 80.75% diagnostic accuracy
- **PW** — personal portfolio site (React + Vite + TypeScript + Tailwind) | github.com/zkbys/PW

## Skills

- **Programming Languages:** Python, Java, C/C++
- **AI Agent & AI Coding Tools:** agent workflow design, Agent Skill development (Claude Code / Codex), prompt engineering, multi-stage pipeline orchestration; proficient with Cursor, Antigravity and other AI-assisted coding tools
- **Deep Learning:** PyTorch (proficient), TensorFlow (familiar); Transformer architecture, model tuning, multimodal fusion
- **End-to-End AI Development:** full-cycle AI-assisted product delivery — UI design, front/back-end code generation, database setup, deployment and operations — able to independently ship complete applications
- **Developer Tools:** Git/GitHub, Linux, Jupyter Notebook, OpenCV, Conda, FFmpeg

## Honors

National Encouragement Scholarship · Zhejiang Provincial Government Scholarship · First-Class University Scholarship · Outstanding Student Leader
