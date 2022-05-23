import { getFromRange } from './getFromRange'

export function getActiveZone(seconds: number, isActive) {
  if (!isActive && seconds === 0) {
    return ['prepare', null]
  } else if (!isActive && seconds > 120) {
    return ['over', null]
  }
  const timeMapping = {
    0: ['tr', '左上'],
    30: ['br', '左下'],
    60: ['bl', '右下'],
    90: ['tl', '右上'],
  }
  return getFromRange(timeMapping, seconds)
}
