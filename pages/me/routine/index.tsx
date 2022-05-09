// @ts-nocheck
import { UserIcon, BellIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Layout from '../../../components/Layout'
import { Label } from '../../../components/common/FormControls/Label'
import { Radio } from '../../../components/common/FormControls/Radio'
import { TextInput } from '../../../components/common/FormControls/TextInput'
import { ToggleSwitch } from '../../../components/common/FormControls/ToggleSwitch'
import { Select } from '../../../components/common/FormControls/Select'

const list = [
  { label: '刷牙', icon: UserIcon },
  { label: '使用牙线', icon: BellIcon },
  { label: '漱口', icon: BellIcon, open: true, detail: 'sadf' },
]

const Me: NextPage = ({ data }) => {
  return <Layout title={'日常任务设置'}>//todo</Layout>
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
