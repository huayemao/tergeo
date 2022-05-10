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
import { SettingItem } from '../../../components/SettingItem'

const items = [
  {
    label: '日常任务',
    icon: BellIcon,
    open: true,
    detail: (
      <>
        {' '}
        <Label className="mb-2 !text-base text-gray-600" htmlFor="inAdvance">
          提前：
        </Label>
        <Select sizing={'sm'} id="inAdvance" required={true}>
          <option>五分钟</option>
          <option>十分钟</option>
          <option>二十分钟</option>
        </Select>
      </>
    ),
  },
  {
    label: '定期更换牙刷',
    icon: BellIcon,
    open: true,
    detail: (
      <>
        {' '}
        <Label
          className="mb-2 flex items-end !text-base text-gray-600"
          htmlFor="freq"
        >
          更换频率：
          <div className="ml-auto text-right text-sm text-gray-600">
            下次提醒日期：{new Date().toLocaleDateString()}
          </div>
        </Label>
        <Select sizing={'sm'} id="freq" required={true}>
          <option>每两周</option>
          <option>每一月</option>
          <option>每两月</option>
          <option>每三月</option>
        </Select>
      </>
    ),
  },
]

const NotificationSetting: NextPage = ({ data }) => {
  return (
    <Layout title={'提醒设置'}>
      <div className="divide-y border border-gray-200 bg-white text-lg  font-medium text-gray-900">
        {items.map((e) => (
          <SettingItem {...e} />
        ))}
      </div>
      <button
        onClick={() => {
          // navigator.serviceWorker.register('/sw.js')

          Notification.requestPermission(function (result) {
            if (result === 'granted') {
              navigator.serviceWorker.ready.then(function (registration) {
                setTimeout(() => {
                  registration.showNotification('更换牙刷提醒', {
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
                }, new Date('2022/5/10 11:15:10') - new Date())
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

export default NotificationSetting
