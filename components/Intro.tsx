import { Tooth } from '../typings/Tooth'
import { getToothBaseInfo, getToothTypeInfo } from '../lib/tooth'
import Link from 'next/link'

export const Intro = ({ tooth }: { tooth: Tooth }) => {
  // console.log(tooth)
  const { toothType, toothName } = getToothBaseInfo(tooth.name)
  const mapping = {
    tl1: {
      content:
        '上颌中切牙（Maxillary central incisors）位于上颌口腔前部，中线两侧，其体积为切牙中最大。左、右中切牙近中面彼此相对，远中面与同侧侧切牙的近中面相接触。',
    },
  }
  return (
    <div className="text-left">
      <div className="prose">{mapping[tooth.name]?.content}</div>
      <br/>见
      <Link href={'/detail/' + toothType}>
        <a className="text-indigo-500 underline">
          {getToothTypeInfo(toothType).name}
        </a>
      </Link>
    </div>
  )
}
