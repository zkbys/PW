import fs from "node:fs";
import path from "node:path";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  TabStopType,
  VerticalAlign,
  WidthType,
} from "docx";

const outputPath = process.argv[2];
if (!outputPath) {
  throw new Error("Usage: node create.js /absolute/path/output.docx");
}

const outputDir = path.dirname(outputPath);
fs.mkdirSync(outputDir, { recursive: true });

const T = String.raw;

// 单栏专业风格：克制的深色点缀（深石板蓝），无花哨配色
const ACCENT = "2F4656";
const font = { name: "Times New Roman", eastAsia: "SimSun" };

const run = (text, options = {}) =>
  new TextRun({
    text,
    font,
    size: 21, // 10.5pt
    ...options,
  });

const para = (children, options = {}) =>
  new Paragraph({
    spacing: { after: 30, line: 240 },
    ...options,
    children: Array.isArray(children) ? children : [children],
  });

// 分区标题：加粗 + 深石板蓝 + 细分隔线（下边框）
const sectionHeading = (text) =>
  para(run(text, { bold: true, size: 24, color: ACCENT }), {
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 160, after: 50 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, space: 1, color: ACCENT },
    },
  });

// 项目符号段落
const bullet = (children, options = {}) =>
  para(children, {
    bullet: { level: 0 },
    spacing: { after: 20, line: 240 },
    ...options,
  });

// 二级项目符号（核心工作子条目）
const subBullet = (children, options = {}) =>
  para(children, {
    bullet: { level: 1 },
    spacing: { after: 20, line: 240 },
    ...options,
  });

// 条目主行（左标题 + 右端日期，右对齐制表位）
const entryLine = (leftRuns, rightText) =>
  new Paragraph({
    spacing: { before: 60, after: 20, line: 240 },
    tabStops: [{ type: TabStopType.RIGHT, position: 9900 }],
    children: [
      ...(Array.isArray(leftRuns) ? leftRuns : [leftRuns]),
      ...(rightText ? [run("\t" + rightText)] : []),
    ],
  });

// 带加粗小标题的核心工作子条目，如「多后端自动校准：……」
const labeled = (label, text) => subBullet([
  run(label + "：", { bold: true }),
  run(text),
]);

// ===== 头部（无边框双栏：左文字 / 右证件照）=====
const photoData = fs.readFileSync(path.join(outputDir, "assets", "photo-yzk.png"));
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };

