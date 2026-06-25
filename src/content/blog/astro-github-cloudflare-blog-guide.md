---
slug: astro-github-cloudflare-blog-guide
title: 'Astro + GitHub + Cloudflare 全栈博客搭建指南'
date: '2026-06-25'
category: DevOps
tags: ["Astro", "Cloudflare Pages", "Tutorial", "Markdown", "DevOps", "Web"]
excerpt: '从零搭建一个高性能、可定制、自动部署的个人技术博客。涵盖 Astro 架构、Markdown 全特性支持（GFM / KaTeX / 代码高亮）、Cloudflare Pages 自动化部署、二次开发与排错指南。'
---

> 这是博客本身的"自我介绍"。它既是教程文档，也是博客格式特性的活样本——读完它你就掌握了在这个仓库里写文章的全部能力。

## 为什么选这套技术栈

| 维度 | 传统方案 (WordPress / Hexo) | 本项目 (Astro + CF Pages) |
|------|----------------------------|--------------------------|
| 写作体验 | 在线编辑器或本地 Markdown 需手动构建 | **写完 `git push` 即部署**，零手动步骤 |
| 部署成本 | 服务器 $5+/月 + 维护 | **$0**（Cloudflare Pages 免费额度足够）|
| 首屏 JS | 100-500 KB 框架运行时 | 文章页 **< 30 KB**，Markdown 编译时静态化 |
| 数学公式 | 需引入 MathJax / KaTeX CDN | 内置 `rehype-katex`，构建时渲染 |
| 自定义能力 | 受主题模板约束 | **全代码可控**，CSS / 组件任你改 |
| 全球化分发 | 单点机房 | **300+ CDN 节点**，自动就近访问 |

核心理念：**把博客写成一个版本化的代码项目**，文章就是 Markdown 文件，部署就是 `git push`。

## 架构总览

```
┌────────────────────────────────────────────────────────────────────┐
│                          GitHub (origin/main)                       │
│   ┌────────────┐   ┌────────────┐   ┌────────────┐                │
│   │ .md 文章   │   │ .astro 页面 │   │ .tsx 组件  │                │
│   └─────┬──────┘   └─────┬──────┘   └─────┬──────┘                │
│         └──────────────────┴───────────────┘                        │
│                            │ git push                                │
└────────────────────────────┼─────────────────────────────────────┘
                             ▼
        ┌────────────────────────────────────────────┐
        │        Cloudflare Pages (Auto Build)       │
        │   1. npm ci  →  2. astro build  →  3. CDN  │
        └────────────────────┬───────────────────────┘
                             ▼
              https://paxonhuang.pages.dev
                             │
                             ▼
            ┌──────────────────────────────────┐
            │   访客浏览器（300+ 全球节点）     │
            │   静态 HTML + 0 框架运行时        │
            └──────────────────────────────────┘
```

### 技术栈组成

- **Astro 5.x** — 静态站点生成器，默认 0 JS shipping
- **React 19** — 仅用于需要交互的组件（导航栏、博客列表筛选器）
- **Tailwind CSS 4** — Vite 插件直接集成，CSS-first 配置
- **TypeScript 5** — 类型安全
- **Content Collections** — Astro 内置的 Markdown 内容管理
- **remark-gfm / remark-math** — Markdown 扩展与数学公式
- **rehype-katex / rehype-slug** — 公式渲染与标题锚点
- **Cloudflare Pages** — 全球 CDN + 自动构建
- **GitHub** — 版本控制 + 触发部署

## 快速开始

### 环境要求

- Node.js **22 LTS**（项目固定在 `engines` 与 CI 中）
- npm 10+（或 pnpm / yarn，自行替换 `package.json` 的 scripts）
- Git

### 本地开发

```bash
git clone https://github.com/PaxonHuang/PaxonHuang.git
cd PaxonHuang
npm ci                # 安装依赖（推荐用 ci 而非 install，强制使用 lockfile）
npm run dev           # 启动开发服务器
```

开发服务器默认在 <http://localhost:3000>，支持热重载。

### 生产构建

