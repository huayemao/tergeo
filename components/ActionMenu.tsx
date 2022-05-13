import { Menu, Transition } from '@headlessui/react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/solid'
import { useModel } from '../contexts/modelContext'
import { useTeethDispatch, useTooth } from '../contexts/teethContext'
import OperationModal from './OperationModal'
import { getToothBaseInfo } from '../lib/tooth'
import { TextInput } from './common/FormControls/TextInput'
import {
  getAvailableToothAction,
  ToothGrowAction,
} from '../lib/getToothGrowStageInfo'
import { Textarea } from './common/FormControls/Textarea'
import { Label } from './common/FormControls/Label'
import { getDefaultLocalDateTime } from '../lib/day'
import { useShowMessage } from '../contexts/messageContext'

export default function ActionMenu() {
  const { activeToothName } = useModel()
  const tooth = useTooth(activeToothName)
  const form = useRef<HTMLFormElement>()

  const actionOptions = tooth ? getAvailableToothAction(tooth) : []

  const { toothName } =
    (activeToothName && getToothBaseInfo(activeToothName)) || {}
  const [isOpen, setIsOpen] = useState(false)
  const [activeOption, setActiveOption] = useState<ToothGrowAction>({})

  const dispatch = useTeethDispatch()

  const handleOnClick = useCallback((v: ToothGrowAction) => {
    setActiveOption(v)
    setIsOpen(true)
  }, [])

  const show = useShowMessage()

  const handleOnConfirm = useCallback(() => {
    const record = {
      type: activeOption.type,
      name: activeOption.name,
      dateTime:
        form.current?.elements['dateTime']?.value ||
        new Date().toISOString().slice(0, -8),
      remarkContent: form.current?.elements['remarkContent'].value || null,
    }
    dispatch({
      type: activeOption.type,
      payload: {
        toothName: activeToothName,
        record,
      },
    })
    show('操作成功')
    setIsOpen(false)
  }, [activeOption.type, activeOption.name, dispatch, activeToothName])

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
            {actionOptions.map((e) => (
              <div key={e.name} className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleOnClick.bind(null, e)}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <EditActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      {e.name}
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
          <div>
            <form ref={form} className="space-y-6 pt-6">
              <div className="align-bottom">
                确定花野猫的这颗牙
                {activeOption.showTime && (
                  <>
                    在{' '}
                    <TextInput
                      wrapperClassName="inline-flex"
                      className="p-0.5"
                      sizing={'sm'}
                      id="dateTime"
                      type="datetime-local"
                      name="partydate1"
                      // defaultValue="2022/5/11 22:40:41"
                      defaultValue={getDefaultLocalDateTime()}
                      // defaultValue={new Date().toISOString().slice(0, -8)}
                    />{' '}
                  </>
                )}
                {activeOption.confirmDescription}？
              </div>
              <div>
                <Label htmlFor="remarkContent">
                  <PencilIcon className="inline h-5 w-5" /> 备注
                </Label>
                <Textarea
                  id="remarkContent"
                  type="textarea"
                  name="remarkContent"
                  className="p-2"
                  rows={5}
                  placeholder="花野猫 4 个月了，XXX"
                />
              </div>
            </form>
          </div>
        }
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false)
        }}
        onConfirm={handleOnConfirm} // form.value?
        title={activeOption.name}
      />
    </>
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
