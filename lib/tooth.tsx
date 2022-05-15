import { PermanentToothType } from '../typings/Tooth'
import { getFromRange } from './getFromRange'
import { inRange } from './inRange'

export const numMapping = {
  1: '中切牙',
  2: '侧切牙',
  3: '尖牙',
  4: '第一前磨牙',
  5: '第二前磨牙',
  6: '第一磨牙',
  7: '第二磨牙',
  7: '第三磨牙',
  8: '第三磨牙',
}

export const typeMapping = {
  1: PermanentToothType.incisors,
  3: PermanentToothType.canines,
  4: PermanentToothType.premolars,
  6: PermanentToothType.molars,
}

export const locationMapping = {
  t: '上颌',
  b: '下颌',
  l: '右',
  r: '左',
}

export const getToothBaseInfo = (str) => {
  const [jaw, leftOrRight, num] = str.split('')
  const toothName = `${locationMapping[jaw]}${numMapping[num]}（${locationMapping[leftOrRight]}）`
  const toothLocation = [locationMapping[jaw], locationMapping[leftOrRight]]
  const toothType = getFromRange(typeMapping, num)
  return {
    toothName,
    toothLocation,
    toothType,
  }
}

export const allToothTypes = Object.values(PermanentToothType)

export const getToothTypeInfo = (type: PermanentToothType) => {
  const mapping = {
    [PermanentToothType.incisors]: {
      name: '切牙',
      filterFn: (e: string) =>
        inRange(String.prototype.split.call(e, '')[2], [0, 3]),
    },

    [PermanentToothType.canines]: {
      name: '尖牙',
      filterFn: (e: string) => String.prototype.split.call(e, '')[2] === '3',
    },
    [PermanentToothType.premolars]: {
      name: '前磨牙',
      filterFn: (e: string) =>
        inRange(String.prototype.split.call(e, '')[2], [3, 6]),
    },
    [PermanentToothType.molars]: {
      name: '磨牙',
      filterFn: (e: string) =>
        inRange(String.prototype.split.call(e, '')[2], [5, 9]),
    },
  }

  return mapping[type]
}