```bash
npm run build         # 输出到 dist/ 目录
npm run preview       # 本地预览生产构建
```

构建时间约 25-30 秒，输出 `dist/` 约 775 KB（含所有页面与静态资源）。

## 写一篇新博文

### 1. 创建 Markdown 文件

在 `src/content/blog/` 目录下新建 `.md` 文件，**文件名即为 URL slug**（去掉 `.md` 后缀）：

```bash
# 文件名: my-first-post.md  →  URL: /blog/my-first-post
touch src/content/blog/my-first-post.md
```

> ⚠️ **不要**在 frontmatter 的 `slug` 字段自定义 slug，除非你想覆盖文件名。保持文件名即 slug 的约定能避免重定向与 SEO 损耗。

### 2. Frontmatter 元数据

每篇文章的 YAML frontmatter 是必需的，用于构建时注入元信息：

```yaml
---
slug: my-first-post                       # 可选，默认使用文件名
title: 'My First Post'                    # 必填，显示在文章页和列表
date: '2026-06-25'                        # 必填，ISO 格式
category: Tutorial                        # 必填，用于筛选与展示
tags: ["Markdown", "Guide", "Tutorial"]   # 必填，数组，至少 1 个
excerpt: '一段 1-2 句的摘要...'           # 必填，显示在卡片与 SEO
---
```

字段类型在 `src/content.config.ts` 中用 Zod schema 强约束，构建时会自动校验。

### 3. Markdown 全特性演示

下面演示这个博客**支持的所有 Markdown 格式**。每一种都可以直接复制使用。

#### 标题层级

```markdown
# H1（文章内不再使用，标题已在 frontmatter.title 中）
## H2 — 一级章节
### H3 — 二级章节
#### H4 — 三级章节
```

#### 文本强调

可以 _斜体_、**粗体**、**_粗斜体_**、`行内代码`、~~删除线~~。外链：[Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)。

#### 列表（有序 / 无序 / 任务列表）

- 无序列表项 1
  - 嵌套项
  - 另一个嵌套项
- 无序列表项 2

1. 有序列表步骤 1
2. 有序列表步骤 2
3. 有序列表步骤 3

- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个待办

#### 表格（GFM）

| 特性 | 支持情况 | 备注 |
|------|:--------:|------|
| GFM 表格 | ✅ | 默认开启 |
| 任务列表 | ✅ | `- [x]` 语法 |
| 删除线 | ✅ | `~~text~~` |
| 自动链接 | ✅ | URL 自动转链接 |
| 脚注 | ⚠️ | 需 `remark-gfm` 增强 |

#### 引用块（Blockquote）

> 这是引用块。可以用来强调一段引文、提示或警告。
>
> —— 鲁迅（如果他说过这句话的话）

嵌套引用：

> 外层引用
>
> > 内层引用
> >
> > > 三层嵌套

#### 行内代码与代码块

行内：`npm install` 是常用命令。

代码块支持语言标注，自动启用 **Shiki 语法高亮**（构建时静态化，运行时 0 JS）：

```bash
# 安装依赖
npm ci
npm run dev
```

```typescript
// TypeScript: 带类型注解的示例
interface Article {
  slug: string;
  title: string;
  date: Date;
  tags: string[];
}

function getReadingTime(article: Article): number {
  const words = article.title.length + article.tags.join('').length;
  return Math.ceil(words / 220);
}
```

```python
# Python: 数据科学常用
import numpy as np

def softmax(x: np.ndarray) -> np.ndarray:
    e_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
    return e_x / e_x.sum(axis=-1, keepdims=True)
```

```c
// C: 嵌入式开发
void vTaskLed(void *pvParameters) {
  for (;;) {
    HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
    vTaskDelay(pdMS_TO_TICKS(500));
  }
}
```

```rust
// Rust: 系统编程
fn main() {
    let mut counter = 0;
    for _ in 0..5 {
        counter += 1;
        println!("counter = {counter}");
    }
}
```

