import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

export const getDefaultLocalDateTime = () => {
  return dayjs(new Date()).format('YYYY-MM-DDTHH:mm')
}

export const gitDistanceFromBirth = (eventDate, birthDate) => {
  const end = dayjs(eventDate, 'YYYY-MM-DDTHH:mm')
  const start = dayjs(birthDate, 'YYYY-MM-DDTHH:mm')

  const yearDiff = end.diff(start, 'year')
  const monthDiff = end.diff(start, 'month')
  const dayDiff = end.diff(start, 'day')

  return [yearDiff, monthDiff, dayDiff]
}
