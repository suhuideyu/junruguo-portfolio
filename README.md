# 郭君茹个人网站与 GitHub 作品集

面向 2027 校招的中文求职型个人网站，主定位为售前工程师 / 解决方案工程师，同时呈现软件实施、数字化项目交付与持续构建产品的能力。

当前基础版包含：

- 编辑式视频首屏、极简固定导航与联系入口
- 个人介绍、联系方式、项目数据和三段实践经历
- 四个精选项目大卡片与十个 GitHub 公开作品入口
- 四项个人优势
- 全屏联系方式收尾页

页面采用 React、Vite、TypeScript 和原生 CSS，以暖米白、深棕和琥珀色构成编辑式视觉系统。桌面端版心最大约 1700px，并保留平板、手机和低动态模式适配。

## 本地运行

```bash
npm install
npm run dev
```

按终端输出访问本地地址，默认通常为 `http://127.0.0.1:5173`。

## 构建与检查

```bash
npm run lint
npm run build
npm run build:sites
npm run preview
```

生产构建输出到 `dist/`；`build:sites` 会将浏览器资源整理到 `dist/client/`，并生成 Sites 所需的静态站点入口。

## 更新内容

- 个人资料、经历、GitHub 项目与联系方式：`src/data/portfolio.ts`
- 页面结构与交互：`src/App.tsx`
- 色彩、排版与响应式样式：`src/styles.css`
- 首页视频与照片：`public/show-background.mp4`、`public/profile-hero.jpg`
- 精选项目图片：`public/projects/`

内容更新时坚持使用已确认事实，不将练习、原型或本地项目描述为真实企业上线成果。
