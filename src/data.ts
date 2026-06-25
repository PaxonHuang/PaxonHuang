// ─── Project data ────────────────────────────────────────────────────────────
//
// Two shapes are supported:
//   - Featured (EchoGlove): rendered as a full-width hero with architecture
//     diagram, highlights, metrics, and stack. Mark with `featured: true`.
//   - Standard: rendered as a 2-col grid card with name/desc/tags.
//
// To add a new featured project, set `featured: true` and fill the optional
// detailed fields. Standard projects only need name/desc/tags/link.

export interface ProjectHighlight {
  /** lucide-react icon name (kebab-case) */
  icon:
    | 'cpu'
    | 'radio'
    | 'brain'
    | 'gauge'
    | 'battery'
    | 'wifi'
    | 'bluetooth'
    | 'layers'
    | 'git-branch'
    | 'activity'
    | 'zap'
    | 'shield';
  title: string;
  desc: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface ProjectStack {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  desc: string;
  tags: string[];
  link: string;
  // Featured-only fields
  featured?: boolean;
  version?: string;
  status?: string;
  category?: string;
  problem?: string;
  architecture?: string;
  highlights?: ProjectHighlight[];
  metrics?: ProjectMetric[];
  stack?: ProjectStack[];
}

// ─── Featured: EchoGlove V6.0 ─────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    name: 'EchoGlove V6.0 — 边缘 AI + SFLP 融合的双手语翻译智能手套',
    shortDesc: undefined as never, // not used; featured renders long form
    desc: '面向听障人群的实时连续手语翻译与 3D 动作捕捉系统。融合柔性传感器、IMU、UWB 与霍尔传感器，3 级边缘推理架构实现"感知→编码→推理→表达"完整闭环。',
    tags: ['C++', 'ESP32-S3', 'ESP32-P4', 'Edge AI', 'GNN', 'TTS', 'IMU', 'PCB', 'IoT'],
    link: 'https://github.com/PaxonHuang/EchoGlove-SLR-MOCAP-Beta',
    featured: true,
    version: 'V6.0',
    status: '168/168 tests passing · 全栈开源 (MIT)',
    category: 'Edge AI · Embedded · Healthcare',
    problem:
      '听障人群日常沟通依赖人工手语翻译，成本高、实时性差。现有视觉手势识别方案受光照、遮挡与背景干扰大，难以在移动场景中稳定使用。',
    architecture: `┌──────────────────────────────────────────────────────────┐
│  GLOVE · ESP32-S3  (Tier 1)                              │
│  ┌──────────────────────────────────────────────┐        │
│  │ 5x Flex  +  LSM6DSV16X / BNO085  +  Hall    │        │
│  │ SFLP 0.65mA · 4 元数 + 11 维特征             │        │
│  └────────────────────┬─────────────────────────┘        │
│                       │                                   │
│              ┌────────▼────────┐                          │
│              │ 1D-CNN  <3ms    │                          │
│              └────────┬────────┘                          │
│                       │  ESP-NOW + BLE 5.0  双模冗余       │
└───────────────────────┼──────────────────────────────────┘
                        │  28-dim 双手特征
┌───────────────────────▼──────────────────────────────────┐
│  BASE STATION · ESP32-P4  (Tier 2)                       │
│  ┌──────────────────────────────────────────────┐        │
│  │  Gated Bi-CrossAttention  <30ms              │        │
│  │  7" Display + TTS 语音 · 脱机独立可工作      │        │
│  └────────────────────┬─────────────────────────┘        │
│                       │  Wi-Fi / USB                      │
└───────────────────────┼──────────────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────────────┐
│  CLOUD / PC  (Tier 3)                                    │
│  ┌──────────────────────────────────────────────┐        │
│  │  ST-GCN + MS-TCN  时序模型                    │        │
│  │  60+ 类 · 连续手语句法解析                    │        │
│  └────────────────────┬─────────────────────────┘        │
└───────────────────────┼──────────────────────────────────┘
                        │
                  ┌─────▼─────┐
                  │ Mobile App │
                  │ Text / Voice│
                  └────────────┘`,
    highlights: [
      {
        icon: 'cpu',
        title: 'SFLP 超低功耗融合',
        desc: 'ST LSM6DSV16X / BNO085 内置 SFLP 0.65mA 输出 4 元数；IMU 内部温度传感器对弯曲传感器做温漂补偿，11 维/单手势特征。',
      },
      {
        icon: 'layers',
        title: '三级边缘推理架构',
        desc: 'Tier1 1D-CNN (<3ms) · Tier2 Gated Bi-CrossAttention (<30ms，集成 7 寸屏 + TTS) · Tier3 ST-GCN+MS-TCN 解析 60+ 类连续手语。',
      },
      {
        icon: 'radio',
        title: '高可靠双模通信',
        desc: 'ESP-NOW (~2ms) + BLE 5.0 双模冗余，28 维双手特征融合，三级模型热切换自动降级，丢包插值补帧。',
      },
      {
        icon: 'brain',
        title: '长链连续语句推理',
        desc: '云端 GCN 时序模型 + 上下文关联解析，从孤立手势识别升级到连续手语句法级别的语义映射。',
      },
    ],
    metrics: [
      { label: 'Tier 1 延迟', value: '<3', unit: 'ms' },
      { label: 'Tier 2 延迟', value: '<30', unit: 'ms' },
      { label: 'SFLP 功耗', value: '0.65', unit: 'mA' },
      { label: '连续手语类', value: '60+', unit: '类' },
      { label: '双手特征维度', value: '28', unit: '维' },
      { label: '自动化测试', value: '168', unit: '/168' },
    ],
    stack: [
      { category: '硬件', items: ['ESP32-S3 (主控)', 'ESP32-P4 (基站)', 'LSM6DSV16X / BNO085 IMU', '5× 柔性弯曲传感器', '霍尔传感器', '7" 显示屏 + TTS 模块'] },
      { category: '边缘 AI', items: ['TensorFlow Lite Micro', '1D-CNN (Tier 1)', 'Gated Bi-CrossAttention (Tier 2)', 'ST-GCN + MS-TCN (Tier 3)'] },
      { category: '通信', items: ['ESP-NOW (~2ms)', 'BLE 5.0', 'Wi-Fi', 'UWB (备选)'] },
      { category: '软件', items: ['C++ 固件', 'Python 推理', 'Unity 可视化', 'Web 中继', '移动 App'] },
    ],
  },

  // ─── Standard projects (rendered as cards) ────────────────────────────────
  {
    name: 'ROS2 Autonomy Stack',
    desc: 'Autonomous navigation stack using ROS2, Lidar, and Jetson Nano for SLAM.',
    tags: ['C++', 'ROS2', 'Robotics'],
    link: 'https://github.com/PaxonHuang/ros2-autonomy-stack',
  },
  {
    name: 'STM32 Drone Flight Controller',
    desc: 'Custom PCB design + embedded C firmware with kalman filtering for a quadcopter.',
    tags: ['Altium', 'C', 'STM32', 'Control Theory'],
    link: 'https://github.com/PaxonHuang/stm32-fc',
  },
  {
    name: 'Edge AI Anomaly Detector',
    desc: 'TensorFlow Lite model deployed on ESP32-S3 for acoustic anomaly detection.',
    tags: ['Python', 'TinyML', 'ESP32'],
    link: 'https://github.com/PaxonHuang/edge-ai-anomaly',
  },
  {
    name: 'VNet Guard',
    desc: 'Cloud-native zero-trust network gateway built with Rust and WebAssembly.',
    tags: ['Rust', 'Cloud Native', 'WASM'],
    link: 'https://github.com/PaxonHuang/vnet-guard',
  },
];

