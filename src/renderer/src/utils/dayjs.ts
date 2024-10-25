import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)

export default dayjs
