import React, { useMemo } from 'react'
import Menu from './common/Menu'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { getAvailableModes } from '../contexts/userContext'
import { getOptions, Mode } from '../typings/user'

export default function ModeMenu({ dispatch, user }) {
  const options = useMemo(() => getAvailableModes(user).map(getOptions), [user])

  return (
    <Menu
      onChange={(e) => {
        dispatch({ type: 'SET_MODE', payload: e.key })
      }}
      className={'flex items-center font-bold'}
      options={options}
    >
      <div suppressHydrationWarning>
        {user.mode === Mode.children ? (
          <>
            {user.child.name}的牙齿成长记录
            <sub suppressHydrationWarning className="font-medium text-gray-500">
              （{'成长记录模式'}）
            </sub>
          </>
        ) : (
          <>{options.find((e) => e.key === user.mode).label}</>
        )}
      </div>
      <ChevronDownIcon
        className="ml-2 -mr-1 h-5 w-5 text-indigo-400"
        aria-hidden="true"
      />{' '}
    </Menu>
  )
}
