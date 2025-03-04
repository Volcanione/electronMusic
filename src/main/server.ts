import express from 'express'
import cors from 'cors'
// import { promises as fs } from 'fs'
import ApiRoute from './route'

// 启动 Express 服务器
// let server;
export default function () {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  const port = 3000
  // 允许跨域（开发环境用）
  app.use((req, res, next) => {
    console.log(req)
    res.header('Access-Control-Allow-Origin', '*')
    next()
    // console.log(req)
  })

  // 或者自定义配置 CORS
  const corsOptions = {
    origin: '*', // 允许访问的来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
  }

  app.use(cors(corsOptions))

  // 静态文件服务（可选）
  // app.use(express.static(path.join(__dirname, '../../resources')))
  app.use('/client', ApiRoute)
  app.listen(port, 'localhost', () => {
    console.log(`本地服务运行在 http://localhost:${port}`)
  })
}
