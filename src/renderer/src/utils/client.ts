import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/client' : 'http://localhost:3000', // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 0 // request timeout
})

// request interceptor
client.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
client.interceptors.response.use(
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

export default client