const headerTable = new Table({
  width: { size: 9910, type: WidthType.DXA },
  columnWidths: [7910, 2000],
  borders: {
    top: noBorder,
    bottom: noBorder,
    left: noBorder,
    right: noBorder,
    insideHorizontal: noBorder,
    insideVertical: noBorder,
  },
  rows: [
    new TableRow({
      children: [
        // 左栏：姓名 / 意向岗位 / 联系方式（左对齐）
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 0, bottom: 0, left: 0, right: 120 },
          children: [
            para(run(T`闫政凯`, { bold: true, size: 40, color: ACCENT }), {
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.LEFT,
              spacing: { after: 20 },
            }),
            para(run(T`意向岗位：AI Agent 工程师（远程）`, { bold: true, size: 22 }), {
              alignment: AlignmentType.LEFT,
              spacing: { after: 16 },
            }),
            para(
              run(T`电话：17857294938 ｜ 邮箱：zhengkaibys@163.com ｜ GitHub：github.com/zkbys ｜ 作品集：github.com/zkbys/PW`, { size: 20 }),
              { alignment: AlignmentType.LEFT, spacing: { after: 0 } },
            ),
          ],
        }),
        // 右栏：证件照（右对齐，3.0 cm 宽，3:4 比例）
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { after: 0 },
              children: [
                new ImageRun({
                  data: photoData,
                  transformation: { width: 113, height: 151 },
                  type: "png",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

const children = [
  // ===== 头部 =====
  headerTable,

  // ===== 教育背景 =====
  sectionHeading(T`教育背景`),
  entryLine(
    [run(T`杭州电子科技大学`, { bold: true }), run(T` — 计算机技术 硕士`)],
    T`（2026.09 入学）`,
  ),
  entryLine(
    [run(T`浙大宁波理工学院`, { bold: true }), run(T` — 计算机科学与技术 本科`)],
    T`2022.09 – 2026.06`,
  ),
  bullet([run(T`综合成绩：`, { bold: true }), run(T`GPA 4.09/5.0，专业排名前 5%，连续多年获得奖学金`)]),
  bullet([run(T`核心课程：`, { bold: true }), run(T`人工智能、机器学习、深度学习、数据结构与算法`)]),
  bullet([run(T`科研经历：`, { bold: true }), run(T`在 NBT-AILAB 从事医学多模态隐蔽式后门攻击算法研究，相关论文以第一作者身份投稿至 CCF B 类会议 ICME 2026，获审稿人积极反馈（评分 5/4/3/3/2）`)]),

  // ===== 项目合作经历 =====
  sectionHeading(T`项目合作经历`),
  entryLine(
    [run(T`顽流量文化传媒有限公司`, { bold: true }), run(T` — AI 工作流开发工程师（项目制合作）｜ 远程`)],
    T`2026.07 – 至今`,
  ),
  bullet(run(T`以独立开发者身份与公司按项目制合作，负责短视频内容生产的 AI Agent 工作流设计与端到端开发，交付两套生产级 Agent 流水线（Whiteboard Pipeline / Reverse Editing）`)),

  // ===== 重点项目 =====
  sectionHeading(T`重点项目`),

  // --- 项目 1：Whiteboard Pipeline ---
  entryLine(
    [run(T`Whiteboard Pipeline`, { bold: true }), run(T` — AI 白板信息图视频流水线 ｜ 独立开发 ｜ github.com/zkbys/whiteboard（GitHub 13 stars）`)],
    T`2026.07`,
  ),
  bullet([run(T`项目描述：`, { bold: true }), run(T`输入一个主题，自动产出 30–60 秒白板信息图讲解视频的端到端 Agent 流水线，覆盖「文案节拍 → 信息图规划 → 模型生图 → 自动校准 → 动画控制 → 配音字幕 → QA 验收」全流程。`)]),
  bullet(run(T`核心工作：`, { bold: true })),
  labeled(T`Agent Skill 工程化`, T`将整条流水线封装为 Claude Code / Codex 可一键安装的 Agent Skill，配套 install 安装脚本与 doctor 环境自检工具，实现 Agent 驱动的多阶段编排`),
  labeled(T`多后端自动校准`, T`设计「Claude 视觉模型 → OpenAI 兼容 VLM → 本地 EasyOCR → 确定性 mock」四级兜底校准机制，自动检测生成图片中元素的真实位置，解决模型生图与模板布局的漂移问题`),
  labeled(T`确定性交付与验收`, T`FFmpeg 本地渲染，配套验收器脚本产出 integration_report，保证每次运行结果可复现、可验收`),
  bullet([run(T`技术栈：`, { bold: true }), run(T`Python、Node.js、FFmpeg、edge-tts、HyperFrames、OpenAI API、EasyOCR`)]),

  // --- 项目 2：Reverse Editing ---
  entryLine(
    [run(T`Reverse Editing`, { bold: true }), run(T` — 逆向视频拆解与内容资产化 ｜ 独立开发 ｜ github.com/zkbys/reverse-editing`)],
    T`2026.07`,
  ),
  bullet([run(T`项目描述：`, { bold: true }), run(T`对标短视频逆向拆解工作流，将一条参考视频转化为可执行、可修改、可复拍的完整制作方案，产出镜头拆解报告、故事板、拍摄清单、词级文案/配音脚本、可直接打开的剪映草稿与内部预览 MP4。`)]),
  bullet(run(T`核心工作：`, { bold: true })),
  labeled(T`六阶段流水线`, T`AI 镜头结构分析 → 故事板与拍摄指导 → 词级时间戳文案层（VTT/SRT 字幕）→ Tesseract OCR 抽帧 QC → 剪映工程脚本化组装 → FFmpeg 确定性渲染预览`),
  labeled(T`本地优先架构`, T`FFmpeg/ffprobe + Tesseract OCR 默认本地处理；AI 视频生成、TTS 等 API 设计为可选扩展且默认关闭，兼顾成本与可控性`),
  bullet([run(T`技术栈：`, { bold: true }), run(T`Python、FFmpeg、Tesseract OCR、jsonschema、Pillow、剪映专业版脚本化`)]),

  // ===== 其他项目 =====
  sectionHeading(T`其他项目`),
  bullet([
    run(T`Scrollish`, { bold: true }),
    run(T` — 多巴胺英语习得 PWA 应用（联合负责人，3 人团队，已上线 keyai.uno/scrollish）：无限流 + 沉浸翻译 + AI 语境解析，全流程 Vibe Coding 驱动，接入 Qwen 大模型实现语音复刻、自适应分级等功能`),
  ]),
  bullet([
    run(T`医学多模态隐蔽式后门攻击算法研究`, { bold: true }),
    run(T` — 第一作者（NBT-AILAB，2024.06 – 2025.09）：基于 PyTorch/MedCLIP 的联邦学习多模态后门攻击，ASR 98%、SSIM 0.998，论文投稿 ICME 2026（CCF B 类，审稿评分 5/4/3/3/2）`),
  ]),
  bullet([
    run(T`咽喉疾病多模态智能诊断系统`, { bold: true }),
    run(T` — 技术负责人（与宁波市李惠利医院合作，2024.04 – 2024.11）：ResNet-50 + wav2vec 2.0 多模态四分类模型，诊断准确率 80.75%`),
  ]),
  bullet([
    run(T`PW`, { bold: true }),
    run(T` — 个人作品集网站（React + Vite + TypeScript + Tailwind）｜ github.com/zkbys/PW`),
  ]),

  // ===== 技术能力 =====
  sectionHeading(T`技术能力`),
  bullet([run(T`编程语言：`, { bold: true }), run(T`Python、Java、C/C++`)]),
  bullet([run(T`AI Agent 与编程工具：`, { bold: true }), run(T`Agent 工作流设计、Agent Skill 开发（Claude Code / Codex）、提示工程（Prompt Engineering）、多阶段流水线编排；熟练使用 Cursor、Antigravity 等 AI 辅助编程工具`)]),
  bullet([run(T`深度学习：`, { bold: true }), run(T`熟练掌握 PyTorch，了解 TensorFlow；熟悉 Transformer 架构、模型调优与多模态融合技术`)]),
  bullet([run(T`一站式 AI 开发：`, { bold: true }), run(T`熟悉从产品想法到上线的全流程 AI 构建，能利用 AI 工具完成 UI 设计、前后端代码生成、数据库搭建与部署运维，具备独立交付完整应用的能力`)]),
  bullet([run(T`开发工具：`, { bold: true }), run(T`Git/GitHub、Linux、Jupyter Notebook、OpenCV、Conda、FFmpeg`)]),

  // ===== 荣誉奖项 =====
  sectionHeading(T`荣誉奖项`),
  para(run(T`国家励志奖学金、浙江省政府奖学金、校级一等奖学金、优秀学生干部`), {
    spacing: { after: 40 },
  }),

  // ===== 自我评价 =====
  sectionHeading(T`自我评价`),
  para(run(T`热爱团队协作，对人工智能领域充满热情，密切关注 AI 新技术与产品动态；学院足球队主力队员，多次参与校际比赛并获冠亚军。`), {
    spacing: { after: 0 },
  }),
];

const doc = new Document({
  features: { updateFields: false },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 800,
            bottom: 800,
            left: 1000,
            right: 1000,
          },
        },
      },
      children,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outputPath, buffer);
console.log("written:", outputPath);
