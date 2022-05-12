// @ts-nocheck
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import type { NextPage } from 'next'
import Link from 'next/link'
import { UrlObject } from 'url'
import { Label } from '../../components/common/FormControls/Label'
import { TextInput } from '../../components/common/FormControls/TextInput'
import Layout from '../../components/Layout'

type CleaningCategory = {
  label: 'string'
  color: 'string'
  to: UrlObject
}

const categories: CleaningCategory[] = [
  {
    label: '刷牙',
    key: 'brush',
    color: 'text-indigo-600',
    to: { pathname: 'cleaning/timer', query: { type: 'brush' } },
  },
  {
    label: '使用牙线',
    color: 'text-blue-600',
    key: 'floss',
    to: { pathname: 'cleaning/timer', query: { type: 'floss' } },
  },
  {
    label: '漱口',
    color: 'text-green-600',
    key: 'rinse ',
    to: { pathname: 'cleaning/timer', query: { type: 'rinse' } },
  },
]

const Card = ({ color, label, to, key }: CleaningCategory) => (
  <a
    href=""
    className={
      'group flex flex-col justify-between rounded-sm bg-white p-8 shadow-xl transition-shadow hover:shadow-lg'
    }
  >
    <div>
      <h5 className={'text-5xl font-bold text-indigo-600 ' + color}>{label}</h5>
      <div className="mt-4 border-t-2 border-indigo-100 pt-2">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
          已完成 2/3
        </p>
      </div>
    </div>
    <Link href={to}>
      <a className={'mt-8 inline-flex items-center text-indigo-600 ' + color}>
        <span className="text-lg font-medium">去完成</span>
        <ArrowNarrowRightIcon className="ml-3 h-6 w-6 transform transition-transform group-hover:translate-x-3"></ArrowNarrowRightIcon>
      </a>
    </Link>
  </a>
)

const Me: NextPage = ({ data }) => {
  return (
    <Layout title={'牙齿健康习惯计时挑战'}>
      <section>
        <div className="p-8">
          <ul className="space-y-7">
            {categories.map((e) => (
              <Card {...e} key={e.label}></Card>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default Me
