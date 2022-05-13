import { PermanentToothType } from '../typings/Tooth'
import { getFromRange } from './getFromRange'

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
  l: '左',
  r: '右',
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
export const getToothTyoeInfo = (type: PermanentToothType) => {
  const mapping = {
    [PermanentToothType.canines]: { name: '尖牙' },
    [PermanentToothType.incisors]: { name: '切牙' },
    [PermanentToothType.molars]: { name: '磨牙' },
    [PermanentToothType.premolars]: { name: '前磨牙' },
  }

  return mapping[type]
}
