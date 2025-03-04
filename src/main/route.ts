import express from 'express'
const router = express.Router()

router.get('/users', (req, res) => {
  try {
    console.log(req)
    res.json({ data: { test: 1 }, code: 200 })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: '读取文件失败' })
  }
})

export default router
