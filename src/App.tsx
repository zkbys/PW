import {
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  Github,
  Languages,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useMemo, useRef, useState, type CSSProperties } from 'react';

const cream = '#E1E0CC';
const easeOut = [0.16, 1, 0.3, 1] as const;
const cardEase = [0.22, 1, 0.36, 1] as const;

const heroVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

const canvasVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4';

const projectIcons = [
  'https://placehold.co/200x200/E1E0CC/1a1a1a?text=WB',
  'https://placehold.co/200x200/E1E0CC/1a1a1a?text=RE',
  'https://placehold.co/200x200/E1E0CC/1a1a1a?text=PW',
  'https://placehold.co/200x200/E1E0CC/1a1a1a?text=SC',
  'https://placehold.co/200x200/E1E0CC/1a1a1a?text=MS',
];

const whiteboardDemoVideo = 'https://github.com/zkbys/whiteboard/releases/download/v0.2.0/preview.mp4';

const reverseEditingDemoVideo = 'https://github.com/zkbys/reverse-editing/releases/download/v0.1.0/xiaopipi_glasses_internal_previs_20260710.mp4';

type Locale = 'zh' | 'en';
type DemoMode = 'career' | 'creator';

type StyledSegment = {
  text: string;
  className?: string;
};

type ProjectCopy = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  items: string[];
  repo: string;
  icon: string;
};

type CurrentFocusCopy = {
  label: string;
  status: string;
  title: string;
  body: string;
};

type CaseStudyCopy = {
  label: string;
  title: string;
  summary: string;
  videoCaption?: string;
  socialProof?: string;
  socialLinks?: Array<{ label: string; url: string }>;
  imageSrc?: string;
  imageCaption?: string;
  pillars: Array<{ label: string; title: string; body: string }>;
  flowLabel: string;
  flow: string[];
};

const modeLabels: Record<Locale, Record<DemoMode, string>> = {
  zh: {
    career: 'A 求职',
    creator: 'B 创作者',
  },
  en: {
    career: 'A Career',
    creator: 'B Creator',
  },
};

const contactLinks = {
  github: 'https://github.com/zkbys',
  email: 'mailto:zhengkaibys@163.com',
  wechat: '_ZKbys_',
  phone: 'tel:17857294938',
};

const copy: Record<
  DemoMode,
  Record<
    Locale,
    {
      nav: Array<{ label: string; href: string }>;
      heroKicker: string;
      heroIntro: string;
      heroStatus: string;
      primaryCta: string;
      resumeCta: string;
      githubCta: string;
      aboutLabel: string;
      aboutHeading: StyledSegment[];
      aboutBody: string;
      timelineTitle: string;
      timeline: Array<{ label: string; title: string; body: string }>;
      methodTitle: string;
      methods: string[];
      currentFocus: CurrentFocusCopy;
      featuresHeading: StyledSegment[];
      videoCard: string;
      projects: ProjectCopy[];
      caseStudy: CaseStudyCopy;
      caseStudy02: CaseStudyCopy;
      githubLabel: string;
      demoSoon: string;
      videoSoon: string;
      contactTitle: string;
      contactBody: string;
      contactItems: Array<{ label: string; value: string; kind: 'email' | 'wechat' | 'phone' | 'github' | 'resume' }>;
    }
  >
