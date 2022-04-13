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
  1: '切牙',
  2: '切牙',
  3: '尖牙',
  4: '前磨牙',
  5: '前磨牙',
  6: '磨牙',
  7: '磨牙',
  8: '磨牙',
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
  const toothType = typeMapping[num]
  return {
    toothName,
    toothLocation,
    toothType,
  }
}
