// @ts-nocheck
import type { NextPage } from 'next'
import { Label } from '../../components/common/FormControls/Label'
import { TextInput } from '../../components/common/FormControls/TextInput'
import Layout from '../../components/Layout'

const Me: NextPage = ({ data }) => {
  return (
    <Layout>
      <section className="text-center">
        <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-2 gap-4 rounded-xl border-2 border-indigo-600 lg:grid-cols-4">
            <li className="p-4">
              <p className="text-2xl font-extrabold text-indigo-500">12</p>
              <p suppressHydrationWarning className="mt-1 text-lg font-medium">
                天连续刷牙
              </p>
            </li>
            <li className="p-4">
              <p className="text-2xl font-extrabold text-indigo-500">2</p>
              <p className="mt-1 text-lg font-medium">次打卡剩余</p>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default Me
