// @ts-nocheck
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import type { NextPage } from 'next'
import Link from 'next/link'
import { UrlObject } from 'url'
import { Label } from '../../components/common/FormControls/Label'
import { TextInput } from '../../components/common/FormControls/TextInput'
import Layout from '../../components/Layout'

type HabitCategory = {
  label: string
  color: string
  value: string
  to: UrlObject
}

const categories: HabitCategory[] = [
  {
    label: '刷牙',
    value: 'brush',
    color: 'text-indigo-600',
    to: { pathname: 'habits/timer', query: { type: 'brush' } },
  },
  {
    label: '使用牙线',
    color: 'text-blue-600',
    value: 'floss',
    to: { pathname: 'habits/timer', query: { type: 'floss' } },
  },
  {
    label: '漱口',
    color: 'text-green-600',
    value: 'rinse',
    to: { pathname: 'habits/timer', query: { type: 'rinse' } },
  },
]

const Card = ({ color, label, to, value }: HabitCategory) => (
  <Link href={to}>
    <a
      className={
        'group flex flex-col justify-between  rounded-xl bg-white p-8 shadow-xl transition-shadow hover:shadow-lg'
      }
    >
      <div>
        <h5 className={'text-3xl font-bold text-indigo-600 ' + color}>
          {label}
          {'  '}<sub className="font-light text-gray-600">{value}</sub>
        </h5>
        <div className="mt-4 border-t-2 border-indigo-100 pt-2">
          {/* <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            已完成 2/3
          </p> */}
        </div>
      </div>
    </a>
  </Link>
)

const Me: NextPage = ({ data }) => {
  return (
    <Layout title={'牙齿健康习惯计时挑战'}>
      <section>
        <div className="p-8">
          <ul className="space-y-7">
            {categories.map((e) => (
              <Card {...e} key={e.value}></Card>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default Me
