import { ElectronAPI } from '@electron-toolkit/preload'

declare interface Window {
  electron: ElectronAPI
  api: unknown
}