> = {
  career: {
    zh: {
      nav: [
        { label: '关于', href: '#about' },
        { label: '作品', href: '#portfolio' },
        { label: '经历', href: '#timeline' },
        { label: '联系', href: '#contact' },
      ],
      heroKicker: 'AI Creator / Product Builder / Agent Workflow Designer',
      heroIntro:
        '我是 ZKbys，一个 AI 产品与 Agent 工作流构建者。我擅长把模糊想法拆解成可运行 Demo、可复用流程和可展示作品，关注 AI 如何真正进入产品、内容和创作生产。',
      heroStatus: 'Open to AI product, agent workflow and creative technology opportunities.',
      primaryCta: '联系我',
      resumeCta: '简历待补',
      githubCta: 'GitHub',
      aboutLabel: 'AI portfolio',
      aboutHeading: [
        { text: '我是 ZKbys，', className: 'font-normal' },
        { text: 'turning AI ideas into working systems.', className: 'font-serif italic' },
        { text: '把产品、Agent 流程和内容自动化做成可体验的作品。', className: 'font-normal' },
      ],
      aboutBody:
        '我喜欢做介于产品、工程和创作之间的东西。对我来说，AI 不只是聊天工具，而是一套新的生产方式：它可以参与需求拆解、信息组织、内容生成、流程自动化、界面原型和质量检查。这个作品集会持续记录这些实验如何从想法变成真实系统。',
      timelineTitle: '代表性经历时间线',
      timeline: [
        {
          label: '2026',
          title: 'AI 白板视频流水线',
          body: '把脚本、分镜、素材、音频、镜头、渲染和 QA 拆成可审核模块，强调人机协同和验收标准。',
        },
        {
          label: '2026',
          title: '英语习得与内容产品实验',
          body: '围绕 Reddit、双语内容、小红书卡片和 PWA 体验，探索 AI 驱动的内容消费与学习转化。',
        },
        {
          label: 'Now',
          title: '能解决的问题',
          body: '适合参与 AI 产品早期原型、Agent 工作流设计、内容自动化管线和创意技术系统搭建。',
        },
      ],
      methodTitle: '我能解决什么问题',
      methods: ['AI 想法转 Demo', 'Agent 工作流设计', '内容自动化管线'],
      currentFocus: {
        label: 'Currently / 最近在做',
        status: '持续迭代中',
        title: '把 Agent 工作流做得更像产品',
        body: '目前持续完善 AI 白板视频流水线，重点处理模块协作、人工审核、质量验收和可复用交付；同时把这些方法迁移到新的 AI 产品原型中。',
      },
      featuresHeading: [
        { text: '以项目证明能力，', className: 'text-primary' },
        { text: '以流程展示可交付性。', className: 'text-gray-500' },
      ],
      videoCard: 'Portfolio first. Built for serious hiring conversations.',
      projects: [
        {
          number: '01',
          title: 'Whiteboard Pipeline.',
          eyebrow: 'Agent workflow / video pipeline',
          description: '一个可审核的 AI 白板信息图视频流水线。它不是一次性生成 MP4，而是把脚本、分镜、素材、音频、镜头、渲染和 QA 拆成清晰模块。',
          items: ['Agent 工作流设计', '多模块生产管线', '人工审核与验收标准'],
          repo: 'https://github.com/zkbys/whiteboard',
          icon: projectIcons[0],
        },
        {
          number: '02',
          title: 'Reverse Editing.',
          eyebrow: 'Account-level video / reverse workflow',
          description: '一套逆向剪辑工程，把已有爆款视频还原成可复用的账号资产：镜头索引、逆向时间线、拍摄分镜和可替换文案层。',
          items: ['账号内容资产化', '逆向工程拆解', '可替换的模板化生产'],
          repo: 'https://github.com/zkbys/reverse-editing',
          icon: projectIcons[2],
        },
        {
          number: '03',
          title: 'PW.',
          eyebrow: 'Personal portfolio / frontend system',
          description: '你现在看到的个人网站，基于 React + Vite + Tailwind CSS + Framer Motion，作为 AI 产品能力的活简历。',
          items: ['组件化视觉系统', 'A/B 与中英文切换', '响应式与动效'],
          repo: 'https://github.com/zkbys/PW',
          icon: projectIcons[3],
        },
        {
          number: '04',
          title: 'Scrollish.',
          eyebrow: 'AI product / PWA learning',
          description: '一个面向英语习得的 PWA 产品实验。它把“刷内容”的习惯迁移到真实英文互联网内容中，用 AI 查词、翻译和追问降低英文阅读门槛。',
          items: ['AI 产品设计', '用户习惯迁移', '学习场景产品化'],
          repo: 'https://github.com/zkbys/Scrollish',
          icon: projectIcons[1],
        },
        {
          number: '05',
          title: 'MSBA.',
          eyebrow: 'AI security / MedCLIP research',
          description: '医学视觉-语言模型的后门攻击与防御研究。在联邦学习场景下探索后门注入、模型评估与 Grad-CAM 可解释性分析。',
          items: ['AI 安全研究', '联邦学习', '模型可解释性'],
          repo: 'https://github.com/zkbys/MSBA',
          icon: projectIcons[4],
        },
      ],
      caseStudy: {
        label: 'Featured case study / 01',
        title: 'Whiteboard Pipeline',
        summary: '一句话输入主题，AI 就能自动生成一条完整的白板信息图讲解视频。这不是简单的"一键生成"，而是一个每一步都可检查、可修改的 Agent 工作流。',
        videoCaption: '右侧的这条视频（0:43），就是我只输入了一个主题后自动生成的。你看到的画面、文字、动画节奏，都是 AI 按照设定流程完成的。',
        socialProof: '这个技能还在抖音、视频号、小红书获得了大量关注，累计播放量近两万，互动近千。很多人对"一句话生成视频"很感兴趣。',
        socialLinks: [
          { label: '抖音', url: 'https://v.douyin.com/vDn8YALrMT8/' },
          { label: '视频号', url: 'https://weixin.qq.com/sph/AjpOy1aGPG' },
          { label: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/6a54b31a000000002101958f?source=webshare&xhsshare=pc_web&xsec_token=ABJe3ofgM3Ex2kyH6_-LliGOx7tz5soyJABqSjPmmWR6E=&xsec_source=pc_share' },
        ],
        pillars: [
          {
            label: '问题',
            title: '传统 AI 视频 = 开盲盒',
            body: '输入主题 → 等待 → 得到一个成品。如果结果不满意，只能全部重来，无法知道哪里出了问题。',
          },
          {
            label: '方案',
            title: '把过程拆成 5 个可检查的步骤',
            body: '每个步骤都保留中间产物，可以单独修改、回退。就像给 AI 配了一个有质检的生产流水线。',
          },
          {
            label: '结果',
            title: '一句话就能出片，还能精准修改',
            body: '右侧视频就是只输入了一个主题后生成的。任何一个环节不满意，都可以精准修改，不用从头再来。',
          },
        ],
        flowLabel: '处理流程',
        flow: ['输入主题', '生成内容', '制作画面', '合成视频', '检查质量'],
      },
      caseStudy02: {
        label: 'Featured case study / 02',
        title: 'Reverse Editing',
        summary: '上传一条你觉得拍得好的短视频，AI 帮你拆解它的镜头结构、文案节奏和信任逻辑，输出一套完整的制作方案——包括拍摄清单、故事板、可编辑字幕/配音脚本，以及一个剪映可打开的预演工程。',
        videoCaption: '右侧的这条视频，就是我只输入了一条眼镜店对标视频和门店信息后，AI 自动生成的制作方案预览。你看到的 17 个镜头、每段文案、每个转场节奏，都是 AI 逆向拆解并重新组装的结果。',
        imageSrc: '/capcut-screenshot.png',
        imageCaption: '逆向拆解后生成的剪映预演工程草稿',
        pillars: [
          {
            label: '问题',
            title: '想做视频但不知道怎么拍',
            body: '看了无数爆款视频，拍的时候还是不知道第一个镜头怎么摆。文案、节奏、镜头衔接全是黑盒。',
          },
          {
            label: '方案',
            title: '逆向拆解对标视频的结构',
            body: '把对标视频喂给 AI，它自动拆解出镜头类型、时长、文案节奏和信任逻辑。每个镜头都变成可执行、可替换的模块。',
          },
          {
            label: '结果',
            title: '从"想学"到"能拍"只需要一条对标视频',
            body: '64 秒的眼镜店视频，逆向拆解成 17 个镜头，自动生成故事板、拍摄清单、配音脚本和剪映预演工程。',
          },
        ],
        flowLabel: '处理流程',
        flow: ['输入对标视频', '逆向拆解结构', '生成故事板', '组装内容层', '导出剪映工程'],
      },
      githubLabel: '查看 GitHub',
      demoSoon: 'Demo 待补',
      videoSoon: '视频待补',
      contactTitle: '联系与下一步',
      contactBody: '如果你正在做 AI 产品、内容自动化或 Agent 工作流，我很适合参与早期原型和系统搭建。可以通过邮箱、微信或电话联系我。',
      contactItems: [
        { label: '邮箱', value: 'zhengkaibys@163.com', kind: 'email' },
        { label: '微信', value: '_ZKbys_', kind: 'wechat' },
        { label: '电话', value: '17857294938', kind: 'phone' },
        { label: 'GitHub', value: 'github.com/zkbys', kind: 'github' },
        { label: '简历', value: 'PDF 待补', kind: 'resume' },
      ],
    },
    en: {
      nav: [
        { label: 'About', href: '#about' },
        { label: 'Work', href: '#portfolio' },
        { label: 'Timeline', href: '#timeline' },
        { label: 'Contact', href: '#contact' },
      ],
      heroKicker: 'AI Creator / Product Builder / Agent Workflow Designer',
      heroIntro:
        'I am ZKbys, an AI product and agent workflow builder. I turn early ideas into runnable demos, reusable workflows, and visible artifacts across product, content, and creative systems.',
      heroStatus: 'Open to AI product, agent workflow and creative technology opportunities.',
      primaryCta: 'Contact me',
      resumeCta: 'Resume soon',
      githubCta: 'GitHub',
      aboutLabel: 'AI portfolio',
      aboutHeading: [
        { text: 'I am ZKbys,', className: 'font-normal' },
        { text: 'turning AI ideas into working systems.', className: 'font-serif italic' },
        { text: 'I build product experiments, agent flows, and content automation into usable artifacts.', className: 'font-normal' },
      ],
      aboutBody:
        'I build at the intersection of product, engineering, and creation. To me, AI is not just a chat interface, but a new production layer for framing problems, organizing information, generating content, automating workflows, prototyping interfaces, and checking quality.',
      timelineTitle: 'Representative timeline',
      timeline: [
        {
          label: '2026',
          title: 'AI whiteboard video pipeline',
          body: 'Separated script, planning, assets, audio, camera, rendering, and QA into reviewable modules with clear acceptance gates.',
        },
        {
          label: '2026',
          title: 'English acquisition and content products',
          body: 'Explored Reddit-based learning, bilingual cards, XiaoHongShu content formats, and PWA interaction patterns.',
        },
        {
          label: 'Now',
          title: 'Problems I can help with',
          body: 'A fit for early AI product prototypes, agent workflow design, content automation pipelines, and creative technology systems.',
        },
      ],
      methodTitle: 'What I can solve',
      methods: ['AI ideas to demos', 'Agent workflow design', 'Content automation pipelines'],
      currentFocus: {
        label: 'Currently',
        status: 'In active iteration',
        title: 'Making agent workflows behave more like products',
        body: 'I am refining the AI whiteboard video pipeline around modular collaboration, human review, quality gates, and reusable delivery, then carrying those patterns into new AI product prototypes.',
      },
      featuresHeading: [
        { text: 'Project proof for AI work.', className: 'text-primary' },
        { text: 'Readable systems, reviewable outcomes.', className: 'text-gray-500' },
      ],
      videoCard: 'Portfolio first. Built for serious hiring conversations.',
      projects: [
        {
          number: '01',
          title: 'Whiteboard Pipeline.',
          eyebrow: 'Agent workflow / video pipeline',
          description:
            'A reviewable AI whiteboard infographic video pipeline. Instead of one-shot MP4 generation, it separates script, boards, assets, audio, camera, rendering, and QA into clear modules.',
          items: ['Agent workflow design', 'Multi-module production pipeline', 'Human review and acceptance gates'],
          repo: 'https://github.com/zkbys/whiteboard',
          icon: projectIcons[0],
        },
        {
          number: '02',
          title: 'Reverse Editing.',
          eyebrow: 'Account-level video / reverse workflow',
          description:
            'A reverse editing system that turns proven videos into reusable account assets: shot indices, reverse timelines, shooting boards, and replaceable copy layers.',
          items: ['Account content assetization', 'Reverse engineering decomposition', 'Replaceable templated production'],
          repo: 'https://github.com/zkbys/reverse-editing',
          icon: projectIcons[2],
        },
        {
          number: '03',
          title: 'PW.',
          eyebrow: 'Personal portfolio / frontend system',
          description:
            'The personal website you are viewing, built with React, Vite, Tailwind CSS, and Framer Motion, serving as a living CV for AI product work.',
          items: ['Component-based visual system', 'A/B and bilingual switching', 'Responsive and motion design'],
          repo: 'https://github.com/zkbys/PW',
          icon: projectIcons[3],
        },
        {
          number: '04',
          title: 'Scrollish.',
          eyebrow: 'AI product / PWA learning',
          description:
            'A PWA experiment for English acquisition. It redirects the habit of scrolling toward authentic English internet content, using AI lookup, translation, and follow-up to lower the reading barrier.',
          items: ['AI product design', 'Habit migration', 'Learning scenario productization'],
          repo: 'https://github.com/zkbys/Scrollish',
          icon: projectIcons[1],
        },
        {
          number: '05',
          title: 'MSBA.',
          eyebrow: 'AI security / MedCLIP research',
          description:
            'Backdoor attacks and defenses in Medical Vision-Language Models (MedCLIP). Includes federated learning, backdoor injection, model evaluation, and Grad-CAM explainability analysis.',
          items: ['AI security research', 'Federated learning', 'Model explainability'],
          repo: 'https://github.com/zkbys/MSBA',
          icon: projectIcons[4],
        },
      ],
      caseStudy: {
        label: 'Featured case study / 01',
        title: 'Whiteboard Pipeline',
        summary: 'Type one topic, and AI generates a complete whiteboard infographic explainer video. This is not just "one-click generation"—it is a production pipeline where every step is reviewable and editable.',
        videoCaption: 'The video on the right (0:43) was generated from a single topic input. Every scene, text, and animation was produced by AI following a structured workflow.',
        socialProof: 'This skill also gained significant attention on Douyin, WeChat Channels, and Xiaohongshu, with nearly 20,000 views and ~1,000 interactions. Many people are interested in the idea of "one sentence, one video".',
        socialLinks: [
          { label: 'Douyin', url: 'https://v.douyin.com/vDn8YALrMT8/' },
          { label: 'WeChat', url: 'https://weixin.qq.com/sph/AjpOy1aGPG' },
          { label: 'Xiaohongshu', url: 'https://www.xiaohongshu.com/discovery/item/6a54b31a000000002101958f?source=webshare&xhsshare=pc_web&xsec_token=ABJe3ofgM3Ex2kyH6_-LliGOx7tz5soyJABqSjPmmWR6E=&xsec_source=pc_share' },
        ],
        pillars: [
          {
            label: 'Problem',
            title: 'Traditional AI video = a black box',
            body: 'Input topic → wait → get a final video. If it is not right, you start over with no idea what went wrong.',
          },
          {
            label: 'Solution',
            title: 'Split into 5 reviewable steps',
            body: 'Each step preserves intermediate outputs that can be modified independently. Like giving AI a quality-controlled production line.',
          },
          {
            label: 'Result',
            title: 'One sentence to a video, with precision editing',
            body: 'The video on the right was generated from just one topic. Any step can be refined without starting from scratch.',
          },
        ],
        flowLabel: 'How it works',
        flow: ['Topic input', 'Content generation', 'Visual creation', 'Video synthesis', 'Quality check'],
      },
      caseStudy02: {
        label: 'Featured case study / 02',
        title: 'Reverse Editing',
        summary: 'Upload a short video you admire, and AI dissects its shot structure, copy rhythm, and trust logic—outputting a complete production plan including shot lists, storyboards, editable subtitle/voiceover scripts, and a CapCut-ready preview project.',
        videoCaption: 'The video on the right was generated from a single reference video and store info. Every shot, caption, and transition rhythm was reverse-engineered and reassembled by AI.',
        imageSrc: '/capcut-screenshot.png',
        imageCaption: 'CapCut preview project generated from reverse engineering',
        pillars: [
          {
            label: 'Problem',
            title: 'I want to make videos but do not know how to shoot',
            body: 'I watched tons of viral videos but still do not know how to start filming. Copy, pacing, and shot transitions are all black boxes.',
          },
          {
            label: 'Solution',
            title: 'Reverse-engineer the structure of a reference video',
            body: 'Feed a reference video to AI, and it automatically breaks down shot types, timing, copy rhythm, and trust logic. Every shot becomes an executable, replaceable module.',
          },
          {
            label: 'Result',
            title: 'From "I want to learn" to "I can shoot" with one reference video',
            body: 'A 64-second glasses store video reverse-engineered into 17 shots, with storyboard, shot list, voiceover script, and CapCut preview.',
          },
        ],
        flowLabel: 'How it works',
        flow: ['Reference video input', 'Reverse structure analysis', 'Storyboard generation', 'Content layer assembly', 'CapCut project export'],
      },
      githubLabel: 'View GitHub',
      demoSoon: 'Demo soon',
      videoSoon: 'Video soon',
      contactTitle: 'Contact and next steps',
      contactBody: 'If you are building AI products, content automation, or agent workflows, I can help with early prototypes and system setup. Reach me by email, WeChat, or phone.',
      contactItems: [
        { label: 'Email', value: 'zhengkaibys@163.com', kind: 'email' },
        { label: 'WeChat', value: '_ZKbys_', kind: 'wechat' },
        { label: 'Phone', value: '17857294938', kind: 'phone' },
        { label: 'GitHub', value: 'github.com/zkbys', kind: 'github' },
        { label: 'Resume', value: 'PDF pending', kind: 'resume' },
      ],
    },
  },
  creator: {
    zh: {
      nav: [
        { label: '身份', href: '#about' },
        { label: '作品', href: '#portfolio' },
        { label: '方法', href: '#timeline' },
        { label: '联系', href: '#contact' },
      ],
      heroKicker: 'AI Creator / Product Builder / Prompt Engineer',
      heroIntro:
        '我把 AI 当成新的创作基础设施：从一句想法，到脚本、工具、自动化流程、内容系统和可展示作品。我的兴趣是让 AI 不只停留在对话里，而是进入真实的创作和生产。',
      heroStatus: 'Building AI-native tools, workflows and content systems.',
      primaryCta: '聊聊合作',
      resumeCta: '简历待补',
      githubCta: 'GitHub',
      aboutLabel: 'creative systems',
      aboutHeading: [
        { text: '我是 ZKbys，', className: 'font-normal' },
        { text: 'building with AI as a studio.', className: 'font-serif italic' },
        { text: '把内容、产品和 Agent 流程做成可体验的系统。', className: 'font-normal' },
      ],
      aboutBody:
        '我喜欢做介于产品和创作之间的东西。它们不只是一次性的演示，而是有输入、有流程、有产物、有反馈的系统。Agent 工作流是骨架，提示词工程是语言，产品设计决定它能不能被别人真正理解和使用。',
      timelineTitle: '我的创作方法',
      timeline: [
        {
          label: 'Observe',
          title: '从真实习惯切入',
          body: '刷 Reddit、看小红书、做视频、整理资料，这些日常行为里都藏着 AI 产品的入口。',
        },
        {
          label: 'Design',
          title: '把灵感变成流程',
          body: '先拆模块，再定义输入输出，最后让 AI、脚本、界面和人工审核各自承担清楚的角色。',
        },
        {
          label: 'Ship',
          title: '用作品表达能力',
          body: '我更愿意拿可运行的 Demo、仓库、视频和卡片说话，用可见产物解释自己的能力。',
        },
      ],
      methodTitle: '我能搭的系统',
      methods: ['AI-native workflow', 'Human-in-the-loop', 'Content systems'],
      currentFocus: {
        label: 'Currently / 最近在做',
        status: '持续实验中',
        title: '把创作过程变成可持续迭代的系统',
        body: '最近围绕白板视频、内容自动化和 AI 原生创作工具做实验，关注从一个想法到可审核成品之间，那些经常被忽略但真正决定质量的中间层。',
      },
      featuresHeading: [
        { text: 'Projects and experiments,', className: 'text-primary' },
        { text: 'one working style.', className: 'text-gray-500' },
      ],
      videoCard: 'A personal lab for AI-native products and visual systems.',
      projects: [
        {
          number: '01',
          title: 'Whiteboard Engine.',
          eyebrow: 'From topic to reviewable video',
          description: '把 AI 白板视频从“生成一个 MP4”改造成一条可检查、可替换、可复用的创作流水线。',
          items: ['保留脚本、分镜和素材', '把人工审核放进流程中', '用 QA 报告定义完成标准'],
          repo: 'https://github.com/zkbys/whiteboard',
          icon: projectIcons[0],
        },
        {
          number: '02',
          title: 'Reverse Editing.',
          eyebrow: 'Reverse engineering video for reuse',
          description: '把别人的爆款视频当作学习样本，逆向拆解成镜头结构、节奏和文案层，再生成可替换的账号内容模板。',
          items: ['从成品反推结构', '镜头级节奏分析', '可复用的创作模板'],
          repo: 'https://github.com/zkbys/reverse-editing',
          icon: projectIcons[2],
        },
        {
          number: '03',
          title: 'PW.',
          eyebrow: 'Personal site as a design system',
          description: '这个作品集本身也是一个作品：一个可切换中英文、可切换求职/创作者双版本的展示系统。',
          items: ['双语双版本切换', '组件化页面系统', '设计即代码'],
          repo: 'https://github.com/zkbys/PW',
          icon: projectIcons[3],
        },
        {
          number: '04',
          title: 'Dopamine Learning.',
          eyebrow: 'A playful English acquisition product',
          description: 'Scrollish 不是严肃背单词工具，而是把刷屏的多巴胺迁移到英文互联网真实语料里。',
          items: ['无限流英语内容体验', 'AI 查词、翻译、追问', '把娱乐转成习得场景'],
          repo: 'https://github.com/zkbys/Scrollish',
          icon: projectIcons[1],
        },
        {
          number: '05',
          title: 'MSBA.',
          eyebrow: 'AI safety in medical models',
          description: '在医学视觉-语言模型中探索后门攻击与防御。把安全研究从概念变成可运行的联邦学习实验与 Grad-CAM 可视化。',
          items: ['后门攻击与防御实验', '联邦学习系统搭建', 'Grad-CAM 可解释性'],
          repo: 'https://github.com/zkbys/MSBA',
          icon: projectIcons[4],
        },
      ],
      caseStudy: {
        label: 'Featured case study / 01',
        title: 'Whiteboard Engine',
        summary: '不是让 AI 更快地吐出一条视频，而是给创作保留脚本、画面、节奏、镜头和判断，让每一步都能被看见和重新选择。',
        pillars: [
          {
            label: '起点',
            title: '从一句主题开始',
            body: '先保留表达立场，再把口播、视觉节奏和语义白板拆成可讨论的创作决定。',
          },
          {
            label: '过程',
            title: '让每个中间层可编辑',
            body: '模型 PNG、控制层、音频 timing、镜头策略和 HyperFrames 工程都不是黑盒。',
          },
          {
            label: '完成',
            title: '用审查代替“看起来可以”',
            body: '关键帧、资产一致性和 action / camera QA 让成品拥有明确的完成标准。',
          },
        ],
        flowLabel: '一条可继续创作的流水线',
        flow: ['主题', '表达与画面', '模型资产', '动作与镜头', '审查与交付'],
      },
      caseStudy02: {
        label: 'Featured case study / 02',
        title: 'Reverse Editing',
        summary: '上传一条你觉得拍得好的短视频，AI 帮你拆解它的镜头结构、文案节奏和信任逻辑，输出一套完整的制作方案——包括拍摄清单、故事板、可编辑字幕/配音脚本，以及一个剪映可打开的预演工程。',
        videoCaption: '右侧的这条视频，就是我只输入了一条眼镜店对标视频和门店信息后，AI 自动生成的制作方案预览。你看到的 17 个镜头、每段文案、每个转场节奏，都是 AI 逆向拆解并重新组装的结果。',
        imageSrc: '/capcut-screenshot.png',
        imageCaption: '逆向拆解后生成的剪映预演工程草稿',
        pillars: [
          {
            label: '问题',
            title: '想做视频但不知道怎么拍',
            body: '看了无数爆款视频，拍的时候还是不知道第一个镜头怎么摆。文案、节奏、镜头衔接全是黑盒。',
          },
          {
            label: '方案',
            title: '逆向拆解对标视频的结构',
            body: '把对标视频喂给 AI，它自动拆解出镜头类型、时长、文案节奏和信任逻辑。每个镜头都变成可执行、可替换的模块。',
          },
          {
            label: '结果',
            title: '从"想学"到"能拍"只需要一条对标视频',
            body: '64 秒的眼镜店视频，逆向拆解成 17 个镜头，自动生成故事板、拍摄清单、配音脚本和剪映预演工程。',
          },
        ],
        flowLabel: '处理流程',
        flow: ['输入对标视频', '逆向拆解结构', '生成故事板', '组装内容层', '导出剪映工程'],
      },
      githubLabel: '打开仓库',
      demoSoon: 'Demo 待补',
      videoSoon: '视频待补',
      contactTitle: '把对话接到现实里',
      contactBody: '如果你正在做 AI 产品、内容自动化或创意工作流，我适合参与从想法到原型的早期搭建。邮箱、微信和电话都可以联系我。',
      contactItems: [
        { label: '邮箱', value: 'zhengkaibys@163.com', kind: 'email' },
        { label: '微信', value: '_ZKbys_', kind: 'wechat' },
        { label: '电话', value: '17857294938', kind: 'phone' },
        { label: 'GitHub', value: 'github.com/zkbys', kind: 'github' },
        { label: '简历', value: 'PDF 待补', kind: 'resume' },
      ],
    },
    en: {
      nav: [
        { label: 'Identity', href: '#about' },
        { label: 'Works', href: '#portfolio' },
        { label: 'Method', href: '#timeline' },
        { label: 'Contact', href: '#contact' },
      ],
      heroKicker: 'AI Creator / Product Builder / Prompt Engineer',
      heroIntro:
        'I treat AI as creative infrastructure: from a single idea to scripts, tools, automated workflows, content systems, and visible artifacts. My focus is moving AI beyond conversation into real creative and production work.',
      heroStatus: 'Building AI-native tools, workflows and content systems.',
      primaryCta: 'Start a conversation',
      resumeCta: 'Resume soon',
      githubCta: 'GitHub',
      aboutLabel: 'creative systems',
      aboutHeading: [
        { text: 'I am ZKbys,', className: 'font-normal' },
        { text: 'building with AI as a studio.', className: 'font-serif italic' },
        { text: 'I turn content, product ideas, and agent flows into systems people can actually experience.', className: 'font-normal' },
      ],
      aboutBody:
        'I like building things between product and creation. They are not one-off demos; they have inputs, workflows, outputs, and feedback. Agent workflows provide the structure, prompt engineering gives them language, and product design decides whether other people can understand and use them.',
      timelineTitle: 'Working method',
      timeline: [
        {
          label: 'Observe',
          title: 'Start from real behavior',
          body: 'Scrolling Reddit, reading Xiaohongshu, making videos, and collecting notes all contain AI product opportunities.',
        },
        {
          label: 'Design',
          title: 'Turn ideas into workflows',
          body: 'I split modules, define inputs and outputs, then assign clear roles to AI, scripts, interfaces, and human review.',
        },
        {
          label: 'Ship',
          title: 'Let artifacts speak',
          body: 'I prefer runnable demos, repositories, videos, and cards that make the work visible.',
        },
      ],
      methodTitle: 'Systems I can build',
      methods: ['AI-native workflow', 'Human-in-the-loop', 'Content systems'],
      currentFocus: {
        label: 'Currently',
        status: 'Actively experimenting',
        title: 'Turning creative processes into systems that can keep evolving',
        body: 'I am experimenting with whiteboard video, content automation, and AI-native creative tools, focusing on the often invisible middle layers between an idea and a reviewable final artifact.',
      },
      featuresHeading: [
        { text: 'Projects and experiments,', className: 'text-primary' },
        { text: 'one working style.', className: 'text-gray-500' },
      ],
      videoCard: 'A personal lab for AI-native products and visual systems.',
      projects: [
        {
          number: '01',
          title: 'Whiteboard Engine.',
          eyebrow: 'From topic to reviewable video',
          description:
            'A whiteboard video pipeline that shifts the goal from one-shot MP4 generation to a reviewable, replaceable, reusable creative workflow.',
          items: ['Preserves script, boards, and assets', 'Keeps human review in the loop', 'Defines completion through QA reports'],
          repo: 'https://github.com/zkbys/whiteboard',
          icon: projectIcons[0],
        },
        {
          number: '02',
          title: 'Reverse Editing.',
          eyebrow: 'Reverse engineering video for reuse',
          description:
            'Treating proven videos as learning samples, reverse-engineering them into shot structures, rhythm, and copy layers, then generating replaceable account content templates.',
          items: ['Infer structure from finished work', 'Shot-level rhythm analysis', 'Reusable creation templates'],
          repo: 'https://github.com/zkbys/reverse-editing',
          icon: projectIcons[2],
        },
        {
          number: '03',
          title: 'PW.',
          eyebrow: 'Personal site as a design system',
          description:
            'This portfolio itself is a work: a bilingual, dual-mode presentation system that switches between career and creator versions.',
          items: ['Bilingual and dual-mode switching', 'Component-based page system', 'Design as code'],
          repo: 'https://github.com/zkbys/PW',
          icon: projectIcons[3],
        },
        {
          number: '04',
          title: 'Dopamine Learning.',
          eyebrow: 'A playful English acquisition product',
          description:
            'Scrollish is not a strict vocabulary tool. It redirects the dopamine of scrolling toward authentic English internet content.',
          items: ['Infinite-feed English content', 'AI lookup, translation, and follow-up', 'Entertainment as an acquisition scene'],
          repo: 'https://github.com/zkbys/Scrollish',
          icon: projectIcons[1],
        },
        {
          number: '05',
          title: 'MSBA.',
          eyebrow: 'AI safety in medical models',
          description:
            'Exploring backdoor attacks and defenses in medical vision-language models. Turning security research from concepts into runnable federated learning experiments and Grad-CAM visualizations.',
          items: ['Backdoor attack & defense experiments', 'Federated learning system setup', 'Grad-CAM explainability'],
          repo: 'https://github.com/zkbys/MSBA',
          icon: projectIcons[4],
        },
      ],
      caseStudy: {
        label: 'Featured case study / 01',
        title: 'Whiteboard Engine',
        summary: 'The goal is not a faster AI-generated video. It is a creative system that keeps script, image, rhythm, camera, and judgment visible enough to revise.',
        pillars: [
          {
            label: 'Origin',
            title: 'Start with one point of view',
            body: 'Preserve the core stance first, then turn voiceover, visual rhythm, and semantic boards into discussable creative decisions.',
          },
          {
            label: 'Process',
            title: 'Keep every middle layer editable',
            body: 'Model PNGs, control layers, audio timing, camera strategy, and the HyperFrames project stay outside the black box.',
          },
          {
            label: 'Finish',
            title: 'Replace “looks fine” with review',
            body: 'Keyframes, asset identity, and action / camera QA create a concrete definition of completion.',
          },
        ],
        flowLabel: 'A pipeline built for continued creation',
        flow: ['Topic', 'Voice & image', 'Model assets', 'Motion & camera', 'Review & delivery'],
      },
      caseStudy02: {
        label: 'Featured case study / 02',
        title: 'Reverse Editing',
        summary: 'Upload a short video you admire, and AI dissects its shot structure, copy rhythm, and trust logic—outputting a complete production plan including shot lists, storyboards, editable subtitle/voiceover scripts, and a CapCut-ready preview project.',
        videoCaption: 'The video on the right was generated from a single reference video and store info. Every shot, caption, and transition rhythm was reverse-engineered and reassembled by AI.',
        imageSrc: '/capcut-screenshot.png',
        imageCaption: 'CapCut preview project generated from reverse engineering',
        pillars: [
          {
            label: 'Problem',
            title: 'I want to make videos but do not know how to shoot',
            body: 'I watched tons of viral videos but still do not know how to start filming. Copy, pacing, and shot transitions are all black boxes.',
          },
          {
            label: 'Solution',
            title: 'Reverse-engineer the structure of a reference video',
            body: 'Feed a reference video to AI, and it automatically breaks down shot types, timing, copy rhythm, and trust logic. Every shot becomes an executable, replaceable module.',
          },
          {
            label: 'Result',
            title: 'From "I want to learn" to "I can shoot" with one reference video',
            body: 'A 64-second glasses store video reverse-engineered into 17 shots, with storyboard, shot list, voiceover script, and CapCut preview.',
          },
        ],
        flowLabel: 'How it works',
        flow: ['Reference video input', 'Reverse structure analysis', 'Storyboard generation', 'Content layer assembly', 'CapCut project export'],
      },
      githubLabel: 'Open repo',
      demoSoon: 'Demo soon',
      videoSoon: 'Video soon',
      contactTitle: 'Bring the conversation into reality',
      contactBody: 'If you are building AI products, content automation, or creative workflows, I can help move the idea into an early prototype. Email, WeChat, and phone are all available.',
      contactItems: [
        { label: 'Email', value: 'zhengkaibys@163.com', kind: 'email' },
        { label: 'WeChat', value: '_ZKbys_', kind: 'wechat' },
        { label: 'Phone', value: '17857294938', kind: 'phone' },
        { label: 'GitHub', value: 'github.com/zkbys', kind: 'github' },
        { label: 'Resume', value: 'PDF pending', kind: 'resume' },
      ],
    },
  },
};

function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  style,
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const words = useMemo(() => text.split(' '), [text]);

  return (
    <div ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;

        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-baseline">
            <motion.span
              aria-hidden="true"
              className="inline-block"
              initial={{ y: 20 }}
              animate={isInView ? { y: 0 } : { y: 20 }}
              transition={{ duration: 0.9, delay: index * 0.08, ease: easeOut }}
            >
              <span className={showAsterisk && isLastWord ? 'relative inline-block pr-[0.08em]' : undefined}>
                {word}
                {showAsterisk && isLastWord ? (
                  <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em] leading-none">*</span>
                ) : null}
              </span>
              {index < words.length - 1 ? '\u00a0' : null}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}