支持的语言完整列表见 [Shiki 支持的语言](https://shiki.style/languages)。

#### 数学公式（KaTeX）

行内公式用单个 `$` 包裹：质能方程 $E = mc^2$，欧拉恒等式 $e^{i\pi} + 1 = 0$。

块级公式用双 `$$` 包裹，居中显示并带左侧信号条边框：

$$
\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t}
$$

$$
\mathcal{L} = \bar{\psi}(i\gamma^\mu D_\mu - m)\psi - \frac{1}{4}F_{\mu\nu}F^{\mu\nu}
$$

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left( -\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2 \right)
$$

支持完整的 LaTeX 语法，详见 [KaTeX 支持的函数列表](https://katex.org/docs/supported.html)。

#### 图片

相对路径（推荐，文件随仓库走）：

```markdown
![Alt 文字](/images/my-image.png)
```

外链（适合托管在 CDN 的图）：

```markdown
![架构图](https://example.com/architecture.png)
```

> 💡 **配图建议**：图片放在 `public/images/` 目录下，使用相对路径。Cloudflare Pages 会原样部署 `public/` 下的所有文件。

#### 水平分隔线

---

上面那条线就是 `---`（在 `&lt;h2&gt;` 之前是 `setext` 标题，否则是分隔线）。

#### HTML 嵌入（高级）

Markdown 允许直接嵌入 HTML（用于组件级别的定制），但**不推荐**——优先用 `rehype` 插件或自定义 `.astro` 组件实现。

<details>
<summary><b>📦 折叠块（GFM）</b></summary>

这是一个可折叠的内容块，适合放长篇代码、配置示例或附录。

```yaml
# 完整的 wrangler.jsonc
{
  "name": "paxonhuang",
  "pages_build_output_dir": "./dist",
  "compatibility_date": "2025-01-01"
}
```

</details>

## 部署流程：写完即上线

### 完整流水线

```
本地写稿 ─► git add/commit ─► git push origin main
                                       │
                                       ▼
                            Cloudflare Dashboard
                                       │
                  ┌────────────────────┴────────────────────┐
                  │ 1. 检测到 main 分支 push                 │
                  │ 2. 触发自动 build (npm ci + astro build) │
                  │ 3. 上传 dist/ 到 Cloudflare Pages        │
                  │ 4. 部署到生产 URL（~30-60s）             │
                  └────────────────────┬────────────────────┘
                                       ▼
                          https://paxonhuang.pages.dev
```

### 实际步骤

```bash
# 1. 写完文章后提交
git add src/content/blog/my-new-post.md
git commit -m "feat(blog): publish 'My New Post'"

# 2. 推送到 GitHub
git push origin main

# 3. 打开 Cloudflare Dashboard 查看部署进度
#    https://dash.cloudflare.com → Workers & Pages → paxonhuang
```

### 部署 URL 规则

| 触发条件 | URL 模式 | 生命周期 |
|----------|----------|----------|
| 推送到 `main` 分支 | `https://paxonhuang.pages.dev/<path>` | 永久生产 |
| 推送到其他分支 | `https://<commit-hash>.paxonhuang.pages.dev/<path>` | 保留至清理 |
| PR 预览 | PR 评论中自动附 preview URL | 关闭 PR 后清理 |

> 💡 文章页 URL 即 `src/content/blog/` 下 `.md` 文件名（去后缀）的前缀。

### 回滚

万一某次部署出错，Cloudflare Dashboard → Workers & Pages → `paxonhuang` → **Deployments** → 选中历史正常版本 → **Rollback to this deploy**。

## 二次开发指南

### 1. 调整主题色 / 字体

所有设计 token 集中在 `src/styles/globals.css` 的 `@theme {}` 块：

```css
@theme {
  /* 主色：磷光青（PCB trace 走线色） */
  --color-primary-500: #06b6d4;

  /* 暗色底：FR-4 阻焊层黑 */
  --color-dark-950: #0a0e14;

  /* 字体三件套 */
  --font-display: "Space Grotesk", ...;
  --font-prose: "IBM Plex Serif", ...;
  --font-mono: "JetBrains Mono", ...;
}
```

修改后 `npm run dev` 即可热重载看到效果。

### 2. 添加新页面

Astro 使用**文件路由**，在 `src/pages/` 下新建 `.astro` 文件即可：

```bash
# 创建 /about 页面
touch src/pages/about.astro
```

```astro
---
import Layout from '../layouts/Layout.astro';
const title = 'About Me';
---
<Layout title={title}>
  <h1>关于我</h1>
  <p>...</p>
</Layout>
```

### 3. 添加新组件

- **静态组件**（无交互）：在 `src/components/` 下新建 `.astro` 文件
- **交互组件**（需 useState / useEffect）：新建 `.tsx` 文件，父页面用 `client:load` 指令挂载

```astro
<!-- 在页面中挂载 React 组件 -->
<MyInteractiveWidget client:load someProp="value" />
```

### 4. 修改文章页布局

文章页布局在 `src/components/BlogArticle.astro` 中。修改它会影响所有文章页的：
- Datasheet 封面头图
- 顶部阅读进度条
- 章节导航
- 正文排版（通过 `prose` 类控制）

### 5. 国际化（i18n）

UI 文案（导航、按钮、占位符）在 `src/i18n.ts` 中维护，目前支持中英双语。要新增语言：

1. 在 `src/i18n.ts` 的 `resources` 中添加新语言包
2. 在 `Layout.tsx` 的语言切换按钮中增加 case
3. 同步翻译所有 key

### 6. 启用评论 / 搜索 / RSS

这些功能目前未集成。如需启用：

| 功能 | 推荐方案 | 集成方式 |
|------|----------|----------|
| 评论 | Giscus（基于 GitHub Discussions） | 在文章页底部嵌入 script |
| 全文搜索 | Pagefind（构建时生成索引） | `npx pagefind --site dist` |
| RSS | `@astrojs/rss` | 在 `src/pages/rss.xml.ts` 配置 |

## 排错速查

| 症状 | 原因 | 修复 |
|------|------|------|
| 本地 `npm ci` 报 `ERESOLVE` | 依赖版本冲突 | 删除 `node_modules` + `package-lock.json` 后 `npm install` |
| 构建报 `Could not read package.json` | Cloudflare 监听了错误分支 | Dashboard → Production branch 改为 `main` |
| 文章页 KaTeX 不渲染 | Markdown 缺少 `$$` 包裹或 `astro.config.mjs` 漏配插件 | 确认 `remark-math` + `rehype-katex` 在配置中 |
| 部署后样式没变化 | Cloudflare CDN 缓存 | 硬刷新（Cmd/Ctrl+Shift+R）或加 `?v=N` 缓存破坏参数 |
| 移动端正文过窄 | 误用了固定 `px` 宽度 | 改用 `max-w-[68ch]` 字符单位 |
| 中文字体没加载 | Google Fonts 网络问题 | 在 `globals.css` 加 `@font-face` 指向本地字体文件 |

## 性能数据

实测本仓库最近一次构建（`npm run build`）：

```
✓ 8 page(s) built in 24.31s
dist/ total: 775 KB
article-page-specific JS: 0 KB (Markdown 编译时静态化)
shared JS: 363 KB (Layout + React runtime)
first-load JS (gzip): ~120 KB
```

## 版权与许可

本文采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议授权：

- **署名** — 需注明作者（Paxon Huang）与原文链接
- **非商业** — 不得用于商业用途
- **相同方式共享** — 衍生作品需采用相同协议

代码部分（`*.astro` / `*.tsx` / `*.css` / `*.ts`）采用 [MIT License](https://opensource.org/licenses/MIT)。

如需引用本文的部分内容，请保留以下出处：

```
Paxon Huang, "Astro + GitHub + Cloudflare 全栈博客搭建指南",
Lapinex Tech Blog, 2026-06-25, https://paxonhuang.pages.dev/blog/astro-github-cloudflare-blog-guide
```

---

**下一步建议**：复制本文到 `src/content/blog/`，改一两个字段，`git push` 体验一下完整流水线。任何问题欢迎在 [GitHub Issues](https://github.com/PaxonHuang/PaxonHuang/issues) 反馈。
