// @ts-nocheck
import { Menu, Transition } from '@headlessui/react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import React, { Fragment, Suspense, useRef, useState } from 'react'
import RadioGroupDemo from '../components/RadioGroupDemo'
import TabDemo from '../components/TabDemo'
import ToothPreview from '../components/ToothPreview'

const Model = dynamic(() => import('../components/Model'), {
  ssr: false,
  loading: () => <p>...</p>,
})

const Home: NextPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 hover:bg-gradient-to-l">
      <div className="flex h-screen flex-col bg-white bg-opacity-80 backdrop-blur-lg backdrop-filter">
        {/* <RadioGroupDemo></RadioGroupDemo> */}
        <h1 className="bg-white py-2 text-center align-middle text-xl font-semibold leading-10 text-indigo-400">
          花野猫
          <sub className="font-medium text-gray-500">&nbsp;的牙齿成长记录</sub>
        </h1>

        <div className="relative" style={{ height: '36vh' }}>
          <Model />
        </div>
        <div className="flex flex-1 flex-col rounded-t-3xl shadow-xl">
          <div
            className="flex items-center rounded-t-3xl bg-white"
            style={{ height: '18vh' }}
          >
            <ToothPreview></ToothPreview>
            <div className="flex-1 space-y-3 px-2">
              <h2 className="text-center text-xl font-medium text-indigo-700 drop-shadow-sm">
                左中切牙
              </h2>
              <div className="flex flex-wrap items-center justify-start space-x-1">
                <div className="rounded-3xl border-2 border-gray-300 px-2 py-1 text-sm text-gray-400">
                  左上
                </div>
                <div className="rounded-3xl border-2 border-gray-300 px-2 py-1 text-sm text-gray-400">
                  已萌出
                </div>
                <div className="rounded-3xl border-2 border-gray-300 px-2 py-1 text-sm text-gray-400">
                  牙齿类型
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4  ">
                <button
                  type="button"
                  className="mr-2 mb-2 w-full rounded-3xl border bg-indigo-400 px-5 py-2 text-center  font-medium text-white hover:bg-indigo-600  hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300  dark:focus:ring-blue-800"
                >
                  操作
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 bg-white bg-opacity-50 px-4 pt-4 text-center">
            <TabDemo />
          </div>
        </div>
        <div className="fixed bottom-4 mx-20 flex h-12 items-center justify-around rounded-3xl bg-white px-10 text-gray-400 shadow-2xl">
          main 我的
        </div>
      </div>
    </div>
  )
}

export default Home
