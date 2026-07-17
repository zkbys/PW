# 闫政凯

**意向岗位：AI Agent 工程师（远程）**

电话：17857294938 ｜ 邮箱：zhengkaibys@163.com ｜ GitHub：github.com/zkbys ｜ 作品集：github.com/zkbys/PW

---

## 教育背景

**杭州电子科技大学** — 计算机技术 硕士（2026.09 入学）

**浙大宁波理工学院** — 计算机科学与技术 本科 ｜ 2022.09 – 2026.06

- **综合成绩**：GPA 4.09/5.0，专业排名前 5%，连续多年获得奖学金
- **核心课程**：人工智能、机器学习、深度学习、数据结构与算法
- **科研经历**：在 NBT-AILAB 从事医学多模态隐蔽式后门攻击算法研究，相关论文以第一作者身份投稿至 CCF B 类会议 ICME 2026，获审稿人积极反馈（评分 5/4/3/3/2）

---

## 项目合作经历

**顽流量文化传媒有限公司** — AI 工作流开发工程师（项目制合作）｜ 远程 ｜ 2026.07 – 至今

- 以独立开发者身份与公司按项目制合作，负责短视频内容生产的 AI Agent 工作流设计与端到端开发，交付两套生产级 Agent 流水线（Whiteboard Pipeline / Reverse Editing）

---

## 重点项目

### 1. Whiteboard Pipeline — AI 白板信息图视频流水线 ｜ 独立开发 ｜ 2026.07 ｜ github.com/zkbys/whiteboard（GitHub 13 stars）

**项目描述**：输入一个主题，自动产出 30–60 秒白板信息图讲解视频的端到端 Agent 流水线，覆盖「文案节拍 → 信息图规划 → 模型生图 → 自动校准 → 动画控制 → 配音字幕 → QA 验收」全流程。

**核心工作**：

- **Agent Skill 工程化**：将整条流水线封装为 Claude Code / Codex 可一键安装的 Agent Skill，配套 install 安装脚本与 doctor 环境自检工具，实现 Agent 驱动的多阶段编排
- **多后端自动校准**：设计「Claude 视觉模型 → OpenAI 兼容 VLM → 本地 EasyOCR → 确定性 mock」四级兜底校准机制，自动检测生成图片中元素的真实位置，解决模型生图与模板布局的漂移问题
- **确定性交付与验收**：FFmpeg 本地渲染，配套验收器脚本产出 integration_report，保证每次运行结果可复现、可验收

**技术栈**：Python、Node.js、FFmpeg、edge-tts、HyperFrames、OpenAI API、EasyOCR

### 2. Reverse Editing — 逆向视频拆解与内容资产化 ｜ 独立开发 ｜ 2026.07 ｜ github.com/zkbys/reverse-editing

**项目描述**：对标短视频逆向拆解工作流，将一条参考视频转化为可执行、可修改、可复拍的完整制作方案，产出镜头拆解报告、故事板、拍摄清单、词级文案/配音脚本、可直接打开的剪映草稿与内部预览 MP4。

**核心工作**：

- **六阶段流水线**：AI 镜头结构分析 → 故事板与拍摄指导 → 词级时间戳文案层（VTT/SRT 字幕）→ Tesseract OCR 抽帧 QC → 剪映工程脚本化组装 → FFmpeg 确定性渲染预览
- **本地优先架构**：FFmpeg/ffprobe + Tesseract OCR 默认本地处理；AI 视频生成、TTS 等 API 设计为可选扩展且默认关闭，兼顾成本与可控性

**技术栈**：Python、FFmpeg、Tesseract OCR、jsonschema、Pillow、剪映专业版脚本化

---

## 其他项目

- **Scrollish** — 多巴胺英语习得 PWA 应用（联合负责人，3 人团队，已上线 keyai.uno/scrollish）：无限流 + 沉浸翻译 + AI 语境解析，全流程 Vibe Coding 驱动，接入 Qwen 大模型实现语音复刻、自适应分级等功能
- **医学多模态隐蔽式后门攻击算法研究** — 第一作者（NBT-AILAB，2024.06 – 2025.09）：基于 PyTorch/MedCLIP 的联邦学习多模态后门攻击，ASR 98%、SSIM 0.998，论文投稿 ICME 2026（CCF B 类，审稿评分 5/4/3/3/2）
- **咽喉疾病多模态智能诊断系统** — 技术负责人（与宁波市李惠利医院合作，2024.04 – 2024.11）：ResNet-50 + wav2vec 2.0 多模态四分类模型，诊断准确率 80.75%
- **PW** — 个人作品集网站（React + Vite + TypeScript + Tailwind）｜ github.com/zkbys/PW

---

## 技术能力

- **编程语言**：Python、Java、C/C++
- **AI Agent 与编程工具**：Agent 工作流设计、Agent Skill 开发（Claude Code / Codex）、提示工程（Prompt Engineering）、多阶段流水线编排；熟练使用 Cursor、Antigravity 等 AI 辅助编程工具
- **深度学习**：熟练掌握 PyTorch，了解 TensorFlow；熟悉 Transformer 架构、模型调优与多模态融合技术
- **一站式 AI 开发**：熟悉从产品想法到上线的全流程 AI 构建，能利用 AI 工具完成 UI 设计、前后端代码生成、数据库搭建与部署运维，具备独立交付完整应用的能力
- **开发工具**：Git/GitHub、Linux、Jupyter Notebook、OpenCV、Conda、FFmpeg

---

## 荣誉奖项

国家励志奖学金、浙江省政府奖学金、校级一等奖学金、优秀学生干部

---

## 自我评价

热爱团队协作，对人工智能领域充满热情，密切关注 AI 新技术与产品动态；学院足球队主力队员，多次参与校际比赛并获冠亚军。
