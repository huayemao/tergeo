// @ts-nocheck
import { UserIcon, BellIcon, ClockIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Label } from '../../components/common/FormControls/Label'
import { Radio } from '../../components/common/FormControls/Radio'
import { TextInput } from '../../components/common/FormControls/TextInput'
import Layout from '../../components/Layout'

const items = [
  { label: '账户设置', icon: UserIcon, to: 'account' },
  { label: '日常任务', icon: ClockIcon, to: 'routine', subtitle: '开启' }, // 洁牙方式、是否提醒
  { label: '提醒设置', icon: BellIcon, to: 'notifications' },
  { label: '用户模式', icon: BellIcon, to: 'notifications' },
  { label: '音乐曲目', icon: BellIcon, to: 'notifications' },
]

const Me: NextPage = ({ data }) => {
  return (
    <Layout title={'我的'}>
      <div className="divide-y border border-gray-200 bg-white text-lg  font-medium text-gray-900">
        {items.map(({ label, icon: Icon, to }) => (
          <Link href={'me/' + to}>
            <a
              key={label}
              aria-current="true"
              className="flex w-full cursor-pointer items-center rounded-t-lg px-4 py-2"
            >
              <Icon className="mr-2 h-6 w-6"></Icon>
              {label}
            </a>
          </Link>
        ))}
      </div>

      <button
        onClick={() => {
          navigator.serviceWorker.register('/sw.js')
          Notification.requestPermission(function (result) {
            if (result === 'granted') {
              navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification('Notification with ServiceWorker')
              })
            }
          })
        }}
      >
        new
      </button>
    </Layout>
  )
}

export default Me

function randomNotification() {
  // const randomItem = Math.floor(Math.random() * games.length)
  const notifTitle = 'sadfsfsdfs'
  const notifBody = `Created by xxx.`
  // const notifImg = `data/img/${games[randomItem].slug}.jpg`
  const options = {
    body: notifBody,
    // icon: notifImg,
  }
  new Notification(notifTitle, options)
  setTimeout(randomNotification, 3000)
}
