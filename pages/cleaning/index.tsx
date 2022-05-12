// @ts-nocheck
import type { NextPage } from 'next'
import { Label } from '../../components/common/FormControls/Label'
import { TextInput } from '../../components/common/FormControls/TextInput'
import Layout from '../../components/Layout'

const categories = [
  {
    label: '刷牙',
    color: 'text-indigo-600',
  },
  {
    label: '使用牙线',
    color: 'text-blue-600',
  },
  {
    label: '漱口',
    color: 'text-green-600',
  },
]

const Card = ({ color, label }) => (
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

    <div className={'mt-8 inline-flex items-center text-indigo-600 ' + color}>
      <p className="text-lg font-medium">去完成</p>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ml-3 h-6 w-6 transform transition-transform group-hover:translate-x-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </div>
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
