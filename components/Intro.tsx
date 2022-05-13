import { Tooth } from '../typings/Tooth'
import { getToothBaseInfo } from '../lib/tooth'
import Link from 'next/link'

export const Intro = ({ tooth }: { tooth: Tooth }) => {
  // console.log(tooth)
  const { toothType } = getToothBaseInfo(tooth.name)
  return (
    <div>
      <Link href={'/toothDetail/' + toothType}>{toothType}</Link>
    </div>
  )
}
