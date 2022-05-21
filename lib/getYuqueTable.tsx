import { chain, omit } from 'lodash'

export async function getYuqueTable(url, mapping, optionsMapping) {
  const { data: json } = await fetch(url).then((e) => e.json())

  const rawData = json.map((e) => ({
    ...omit(e, ['data']),
    ...JSON.parse(e.data),
  })) // data 字段值为 JSON 字符串
  const data = rawData.map((obj) => {
    return {
      ...chain(obj)
        .mapValues((v, k) => {
          const { value } = v
          const trueKey = mapping[k]
          if (!trueKey) return v
          if (Array.isArray(value)) {
            return value.map((e) => optionsMapping[trueKey][e])
          }
          return value
        })
        .mapKeys(function (value, key) {
          return mapping[key] || key
        })
        .value(),
    }
  })
  return data
}