function WordsPullUpMultiStyle({ segments, className = '' }: { segments: StyledSegment[]; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const words = useMemo(
    () =>
      segments.flatMap((segment, segmentIndex) =>
        segment.text.split(' ').map((word) => ({
          word,
          className: segment.className,
          segmentIndex,
        })),
      ),
    [segments],
  );
  const label = segments.map((segment) => segment.text).join(' ');

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} aria-label={label}>
      {words.map((word, index) => (
        <span key={`${word.word}-${word.segmentIndex}-${index}`} className="inline-block overflow-hidden align-baseline">
          <motion.span
            aria-hidden="true"
            className={`inline-block ${word.className ?? ''}`}
            initial={{ y: 20 }}
            animate={isInView ? { y: 0 } : { y: 20 }}
            transition={{ duration: 0.82, delay: index * 0.08, ease: easeOut }}
          >
            {word.word}
            {index < words.length - 1 ? '\u00a0' : null}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function AnimatedLetter({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre-wrap">
      {char === ' ' ? '\u00a0' : char}
    </motion.span>
  );
}

function ScrollRevealParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const letters = useMemo(() => Array.from(text), [text]);
  const totalChars = Math.max(letters.length - 1, 1);

  return (
    <p
      ref={ref}
      className="relative mx-auto mt-8 max-w-2xl text-xs leading-[1.65] text-[#DEDBC8] sm:mt-10 sm:text-sm md:text-base"
    >
      {letters.map((char, index) => {
        const charProgress = index / totalChars;
        const start = Math.max(0, charProgress - 0.1);
        const end = Math.min(1, charProgress + 0.05);

        return <AnimatedLetter key={`${char}-${index}`} char={char} progress={scrollYProgress} range={[start, end]} />;
      })}
    </p>
  );
}

function SegmentButton({
  active,
  children,
  onClick,
  ariaLabel,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`rounded-full px-2.5 py-1 text-[10px] transition-colors duration-300 sm:text-xs ${
        active ? 'bg-primary text-black' : 'text-primary/70 hover:text-primary'
      }`}
    >
      {children}
    </button>
  );
}

function HeaderNav({
  locale,
  mode,
  setLocale,
}: {
  locale: Locale;
  mode: DemoMode;
  setLocale: (locale: Locale) => void;
  setMode?: (mode: DemoMode) => void;
}) {
  const activeCopy = copy[mode][locale];

  return (
    <nav className="absolute left-1/2 top-0 z-20 w-[calc(100%-1.5rem)] -translate-x-1/2 rounded-b-2xl bg-black/95 px-3 py-2 md:w-auto md:rounded-b-3xl md:px-6">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8">
        <div className="flex items-center gap-3 sm:gap-5 md:gap-8">
          {activeCopy.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[10px] transition-colors duration-300 hover:text-[#E1E0CC] sm:text-xs md:text-sm"
              style={{ color: 'rgba(225, 224, 204, 0.8)' }}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-full border border-primary/10 bg-white/[0.03] p-1">
          <Languages className="ml-1 h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
          <SegmentButton active={locale === 'zh'} onClick={() => setLocale('zh')} ariaLabel="Switch to Chinese">
            中文
          </SegmentButton>
          <SegmentButton active={locale === 'en'} onClick={() => setLocale('en')} ariaLabel="Switch to English">
            EN
          </SegmentButton>
        </div>
      </div>
    </nav>
  );
}

function Hero({
  locale,
  mode,
  setLocale,
}: {
  locale: Locale;
  mode: DemoMode;
  setLocale: (locale: Locale) => void;
  setMode?: (mode: DemoMode) => void;
}) {
  const activeCopy = copy[mode][locale];

  return (
    <section className="h-screen bg-black p-4 md:p-6" aria-label="ZKbys personal portfolio hero">
      <div className="relative h-full overflow-hidden rounded-2xl bg-black md:rounded-[2rem]">
        <video className="absolute inset-0 h-full w-full object-cover" src={heroVideo} autoPlay loop muted playsInline />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/70" />

        <HeaderNav locale={locale} mode={mode} setLocale={setLocale} />

        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8 lg:px-10">
          <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-primary/70 sm:text-xs">{activeCopy.heroKicker}</p>
              <WordsPullUp
                key={`hero-${locale}-${mode}`}
                text="ZKbys"
                showAsterisk
                className="text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                style={{ color: cream }}
              />
            </div>
            <div className="flex max-w-md flex-col items-start gap-4 pb-1 sm:gap-5 md:pb-3 lg:col-span-4 lg:pb-8">
              <motion.p
                className="text-xs leading-[1.25] text-primary/70 sm:text-sm md:text-base"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.5, ease: easeOut }}
              >
                {activeCopy.heroIntro}
              </motion.p>
              <motion.p
                className="rounded-full border border-primary/15 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-primary/80 sm:text-xs"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.62, ease: easeOut }}
              >
                {activeCopy.heroStatus}
              </motion.p>
              <motion.div
                className="flex flex-wrap items-center gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.72, ease: easeOut }}
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-[gap,transform] duration-300 hover:gap-3 sm:py-2 sm:pl-6 sm:pr-2 sm:text-base"
                >
                  <span>{activeCopy.primaryCta}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-primary sm:h-5 sm:w-5" strokeWidth={1.8} />
                  </span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-primary/20 bg-black/35 px-4 text-xs text-primary transition-colors duration-300 hover:bg-primary hover:text-black sm:h-11 sm:text-sm"
                >
                  <Download className="h-4 w-4" />
                  {activeCopy.resumeCta}
                </a>
                <a
                  href={contactLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-primary/20 bg-black/35 px-4 text-xs text-primary transition-colors duration-300 hover:bg-primary hover:text-black sm:h-11 sm:text-sm"
                >
                  <Github className="h-4 w-4" />
                  {activeCopy.githubCta}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CurrentFocus({ focus }: { focus: CurrentFocusCopy }) {
  return (
    <div className="mt-10 border-t border-primary/10 pt-8 text-left">
      <div className="grid gap-5 md:grid-cols-[0.7fr_1.3fr] md:items-start md:gap-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-primary/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 sm:text-xs">{focus.label}</p>
          <span className="rounded-full border border-primary/15 px-2.5 py-1 text-[10px] text-primary/70">{focus.status}</span>
        </div>
        <div>
          <h3 className="max-w-2xl text-xl leading-tight text-primary sm:text-2xl">{focus.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400">{focus.body}</p>
        </div>
      </div>
    </div>
  );
}

function About({ locale, mode }: { locale: Locale; mode: DemoMode }) {
  const activeCopy = copy[mode][locale];

  return (
    <section id="about" className="bg-black px-4 py-20 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl rounded-[1.5rem] bg-[#101010] px-5 py-16 text-center sm:px-8 sm:py-20 md:rounded-[2rem] md:px-10 lg:py-24">
        <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-primary sm:text-xs">{activeCopy.aboutLabel}</p>
        <WordsPullUpMultiStyle
          key={`about-${locale}-${mode}`}
          segments={activeCopy.aboutHeading}
          className="mx-auto max-w-4xl text-3xl font-normal leading-[0.95] text-primary sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
        />
        <ScrollRevealParagraph text={activeCopy.aboutBody} />

        <div id="timeline" className="mt-12 border-t border-primary/10 pt-8 text-left">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 sm:text-xs">{activeCopy.timelineTitle}</p>
              <h2 className="mt-3 max-w-sm text-2xl leading-none text-primary sm:text-3xl md:text-4xl">{activeCopy.methodTitle}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {activeCopy.methods.map((method) => (
                  <span key={method} className="rounded-full border border-primary/15 px-3 py-1 text-xs text-primary/80">
                    {method}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-0 md:grid-cols-3">
              {activeCopy.timeline.map((item, index) => (
                <div
                  key={`${item.label}-${item.title}`}
                  className={`border-primary/10 py-5 md:px-5 md:py-0 ${index > 0 ? 'border-t md:border-l md:border-t-0' : ''}`}
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">{item.label}</p>
                  <h3 className="mt-3 text-lg leading-tight text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CurrentFocus focus={activeCopy.currentFocus} />
      </div>
    </section>
  );
}

function FeatureVideoCard({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="relative min-h-[360px] overflow-hidden rounded-2xl bg-[#212121] md:min-h-[390px] lg:h-[520px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: cardEase }}
    >
      <video className="absolute inset-0 h-full w-full object-cover" src={canvasVideo} autoPlay loop muted playsInline />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />
      <p className="absolute bottom-5 left-5 right-5 text-2xl leading-none text-[#E1E0CC] sm:text-3xl lg:text-4xl">{text}</p>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  githubLabel,
}: {
  project: ProjectCopy;
  index: number;
  githubLabel: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.article
      ref={ref}
      className="flex min-h-[360px] flex-col justify-between rounded-2xl bg-[#212121] p-5 md:min-h-[390px] lg:h-[520px] lg:p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, delay: (index + 1) * 0.15, ease: cardEase }}
    >
      <div>
        <img src={project.icon} alt="" className="mb-6 h-10 w-10 rounded object-cover sm:h-12 sm:w-12" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-gray-500">{project.eyebrow}</p>
            <h3 className="max-w-[11rem] text-2xl leading-[0.95] text-primary sm:text-3xl lg:text-[2rem]">{project.title}</h3>
          </div>
          <span className="pt-1 text-xs text-gray-500">{project.number}</span>
        </div>
        <p className="mb-5 text-sm leading-snug text-gray-400">{project.description}</p>
        <ul className="space-y-3">
          {project.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-snug text-gray-400">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-2">
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-medium text-black transition-[gap] duration-300 hover:gap-3"
        >
          {githubLabel}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

function CaseStudy({ caseStudy, videoSrc }: { caseStudy: CaseStudyCopy; videoSrc: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.article
      ref={ref}
      className="mt-14 border-y border-primary/10 py-10 sm:mt-16 sm:py-12 md:mt-20 md:py-16"
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.8, ease: cardEase }}
    >
      {/* Header + Video: side by side */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <header className="flex h-full flex-col">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 sm:text-xs">{caseStudy.label}</p>
          <h2 className="mt-4 text-4xl leading-[0.9] text-primary sm:text-5xl">{caseStudy.title}</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">{caseStudy.summary}</p>

          {caseStudy.videoCaption ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary/70">{caseStudy.videoCaption}</p>
          ) : null}

          <div className="mt-auto pt-6">
            {caseStudy.socialProof ? (
              <div className="rounded-xl border border-primary/10 bg-white/[0.03] p-4">
                <p className="text-sm leading-relaxed text-primary/80">{caseStudy.socialProof}</p>
              </div>
            ) : null}

            {caseStudy.socialLinks && caseStudy.socialLinks.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {caseStudy.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 px-3 py-1.5 text-xs text-primary transition-colors duration-300 hover:bg-primary hover:text-black"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            ) : null}

            {caseStudy.imageSrc ? (
              <div className="mt-3 overflow-hidden rounded-xl border border-primary/10">
                <img src={caseStudy.imageSrc} alt="" className="h-auto max-h-[240px] w-full object-contain" />
                {caseStudy.imageCaption ? (
                  <p className="bg-white/[0.03] px-4 py-2 text-xs text-primary/60">{caseStudy.imageCaption}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </header>

        <div className="flex h-full max-h-[420px] items-center justify-center overflow-hidden rounded-2xl bg-[#101010] sm:max-h-[480px] lg:max-h-[520px]">
          <video
            className="h-full w-full object-contain"
            src={videoSrc}
            controls
            preload="metadata"
            playsInline
          />
        </div>
      </div>

      {/* Pillars: full width */}
      <div className="mt-12 grid gap-0 md:grid-cols-3">
        {caseStudy.pillars.map((pillar, index) => (
          <section
            key={pillar.label}
            className={`border-primary/10 py-6 md:px-5 md:py-0 ${index > 0 ? 'border-t md:border-l md:border-t-0' : ''}`}
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">{pillar.label}</p>
            <h3 className="mt-3 text-lg leading-tight text-primary">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">{pillar.body}</p>
          </section>
        ))}
      </div>

      {/* Flow: full width */}
      <div className="mt-10 border-t border-primary/10 pt-7">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 sm:text-xs">{caseStudy.flowLabel}</p>
        <ol className="mt-5 grid grid-cols-1 gap-x-4 sm:grid-cols-5">
          {caseStudy.flow.map((step, index) => (
            <li key={step} className="flex min-h-16 items-center justify-between gap-4 border-t border-primary/10 py-3 sm:min-h-28 sm:flex-col sm:items-start sm:py-4">
              <span className="text-[10px] text-gray-500">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-sm leading-tight text-primary">{step}</span>
              {index < caseStudy.flow.length - 1 ? (
                <ArrowRight className="h-4 w-4 shrink-0 text-primary/50 sm:self-end" aria-hidden="true" />
              ) : (
                <Check className="h-4 w-4 shrink-0 text-primary sm:self-end" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </motion.article>
  );
}

function ContactIcon({ kind }: { kind: string }) {
  if (kind === 'email') return <Mail className="h-4 w-4" />;
  if (kind === 'wechat') return <MessageCircle className="h-4 w-4" />;
  if (kind === 'phone') return <Phone className="h-4 w-4" />;
  if (kind === 'github') return <Github className="h-4 w-4" />;
  return <Download className="h-4 w-4" />;
}

function ContactPanel({ locale, mode }: { locale: Locale; mode: DemoMode }) {
  const activeCopy = copy[mode][locale];

  return (
    <div id="contact" className="mt-4 rounded-2xl bg-[#101010] p-5 sm:p-6 md:p-8">
      <div className="grid gap-7 lg:grid-cols-[0.9fr_1.6fr] lg:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60">contact</p>
          <h2 className="mt-3 text-2xl leading-none text-primary sm:text-3xl md:text-4xl">{activeCopy.contactTitle}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-400">{activeCopy.contactBody}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {activeCopy.contactItems.map((item) => {
            const href = item.kind === 'github' ? contactLinks.github : '';
            const contentNode = (
              <>
                <span className={`text-primary/80 ${href ? 'transition-colors duration-300 group-hover:text-black' : ''}`}>
                  <ContactIcon kind={item.kind} />
                </span>
                <span>
                  <span className={`block text-[10px] uppercase tracking-[0.22em] text-gray-500 ${href ? 'transition-colors duration-300 group-hover:text-black/60' : ''}`}>
                    {item.label}
                  </span>
                  <span className={`mt-1 block text-sm leading-tight text-primary break-words ${href ? 'transition-colors duration-300 group-hover:text-black' : ''}`}>
                    {item.value}
                  </span>
                </span>
              </>
            );

            if (href) {
              return (
                <a
                  key={item.kind}
                  href={href}
                  target={item.kind === 'github' ? '_blank' : undefined}
                  rel={item.kind === 'github' ? 'noreferrer' : undefined}
                  className="group flex min-h-20 flex-shrink-0 items-center gap-3 rounded-xl border border-primary/10 px-4 py-3 transition-colors duration-300 hover:bg-primary hover:text-black"
                >
                  {contentNode}
                </a>
              );
            }

            return (
              <div key={item.kind} className="flex min-h-20 flex-shrink-0 items-center gap-3 rounded-xl border border-primary/10 px-4 py-3">
                {contentNode}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Features({ locale, mode }: { locale: Locale; mode: DemoMode }) {
  const activeCopy = copy[mode][locale];

  return (
    <section id="portfolio" className="relative min-h-screen overflow-hidden bg-black px-4 py-20 sm:px-6 sm:py-24 md:py-32">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="mb-10 flex justify-center text-center sm:mb-12 md:mb-16">
          <WordsPullUpMultiStyle
            key={`features-${locale}-${mode}`}
            segments={activeCopy.featuresHeading}
            className="max-w-4xl text-xl font-normal leading-tight sm:text-2xl md:text-3xl lg:text-4xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:grid-cols-3">
          <FeatureVideoCard text={activeCopy.videoCard} />
          {activeCopy.projects.map((project, index) => (
            <ProjectCard
              key={project.repo}
              project={project}
              index={index}
              githubLabel={activeCopy.githubLabel}
            />
          ))}
        </div>

        <CaseStudy caseStudy={activeCopy.caseStudy} videoSrc={whiteboardDemoVideo} />
        <CaseStudy caseStudy={activeCopy.caseStudy02} videoSrc={reverseEditingDemoVideo} />

        <ContactPanel locale={locale} mode={mode} />
      </div>
    </section>
  );
}

export default function App() {
  const [locale, setLocale] = useState<Locale>('zh');
  const mode: DemoMode = 'career';

  return (
    <main className="min-h-screen bg-black" style={{ color: cream }}>
      <Hero locale={locale} mode={mode} setLocale={setLocale} />
      <About locale={locale} mode={mode} />
      <Features locale={locale} mode={mode} />
    </main>
  );
}
