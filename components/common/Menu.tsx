import { Menu as BaseMenu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function Menu({
  options,
  title,
  children,
  className,
  onChange,
}) {
  return (
    <BaseMenu as="div" className="relative inline-block text-left">
      <div>
        <BaseMenu.Button className={className}>{children}</BaseMenu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <BaseMenu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((e) => {
            const { label } = e
            return (
              <div key={label} className="px-1 py-1">
                <BaseMenu.Item
                  onClick={() => {
                    onChange(e)
                  }}
                >
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {label}
                    </button>
                  )}
                </BaseMenu.Item>
              </div>
            )
          })}
        </BaseMenu.Items>
      </Transition>
    </BaseMenu>
  )
}
