## Context

环形进度条组件位于 `src/renderer/src/layout/player/HomeController/components/playProgress.vue`。目前进度条的填充路径使用硬编码的蓝色 (`#20a0ff`)。

## Goals / Non-Goals

**Goals:**
- 将环形进度条填充颜色更改为橙黄色。

**Non-Goals:**
- 不改变 SVG 路径结构或动画逻辑。
- 不改变背景轨道颜色 (`#e5e9f2`)。

## Decisions

- **颜色选择**: 使用 `#ff9900` 作为橙黄色。
- **实现方式**: 修改 `playProgress.vue` 中第 33 行的 `stroke` 属性。

## Risks / Trade-offs

- **[Risk] 颜色不统一** → **Mitigation**: 仅针对用户指定的环形进度条进行修改。
