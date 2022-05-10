// @ts-nocheck
import { UserIcon, BellIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Layout from '../../../components/Layout'
import { Label } from '../../../components/common/FormControls/Label'
import { Radio } from '../../../components/common/FormControls/Radio'
import { TextInput } from '../../../components/common/FormControls/TextInput'
import { ToggleSwitch } from '../../../components/common/FormControls/ToggleSwitch'

const Form = () => (
  <form className="flex flex-col gap-4 p-4">
    <div>
      <Label className="mb-2 block" htmlFor="email">
        用户名
      </Label>
      <TextInput
        id="email"
        type="email"
        placeholder="name@flowbite.com"
        required={true}
        shadow={true}
      />
    </div>
    <div>
      <Label className="mb-2 block" htmlFor="password">
        密码
      </Label>
      <TextInput id="password" type="password" required={true} shadow={true} />
    </div>
    <div>
      <Label className="mb-2 block" htmlFor="repeat-password">
        Repeat password
      </Label>
      <TextInput
        id="repeat-password"
        type="password"
        required={true}
        shadow={true}
      />
    </div>
    <button type="submit">Register new account</button>
  </form>
)

const Me: NextPage = ({ data }) => {
  return (
    <Layout title={'账户设置'}>
      <Form />
      <TextInput
        id="party2"
        type="time"
        name="partydate1"
        defaultValue="07:40"
      />
      宝宝出生日期
      <TextInput
        id="party1"
        type="datetime-local"
        name="partydate1"
        defaultValue="2022-06-01T08:30"
      />
      用户模式
    </Layout>
  )
}

export default Me
