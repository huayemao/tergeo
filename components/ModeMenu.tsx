import React from 'react'
import Menu from './common/Menu'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { getAvailableModes } from '../contexts/userContext'
import { getOptions, Mode } from '../typings/user'

export function ModeMenu({ dispatch, user }) {
  const modes = getAvailableModes(user)

  return (
    <Menu
      onChange={(e) => {
        dispatch({ type: 'SET_MODE', payload: e.key })
      }}
      className={'flex items-center font-bold'}
      options={modes.map(getOptions)}
    >
      <div suppressHydrationWarning>
        {user.mode === Mode.children ? (
          <>
            {user.child.name}的牙齿成长记录
            <sub className="font-medium text-gray-500">
              （{'成长记录模式'}）
            </sub>
          </>
        ) : (
          <>
            主页
            <sub className="font-medium text-gray-500">（{'普通模式'}）</sub>
          </>
        )}
      </div>
      <ChevronDownIcon
        className="ml-2 -mr-1 h-5 w-5 text-indigo-400"
        aria-hidden="true"
      />{' '}
    </Menu>
  )
}
