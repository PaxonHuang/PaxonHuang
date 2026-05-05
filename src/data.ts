export const PROJECTS = [
  {
    name: 'ROS2 Autonomy Stack',
    desc: 'Autonomous navigation stack using ROS2, Lidar, and Jetson Nano for SLAM.',
    tags: ['C++', 'ROS2', 'Robotics'],
    link: 'https://github.com/PaxonHuang/ros2-autonomy-stack'
  },
  {
    name: 'STM32 Drone Flight Controller',
    desc: 'Custom PCB design + embedded C firmware with kalman filtering for a quadcopter.',
    tags: ['Altium', 'C', 'STM32', 'Control Theory'],
    link: 'https://github.com/PaxonHuang/stm32-fc'
  },
  {
    name: 'Edge AI Anomaly Detector',
    desc: 'TensorFlow Lite model deployed on ESP32-S3 for acoustic anomaly detection.',
    tags: ['Python', 'TinyML', 'ESP32'],
    link: 'https://github.com/PaxonHuang/edge-ai-anomaly'
  },
  {
    name: 'VNet Guard',
    desc: 'Cloud-native zero-trust network gateway built with Rust and WebAssembly.',
    tags: ['Rust', 'Cloud Native', 'WASM'],
    link: 'https://github.com/PaxonHuang/vnet-guard'
  }
];

export const CLOUD_RESOURCES = [
  { name: '1000+ AI/ML Papers Collection (2024-2026)', size: '2.4 GB', link: 'https://huggingface.co/papers' },
  { name: 'PCB Design Blueprints & Altium Libraries', size: '850 MB', link: 'https://github.com/PaxonHuang/pcb-libraries' },
  { name: 'Embedded C/C++ Best Practices PDF Bundle', size: '120 MB', link: 'https://barrgroup.com/embedded-systems/books/embedded-c-coding-standard' },
  { name: 'Red Team Cheatsheets & Scripts', size: '45 MB', link: 'https://github.com/PaxonHuang/redteam-scripts' }
];

export const TOOL_LINKS = [
  { name: 'Shodan', descKey: 'tool.shodan', desc: 'Search engine for the Internet of Things', url: 'https://shodan.io' },
  { name: 'Wokwi', descKey: 'tool.wokwi', desc: 'Online Arduino/ESP32 Simulator', url: 'https://wokwi.com' },
  { name: 'Godbolt', descKey: 'tool.godbolt', desc: 'Compiler Explorer for C/C++/Rust assembly inspection', url: 'https://godbolt.org' },
  { name: 'Kaggle', descKey: 'tool.kaggle', desc: 'Machine Learning Datasets & Notebooks', url: 'https://kaggle.com' },
  { name: 'Exploit-DB', descKey: 'tool.exploit', desc: 'CVE and Exploit Database', url: 'https://exploit-db.com' }
];

export const OPPORTUNITIES = [
  {
    title: 'RackNerd / CloudCone VPS - $10/Year Deals',
    type: 'VPS',
    descKey: 'opp.vps',
    desc: 'How to stack coupons for extremely cheap Linux VPS servers (good for edge staging, VPN routing, and basic hosting).',
    url: 'https://lowendbox.com/blog/category/hosting/'
  },
  {
    title: 'Eskimo / Airalo Global eSIMs - Free Data Promos',
    type: 'eSIM',
    descKey: 'opp.esim',
    desc: 'Reviewing the best worldwide eSIM providers with low IoT data rates. Use referral deals for 1GB+ free roaming data.',
    url: 'https://www.airalo.com/'
  },
  {
    title: 'Free GPU Compute via Colab / Kaggle',
    type: 'AI Compute',
    descKey: 'opp.ai',
    desc: 'Maximizing free daily GPU allocations for LLM finetuning. T4 to A100 tricks and limits.',
    url: 'https://colab.research.google.com/'
  }
];
