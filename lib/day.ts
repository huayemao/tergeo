import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

export const getDefaultLocalDateTime = () => {
  return dayjs(new Date()).format('YYYY-MM-DDTHH:mm')
}
