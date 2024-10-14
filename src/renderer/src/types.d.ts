import { AxiosRequestConfig } from 'axios'

declare interface Window {
  api: {
    exit: () => void
  }
}

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
