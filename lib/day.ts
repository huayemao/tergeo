import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

export const getDefaultLocalDateTime = () => {
  return dayjs(new Date()).format('YYYY-MM-DDTHH:mm')
}

export const getAgeDetails = (eventDate, birthDate) => {
  const newDate = dayjs(eventDate, 'YYYY-MM-DDTHH:mm')
  const oldDate = dayjs(birthDate, 'YYYY-MM-DD')
  const years = newDate.diff(oldDate, 'year')
  const months = newDate.diff(oldDate, 'month') - years * 12
  const days = newDate.diff(
    oldDate.add(years, 'year').add(months, 'month'),
    'day'
  )

  const arr = ['岁', '个月', '天']
  const label = [years, months, days]
    .map((e, i) => (Number(e) !== 0 ? e + arr[i] : ''))
    .join('')

  return {
    years,
    months,
    days,
    allDays: newDate.diff(oldDate, 'day'),
    label,
  }
}

export const toHHMMSS = (seconds) => {
  var hours = Math.floor(seconds / 3600)
  var minutes = Math.floor((seconds - hours * 3600) / 60)
  var seconds = seconds - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return hours + ':' + minutes + ':' + seconds
}
