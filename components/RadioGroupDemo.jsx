import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const plans = [
  {
    name: '乳牙发芽记录表',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk',
  },
  {
    name: '口腔记录检查表',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk',
  },
  {
    name: '学龄儿童窝沟封闭登记表',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk',
  },
]

const refTable = [
  {
    萌出序号: '1',
    牙齿名称: '下中切牙',
    出牙时间: '6-10个月',
  },
  {
    萌出序号: '2',
    牙齿名称: '上中切牙',
    出牙时间: '8-12个月',
  },
  {
    萌出序号: '3',
    牙齿名称: '=侧切牙',
    出牙时间: '9-13个月',
  },
  {
    萌出序号: '4',
    牙齿名称: '下侧切牙',
    出牙时间: '10-16个月',
  },
  {
    萌出序号: '5',
    牙齿名称: '=第一乳磨牙',
    出牙时间: '13-19个月',
  },
  {
    萌出序号: '6',
    牙齿名称: '下第一乳磨牙',
    出牙时间: '14-18个月',
  },
  {
    萌出序号: '7',
    牙齿名称: '下尖牙',
    出牙时间: '16-22个月',
  },
  {
    萌出序号: '8',
    牙齿名称: '上尖牙',
    出牙时间: '17-23个月',
  },
  {
    萌出序号: '9',
    牙齿名称: '上第二磨牙',
    出牙时间: '23-31个月',
  },
  {
    萌出序号: '10',
    牙齿名称: '下第二乳磨牙',
    出牙时间: '25-33个月',
  },
]

export default function RadioGroupDemo() {
  const [selected, setSelected] = useState(plans[0])

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {plan.ram}/{plan.cpus}
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{plan.disk}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
