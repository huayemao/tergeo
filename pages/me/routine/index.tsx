// @ts-nocheck
import { UserIcon, BellIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Layout from '../../../components/Layout'
import { Label } from '../../../components/common/FormControls/Label'
import { Radio } from '../../../components/common/FormControls/Radio'
import { TextInput } from '../../../components/common/FormControls/TextInput'
import { ToggleSwitch } from '../../../components/common/FormControls/ToggleSwitch'
import { Select } from '../../../components/common/FormControls/Select'
import { PlusIcon, XIcon } from '@heroicons/react/solid'
import { SettingItem } from '../../../components/SettingItem'

const timeList = [
  { label: '早', time: '08:20', active: true, key: 'morning' },
  { label: '中', time: '12:20', active: false, key: 'noon' },
  { label: '晚', time: '22:20', active: true, key: 'evening' },
]

const list = [
  {
    label: '刷牙',
    open: true,
    detail: (
      <>
        {' '}
        <div className="mb-2">时段设置：</div>
        <div className="space-y-2">
          {timeList.map(({ time, label, active, key }) => (
            <div key={key} className="flex items-center justify-evenly">
              <Label className="text-base" htmlFor="morning">
                {label}
              </Label>
              <TextInput
                wrapperClassName="flex-1 mx-2"
                id={key}
                type={'time'}
                defaultValue={time}
              />
              <ToggleSwitch className="ml-auto" defaultChecked={active} />
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    label: '使用牙线',
    open: true,
    detail: (
      <>
        <div className="space-y-2 text-right">
          <div key={'1'} className="flex items-center justify-evenly">
            <Label className="text-base" htmlFor="morning">
              晚
            </Label>
            <TextInput
              wrapperClassName="flex-1 mx-2"
              id={'xx'}
              type={'time'}
              defaultValue={'21:20'}
            />
            <XIcon className="ml-4 h-6 w-6" />
          </div>
          <button className="inline-flex items-center text-indigo-500">
            <PlusIcon className="h-6 w-6 " strokeWidth={'1.2'} />
            添加
          </button>
        </div>
      </>
    ),
  },
  {
    label: '漱口',
    open: false,
    detail: (
      <>
        <div className="space-y-2 text-right">
          <div key={'1'} className="flex items-center justify-evenly">
            <Label className="text-base" htmlFor="morning">
              晚
            </Label>
            <TextInput
              wrapperClassName="flex-1 mx-2"
              id={'xx'}
              type={'time'}
              defaultValue={'21:20'}
            />
            <XIcon className="ml-4 h-6 w-6" />
          </div>
          <button className="inline-flex items-center text-indigo-500">
            <PlusIcon className="h-6 w-6 " strokeWidth={'1.2'} />
            添加
          </button>
        </div>
      </>
    ),
  },
  {
    label: '时长限制',
    open: true,
    detail: (
      <>
        <Select sizing={'sm'} id="freq" required={true}>
          <option>30 分钟</option>
          <option>一小时</option>
          <option>两消失</option>
        </Select>
      </>
    ),
  },
]

const Me: NextPage = ({ data }) => {
  return (
    <Layout title={'日常任务设置'}>
      <div className="divide-y border border-gray-200 bg-white text-lg  font-medium text-gray-900">
        {list.map((e) => (
          <SettingItem {...e} />
        ))}
      </div>
    </Layout>
  )
}

export default Me


