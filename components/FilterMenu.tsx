import { Menu, Transition } from '@headlessui/react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useModel } from '../contexts/modelContext'
import { useTeeth, useTeethDispatch, useTooth } from '../contexts/teethContext'
import OperationModal from './OperationModal'
import { allToothTypes, getToothBaseInfo, getToothTypeInfo } from '../lib/tooth'
import classnames from 'clsx'
import {
  getAvailableToothAction,
  ToothGrowAction,
} from '../lib/getToothGrowStageInfo'
import { Textarea } from './common/FormControls/Textarea'
import { Label } from './common/FormControls/Label'
import { getDefaultLocalDateTime } from '../lib/day'
import { useShowMessage } from '../contexts/messageContext'
import useClickOutside from '../lib/hooks/useClickOutSide'

export default function FilterMenu({ className }) {
  const { activeToothName } = useModel()
  const { filters } = useTeeth()
  const wrapperRef = useRef()

  const dispatch = useTeethDispatch()

  const handleOnClick = useCallback((v: ToothGrowAction) => {
    setActiveOption(v)
    setIsOpen(true)
  }, [])

  const show = useShowMessage()

  const handleSelect = (e) => {
    dispatch({ type: 'FILTER_BY_TYPE', payload: e })
  }

  // useClickOutside(wrapperRef, () => {
  //   dispatch({ type: 'RESET_FILTER_BY_TYPE' })
  // })

  return (
    <>
      <div className={'grid grid-cols-2 gap-2 ' + className} ref={wrapperRef}>
        {allToothTypes.map((e) => (
          <button
            onClick={handleSelect.bind(null, e)}
            key={e}
            type="button"
            className={classnames(
              '"mr-2 " mb-2 rounded-lg border border-indigo-700 px-4 py-1.5 text-center text-sm font-medium text-indigo-700 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-300',
              {
                'bg-indigo-600 !text-white outline-none ring-4 ring-indigo-300':
                  filters.type === e,
              }
            )}
          >
            {getToothTypeInfo(e).name}
          </button>
        ))}
      </div>
    </>
  )
}
