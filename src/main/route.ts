import express from 'express'
import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-c5b65a4cbb88478984407ab9b47b6b8f'
})

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

//openai

router.post('/deepseek-chart', async (req, res) => {
  try {
    console.log(req.body)
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: req.body.messages }],
      model: 'deepseek-chat'
    })
    console.log(completion.choices[0].message.content)
    res.json({ data: completion, code: 200 })
  } catch (error) {
    //
    res.status(500).json({ error })
  }
})

export default router
