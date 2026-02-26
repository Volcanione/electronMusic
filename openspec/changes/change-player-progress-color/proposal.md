## Why

用户希望将主界面环形播放器进度条颜色从当前的蓝色更改为橙黄色，以提升视觉体验。

## What Changes

- 修改环形进度条的填充颜色。
- 将 `src/renderer/src/layout/player/HomeController/components/playProgress.vue` 中的 SVG 路径 `stroke` 颜色从 `#20a0ff` 改为橙黄色（例如 `#ff9900`）。

## Capabilities

### New Capabilities
- 无

### Modified Capabilities
- `player-ui`: 修改环形播放器进度条的视觉样式。

## Impact

- **Affected code**: `src/renderer/src/layout/player/HomeController/components/playProgress.vue`
- **Dependencies**: 无
- **Systems**: 仅影响前端渲染层的 UI 表现。
