# 项目详情

`nekomusic` 是一款基于 Electron 开发的桌面音乐播放器应用。它旨在提供流畅的音乐播放体验，结合了现代化的前端技术栈和桌面端能力。

## 核心功能
- 音乐播放与控制
- 歌词显示与同步
- 搜索与发现
- 本地与在线资源集成

# 技术栈

## 核心框架
- **Runtime**: [Electron](https://www.electronjs.org/) (v35.0.1)
- **Frontend Framework**: [Vue 3](https://vuejs.org/) (v3.4.30)
- **Build Tool**: [electron-vite](https://electron-vite.org/) (v3.0.0)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 状态管理与路由
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)

## UI 组件与样式
- **UI Frameworks**: [Ant Design Vue](https://www.antdv.com/), [Element Plus](https://element-plus.org/)
- **Styling**: [Less](https://lesscss.org/), [Sass](https://sass-lang.com/), [Animate.css](https://animate.style/)
- **Animation**: [GSAP](https://gsap.com/)
- **Icons**: Iconfont

## 交互与工具
- **Scrolling**: [BetterScroll](https://better-scroll.github.io/docs/zh-CN/) (Core, Infinity, MouseWheel, etc.)
- **Utilities**: [VueUse](https://vueuse.org/), [Axios](https://axios-http.com/), [Day.js](https://day.js.org/)
- **Backend/API**: Express (内置), OpenAI SDK

# 开发规范

## 代码风格
- **Linting**: 使用 [ESLint](https://eslint.org/) 进行代码检查，遵循 `@electron-toolkit/eslint-config`。
- **Formatting**: 使用 [Prettier](https://prettier.io/) 进行代码格式化。
- **Naming**:
  - 组件文件采用 PascalCase (如 `MusicItem/index.vue`)。
  - 变量与函数采用 camelCase。
  - 常量采用 UPPER_SNAKE_CASE。

## 目录结构规范
- `src/main`: Electron 主进程代码。
- `src/preload`: 预加载脚本。
- `src/renderer`: Vue 前端代码。
  - `src/renderer/src/api`: 接口定义。
  - `src/renderer/src/components`: 公共组件。
  - `src/renderer/src/hooks`: 组合式 API (Composition API)。
  - `src/renderer/src/pinia`: 状态管理。
  - `src/renderer/src/views`: 页面视图。

## 提交规范
- 建议遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。
- 提交前需通过 `npm run lint` 和 `npm run typecheck`。
