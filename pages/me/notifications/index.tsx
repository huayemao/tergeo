// @ts-nocheck
import { UserIcon, BellIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Layout from '../../../components/Layout'
import { Label } from '../../../components/common/FormControls/Label'
import { Radio } from '../../../components/common/FormControls/Radio'
import { TextInput } from '../../../components/common/FormControls/TextInput'
import { ToggleSwitch } from '../../../components/common/FormControls/ToggleSwitch'
import { Select } from '../../../components/common/FormControls/Select'
import { useEffect } from 'react'

const items = [
  { label: '起床时间', icon: UserIcon },
  { label: '每日任务', icon: BellIcon },
  { label: '定期更换牙刷', icon: BellIcon, open: true, detail: 'sadf' },
]

const Me: NextPage = ({ data }) => {
  useEffect(() => {


    navigator.serviceWorker.ready.then(function (registration) {
      registration.getNotifications().then(function (notifications) {
        console.log(notifications)
        // do something with your notifications

        // This looks to see if the current is already open and
        // focuses if it is
      })
    })
  }, [])

  return (
    <Layout title={'提醒设置'}>
      <div className="divide-y border border-gray-200 bg-white text-lg  font-medium text-gray-900">
        {items.map(({ label, icon: Icon, detail, open }) => (
          <div key={label}>
            <a
              href="#"
              aria-current="true"
              className="flex w-full cursor-pointer items-center rounded-t-lg  px-4 py-2  dark:border-gray-600 dark:bg-gray-800"
            >
              <Icon className="mr-2 h-6 w-6"></Icon>
              {label}
              <ToggleSwitch className="ml-auto" defaultChecked={open} />
            </a>
            {open && detail && (
              <div className="px-8 py-4 text-right  ">
                <div>下次提醒日期：{new Date().toLocaleDateString()}</div>
                <Label className="mb-2 text-base text-gray-600" htmlFor="freq">
                  更换频率：
                </Label>
                <Select sizing={'sm'} id="freq" required={true}>
                  <option>每两周</option>
                  <option>每一月</option>
                  <option>每两月</option>
                  <option>每三月</option>
                </Select>
              </div>
            )}{' '}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigator.serviceWorker.register('/sw.js')

          Notification.requestPermission(function (result) {
            if (result === 'granted') {
              navigator.serviceWorker.ready.then(function (registration) {
                registration
                  .showNotification('更换牙刷提醒', {
                    icon: '/icons/android-chrome-192x192.png',
                    body: '距离您上次更换牙刷已经过去了两个月，您今天应该更换牙刷了',
                    timestamp: new Date().getTime(),
                    actions: [
                      {
                        action: '确认',
                        title: '好的，已经更换过了',
                      },
                      {
                        action: '推迟',
                        title: '明天再提醒我',
                      },
                    ],
                  })
                  .then((v) => console.log(v), console.log)
              })
            }
          })
          navigator.serviceWorker.ready.then(function (registration) {
            registration.getNotifications().then(function (notifications) {
              console.log(notifications)
              // do something with your notifications
            })
          })
        }}
      >
        new
      </button>
    </Layout>
  )
}

export default Me