// ─── Other data exports used by Home / Nexus / Opportunities pages ────────

export const CLOUD_RESOURCES = [
  { name: '1000+ AI/ML Papers Collection (2024-2026)', size: '2.4 GB', link: 'https://huggingface.co/papers' },
  { name: 'PCB Design Blueprints & Altium Libraries', size: '850 MB', link: 'https://github.com/PaxonHuang/pcb-libraries' },
  { name: 'Embedded C/C++ Best Practices PDF Bundle', size: '120 MB', link: 'https://barrgroup.com/embedded-systems/books/embedded-c-coding-standard' },
  { name: 'Red Team Cheatsheets & Scripts', size: '45 MB', link: 'https://github.com/PaxonHuang/redteam-scripts' },
];

export const TOOL_LINKS = [
  { name: 'Shodan', descKey: 'tool.shodan', desc: 'Search engine for the Internet of Things', url: 'https://shodan.io' },
  { name: 'Wokwi', descKey: 'tool.wokwi', desc: 'Online Arduino/ESP32 Simulator', url: 'https://wokwi.com' },
  { name: 'Godbolt', descKey: 'tool.godbolt', desc: 'Compiler Explorer for C/C++/Rust assembly inspection', url: 'https://godbolt.org' },
  { name: 'Kaggle', descKey: 'tool.kaggle', desc: 'Machine Learning Datasets & Notebooks', url: 'https://kaggle.com' },
  { name: 'Exploit-DB', descKey: 'tool.exploit', desc: 'CVE and Exploit Database', url: 'https://exploit-db.com' },
];

export const OPPORTUNITIES = [
  {
    title: 'RackNerd / CloudCone VPS - $10/Year Deals',
    type: 'VPS',
    descKey: 'opp.vps',
    desc: 'How to stack coupons for extremely cheap Linux VPS servers (good for edge staging, VPN routing, and basic hosting).',
    url: 'https://lowendbox.com/blog/category/hosting/',
  },
  {
    title: 'Eskimo / Airalo Global eSIMs - Free Data Promos',
    type: 'eSIM',
    descKey: 'opp.esim',
    desc: 'Reviewing the best worldwide eSIM providers with low IoT data rates. Use referral deals for 1GB+ free roaming data.',
    url: 'https://www.airalo.com/',
  },
  {
    title: 'Free GPU Compute via Colab / Kaggle',
    type: 'AI Compute',
    descKey: 'opp.ai',
    desc: 'Maximizing free daily GPU allocations for LLM finetuning. T4 to A100 tricks and limits.',
    url: 'https://colab.research.google.com/',
  },
];
