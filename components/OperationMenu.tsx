import { Menu, Transition } from '@headlessui/react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useModel } from '../contexts/modelContext'
import { useTeethDispatch, useTooth } from '../contexts/teethContext'
import OperationModal from './OperationModal'
import { getToothBaseInfo } from '../lib/getToothBaseInfo'
import { TextInput } from './common/FormControls/TextInput'
import { getAvailableAction } from '../lib/getToothGrowStageInfo'

export default function OperationMenu() {
  const { activeToothName } = useModel()
  const { growthStage } = useTooth(activeToothName) || {}

  const options = getAvailableAction(growthStage)

  const { toothName } =
    (activeToothName && getToothBaseInfo(activeToothName)) || {}
  const [isOpen, setIsOpen] = useState(false)
  const [activeOption, setActiveOption] = useState('')

  const dispatch = useTeethDispatch()

  const handleOnClick = useCallback((v) => {
    setActiveOption(v)
    setIsOpen(true)
  }, [])

  const handleOnConfirm = useCallback(() => {
    dispatch({
      type: activeOption,
      payload: {
        toothName: activeToothName,
      },
    })
    setIsOpen(false)
  }, [activeToothName, activeOption])

  return (
    <>
      <Menu as="div" className="relative w-full">
        <Menu.Button className="mr-2 mb-2 w-full rounded-3xl border bg-indigo-400 px-5 py-2 text-center  font-medium text-white hover:bg-indigo-600  hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300  dark:focus:ring-blue-800">
          操作
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((e) => (
              <div key={e} className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleOnClick.bind(null, e)}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <EditActiveIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <EditInactiveIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      {e}
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      <OperationModal
        content={
          activeOption === '撤销萌出' ? (
            '要撤销这颗牙齿的萌出状态吗'
          ) : (
            <div>
              花野猫的这颗牙在{' '}
              <TextInput
                wrapperClassName="inline-flex"
                sizing={'sm'}
                id="party1"
                type="datetime-local"
                name="partydate1"
                defaultValue="2022-06-01T08:30"
              />{' '}
              {activeOption}了吗？
            </div>
          )
        }
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false)
        }}
        onConfirm={handleOnConfirm}
        title={toothName + ' ' + activeOption}
      />
    </>
  )
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  )
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  )
}
