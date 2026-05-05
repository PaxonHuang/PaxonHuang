import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav.home": "Home",
      "nav.blog": "Tech Blog",
      "nav.nexus": "Resources & Tools",
      "nav.projects": "Projects",
      "nav.ops": "Hacks & Ops",
      "footer.text": "Lapinex Tech Nexus. Powered by Web Architecture.",
      "footer.tags": "AIoT • Infosec • Edge • ML • Polyglot Eng",
      "home.title.architecting": "Architecting systems from",
      "home.title.silicon": "silicon",
      "home.title.to": "to",
      "home.title.cloud": "cloud",
      "home.subtitle": "I am a Polyglot Engineer & Embedded System Designer. This nexus chronicles my journey across AIoT, Cybersecurity, Edge ML, and Full-Stack development.",
      "home.intro": "I'm passionate about low-level hardware, high-level architectures, and everything in between. Checkout my code on GitHub:",
      "home.btn.blog": "Read the Tech Blog",
      "home.btn.projects": "View Projects",
      "home.section.tech": "Tech Stack",
      "home.section.recent": "Recent Transmissions",
      "home.section.ops": "Hacks & Opportunities",
      "home.viewall": "View all",
      "home.donations": "Support my work",
      "blog.title": "Tech Log",
      "blog.subtitle": "Deep technical dives across my entire stack from low-level C on bare-metal to high-level system architecture and mathematical models.",
      "back": "Back",
      "projects.title": "Projects & Arch",
      "projects.subtitle": "A selection of my personal projects spanning Hardware, Firmware, InfoSec, and Cloud.",
      "nexus.title": "Nexus (Drive & Tools)",
      "nexus.subtitle": "A curated compendium of tools, free PDFs, simulators, and essential developer links.",
      "ops.title": "Hacks & Ops",
      "ops.subtitle": "Latest tutorials on cheap VPS staging, globally roaming eSIMs, leveraging free AI compute, and token arbitrage.",
      "download": "Download",
      "tech.embedded": "Embedded & HW",
      "tech.desc.embedded": "STM32, ESP32, RTOS, PCB Design, Robotics (ROS)",
      "tech.cyber": "Cybersecurity",
      "tech.desc.cyber": "Pentesting, Zero-Trust, Network Def, Exploitation",
      "tech.ai": "AI & ML",
      "tech.desc.ai": "Deep Learning, RL, Optimization, TinyML deployed to edge",
      "tech.fullstack": "Full-Stack & Cloud",
      "tech.desc.fullstack": "React, Node, Rust, Cloud Native Architecture",
      "tool.shodan": "Search engine for the Internet of Things",
      "tool.wokwi": "Online Arduino/ESP32 Simulator",
      "tool.godbolt": "Compiler Explorer for C/C++/Rust assembly inspection",
      "tool.kaggle": "Machine Learning Datasets & Notebooks",
      "tool.exploit": "CVE and Exploit Database",
      "opp.vps": "How to stack coupons for extremely cheap Linux VPS servers (good for edge staging).",
      "opp.esim": "Reviewing the best worldwide eSIM providers with low IoT data rates.",
      "opp.ai": "Maximizing free daily GPU allocations for LLM finetuning."
    }
  },
  zh: {
    translation: {
      "nav.home": "首页",
      "nav.blog": "技术博客",
      "nav.nexus": "资源与工具",
      "nav.projects": "项目介绍",
      "nav.ops": "羊毛与商机",
      "footer.text": "Lapinex 技术枢纽. 纯静态网页架构.",
      "footer.tags": "AIoT • 网络安全 • 边缘计算 • 人工智能 • 全栈开发",
      "home.title.architecting": "构建系统：从",
      "home.title.silicon": "硅芯片",
      "home.title.to": "到",
      "home.title.cloud": "万物云",
      "home.subtitle": "我是一名嵌入式系统设计师与多语言开发者。这里记录了我在AIoT、网络安全、边缘AI建模和云原生全栈开发路上的探索。",
      "home.intro": "我对从底层硬件到高层架构的技术充满热情。欢迎访问我的GitHub主页：",
      "home.btn.blog": "阅读技术博客",
      "home.btn.projects": "浏览个人项目",
      "home.section.tech": "技术栈",
      "home.section.recent": "最新发布",
      "home.section.ops": "商机与技巧",
      "home.viewall": "查看全部",
      "home.donations": "打赏支持",
      "blog.title": "技术日志",
      "blog.subtitle": "从裸机C语言到底层架构，再到数学模型与深层技术探讨。",
      "back": "返回",
      "projects.title": "项目与架构",
      "projects.subtitle": "精选个人项目，涵盖硬件、固件、安全与云原生。",
      "nexus.title": "资源与开发者工具",
      "nexus.subtitle": "聚合网盘资源、AI工具盘点、仿真器以及各类开发者网址链接。",
      "ops.title": "翻/VPS/开卡/羊毛",
      "ops.subtitle": "关于低价VPS、全球漫游eSIM、免费算力白嫖以及数字资产套利的最新教程。",
      "download": "下载",
      "tech.embedded": "系统与硬件",
      "tech.desc.embedded": "STM32, ESP32, RTOS, PCB设计, ROS机器人",
      "tech.cyber": "网络安全",
      "tech.desc.cyber": "渗透测试, 零信任架构, 攻防与拦截",
      "tech.ai": "AI与机器学习",
      "tech.desc.ai": "深度学习, 强化学习, 最优化方法, 模型部署",
      "tech.fullstack": "全栈开发",
      "tech.desc.fullstack": "React, Node, Rust, 计算机基础与数据库",
      "tool.shodan": "IoT物联网搜索引擎",
      "tool.wokwi": "在线Arduino/ESP32仿真器",
      "tool.godbolt": "C/C++/Rust汇编代码编译器浏览器",
      "tool.kaggle": "机器学习数据集与Notebook",
      "tool.exploit": "CVE与漏洞利用数据库",
      "opp.vps": "如何叠加优惠劵获取极廉价Linux VPS (适合做节点或跳板机).",
      "opp.esim": "盘点提供低IoT费率的优质全球漫游eSIM.",
      "opp.ai": "最大化利用每日免费GPU额度进行大模型微调."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "zh",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
