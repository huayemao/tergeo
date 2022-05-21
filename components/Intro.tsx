import { Tooth } from '../typings/Tooth'
import { getToothBaseInfo, getToothTypeInfo } from '../lib/tooth'
import Link from 'next/link'
import { keyBy } from 'lodash'

export const Intro = ({ tooth, metaInfo }: { tooth: Tooth }) => {
  const { toothType, toothName } = getToothBaseInfo(tooth.name)
  const mapping = keyBy(metaInfo, 'id')
  return (
    <div className="text-left">
      <div className="prose">
        {mapping[tooth.name.replace('r', 'l')]?.intro}
      </div>
      <br />见
      <Link href={'/detail/' + toothType}>
        <a className="text-indigo-500 underline">
          {getToothTypeInfo(toothType).name}
        </a>
      </Link>
    </div>
  )
}
