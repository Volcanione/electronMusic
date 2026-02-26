import { DeepSeekChart } from '@renderer/api/client'

export const DeepSeekChartHook = () => {
  const chart = async () => {
    try {
      const { data } = await DeepSeekChart({
        messages: '你好，你是谁'
      })
      console.log(data)
    } catch (error) {
      //
    }
  }

  return {
    chart
  }
}
