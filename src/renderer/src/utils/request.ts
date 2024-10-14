import axios from 'axios'
import { AxiosResponse } from 'axios'
import { RequestCookieKey } from '@renderer/config/index'
import { useStorage } from '@vueuse/core'

interface ApiResponse {
  status: number
  message: string
  data?: any
}

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 0 // request timeout
})

// request interceptor
service.interceptors.request.use(
  async (config) => {
    const { params = {}, data } = config
    const cookie = useStorage(RequestCookieKey, undefined)
    console.log(cookie)
    params['timestamp'] = +new Date()

    if (data?.limit && data?.offset) {
      data.offset = data.offset * data.limit
    }

    if (params?.limit && params?.offset) {
      params.offset = params.offset * params.limit
    }

    cookie.value && (params['cookie'] = cookie.value)
    config.params = params

    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res: any = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (response?.data?.size) {
      return res
    }
    if (res?.data?.code === 200) {
      return res
    }
    if (res.code !== 200 && !res.success) {
      return Promise.reject(res)
    }
    return res
  },
  async (error) => {
    const code = error.response?.data?.code
    if (code !== 301) {
      // $msg({ title: error.response?.data?.msg });
    }
    return Promise.reject(error)
  }
)

export default service
