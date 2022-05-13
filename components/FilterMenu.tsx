import { Menu, Transition } from '@headlessui/react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/solid'
import { useModel } from '../contexts/modelContext'
import { useTeethDispatch, useTooth } from '../contexts/teethContext'
import OperationModal from './OperationModal'
import { allToothTypes, getToothBaseInfo, getToothTyoeInfo } from '../lib/tooth'
import { TextInput } from './common/FormControls/TextInput'
import {
  getAvailableToothAction,
  ToothGrowAction,
} from '../lib/getToothGrowStageInfo'
import { Textarea } from './common/FormControls/Textarea'
import { Label } from './common/FormControls/Label'
import { getDefaultLocalDateTime } from '../lib/day'
import { useShowMessage } from '../contexts/messageContext'

export default function FilterMenu() {
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
      <div className="grid grid-cols-2">
        {allToothTypes.map((e) => (
          <button
            key={e}
            type="button"
            className="mr-2 mb-2 rounded-lg border border-indigo-700 px-4 py-1.5 text-center text-sm font-medium text-indigo-700 hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-300 "
          >
            {getToothTyoeInfo(e).name}
          </button>
        ))}
      </div>
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
