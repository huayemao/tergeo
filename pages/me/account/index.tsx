// @ts-nocheck
import { UserIcon, BellIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Layout from '../../../components/Layout'
import { Label } from '../../../components/common/FormControls/Label'
import { Radio } from '../../../components/common/FormControls/Radio'
import { TextInput } from '../../../components/common/FormControls/TextInput'
import { ToggleSwitch } from '../../../components/common/FormControls/ToggleSwitch'
import { SettingItem } from '../../../components/SettingItem'
import { useUser, useUserDispatch } from '../../../contexts/userContext'
import { useCallback } from 'react'
import { Toast } from '../../../components/common/Toast'
import { CheckIcon } from '@heroicons/react/solid'
import { useShowMessage } from '../../../contexts/messageContext'

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

const items = [
  {
    label: '牙齿成长记录模式',
    open: true,
    detail: <ChildForm />,
  },
  { label: '日常任务', to: 'routine', subtitle: '开启' }, // 洁牙方式、是否提醒
  { label: '提醒设置', to: 'notifications' },
]

const Me: NextPage = ({ data }) => {
  return (
    <Layout title={'账户设置'}>
      <div className="divide-y border border-gray-200 bg-white text-lg  font-medium text-gray-900">
        {items.map((e) => (
          <SettingItem key={e.label} {...e} />
        ))}
      </div>
      <Form />
    </Layout>
  )
}

export default Me

function ChildForm() {
  const { child } = useUser()

  const { name, birthday } = child || {}

  const dispatch = useUserDispatch()

  const showMessage = useShowMessage()

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      dispatch({
        type: 'PATCH_CHILD_INFO',
        payload: {
          name: e.target.childName.value,
          birthday: e.target.child_birthday.value,
        },
      })
      showMessage('保存成功', 2000)
    },
    [dispatch]
  )

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Label className="mb-2 !text-base text-gray-600" htmlFor="childName">
          宝宝姓名/昵称：
          <TextInput
            id="childName"
            type="text"
            required={true}
            shadow={true}
            placeholder="这里输入宝宝的名字"
            defaultValue={name}
          />
        </Label>
        <Label
          className="mtimeb-2 !text-base text-gray-600"
          htmlFor="childName"
        >
          宝宝出生日期：
          <TextInput
            id="child_birthday"
            type="date"
            name="child_birthday"
            defaultValue={birthday}
          />{' '}
        </Label>
        <div className="text-right">
          <button
            className="inline-flex items-center text-indigo-500"
            type="submit"
          >
            保存
          </button>
        </div>
      </form>
    </>
  )
}
