# NekoMusic

`NekoMusic` 是一款基于 Electron 开发的现代化桌面音乐播放器应用。它结合了 Vue 3 的灵活性与 Electron 的桌面端能力，旨在为用户提供流畅、美观的音乐播放体验。

## 🚀 技术栈

### 核心架构
- **Runtime**: [Electron](https://www.electronjs.org/) (v35.0.1)
- **Frontend Framework**: [Vue 3](https://vuejs.org/) (v3.4.30)
- **Build Tool**: [electron-vite](https://electron-vite.org/) (v3.0.0)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

### 状态管理与路由
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)

### UI 与 样式
- **UI Frameworks**: [Ant Design Vue](https://www.antdv.com/), [Element Plus](https://element-plus.org/)
- **Styling**: [Less](https://lesscss.org/), [Sass](https://sass-lang.com/), [Animate.css](https://animate.style/)
- **Animation**: [GSAP](https://gsap.com/)
- **Icons**: Iconfont

---

## 🧩 核心模块实现思路

### 1. 播放器核心逻辑 (Audio Core)
项目通过 `AudioHook` 封装了原生的 `HTMLAudioElement`，实现了音频播放的解耦。

**实现思路：**
- **状态驱动**: 使用 Vue 的 `reactive` 维护播放状态。
- **事件监听**: 封装原生事件（`ontimeupdate`, `onended` 等）并同步到响应式对象。

**代码示例 ([`src/renderer/src/hooks/audioHook.ts`](src/renderer/src/hooks/audioHook.ts)):**
```typescript
export const AudioHook = () => {
  const audioElement = ref<HTMLAudioElement>()
  const mediaParam = reactive({
    duration: 0,
    currentTime: 0,
    playState: false,
    progress: computed(() => {
      return +((mediaParam.currentTime / mediaParam.duration) * 100).toFixed(3)
    })
  })

  const initAudio = () => {
    audioElement.value = new Audio()
    // 监听进度更新
    audioElement.value.ontimeupdate = () => {
      mediaParam.currentTime = audioElement.value?.currentTime || 0
    }
    // 监听播放结束
    audioElement.value.onended = () => {
      mediaParam.onended && mediaParam.onended()
    }
  }
  return { initAudio, audioElement, mediaParam }
}
```

### 2. 播放列表与模式管理 (Player Store)
基于 Pinia 的 `storePlayer` 模块处理复杂的切歌逻辑。

**实现思路：**
- **模式切换**: 通过数组索引循环切换 `alone` | `list` | `random`。
- **切歌逻辑**: 根据当前模式计算下一首歌曲的索引。

**代码示例 ([`src/renderer/src/pinia/player.ts`](src/renderer/src/pinia/player.ts)):**
```typescript
export const storePlayer = defineStore('player', () => {
  const playerConfig = reactive({ playerMode: 'list', nowPlayId: '' })
  const playerList = reactive([])

  const nextMusic = () => {
    const idx = findIndex(playerList, ['id', playerConfig.nowPlayId])
    switch (playerConfig.playerMode) {
      case 'list': // 列表循环
        return playerList[idx === playerList.length - 1 ? 0 : idx + 1]
      case 'random': // 随机播放
        return getRandomItem()
      case 'alone': // 单曲循环
        return playerList[idx]
    }
  }
  return { playerConfig, playerList, nextMusic }
})
```

### 3. 歌词同步系统 (Lyric System)
**实现思路：**
- **解析**: 将 LRC 格式字符串解析为 `[{ time: number, text: string }]` 数组。
- **匹配**: 监听 `currentTime`，查找时间戳小于当前时间且最接近的那一行。

### 4. 交互与动画 (Interaction & Animation)
- **平滑滚动**: 集成 `BetterScroll` 处理歌词和歌曲列表。
- **视觉反馈**: 使用 `GSAP` 处理唱片旋转动画，通过 `playState` 控制动画的 `paused` 状态。

---

## 📂 项目结构

```text
nekoMusic/
├── src/
│   ├── main/          # Electron 主进程 (窗口管理、本地服务)
│   ├── preload/       # 预加载脚本 (安全桥接)
│   └── renderer/      # 渲染进程 (Vue 3 应用)
│       └── src/
│           ├── api/        # 接口定义 (Axios 封装)
│           ├── hooks/      # 核心逻辑封装 (audioHook, playerHook 等)
│           ├── pinia/      # 全局状态 (player, router)
│           ├── layout/     # 核心布局 (PlayerController, HomeController)
│           └── views/      # 业务页面 (Home, Music, Radio, Search)
├── openspec/          # OpenSpec 规范文档与变更记录
└── electron.vite.config.ts # 构建配置文件
```

## 🛠️ 开发指南

### 安装与启动
```bash
npm install
npm run dev
```

### 构建打包
```bash
npm run build:win   # Windows
npm run build:mac   # macOS
```

## 📜 开发规范
- **组件化**: 遵循 `PascalCase` 命名，逻辑尽量抽离至 `hooks`。
- **状态管理**: 涉及全局播放状态的修改必须通过 `storePlayer` 的 actions 完成。
- **类型安全**: 严格使用 TypeScript 定义接口数据模型。
