// @ts-nocheck
import { Dialog, Menu, Transition } from '@headlessui/react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import React, { Fragment, Suspense, useRef, useState } from 'react'
import RadioGroupDemo from '../components/RadioGroupDemo'
import IllustrationTab from '../components/IllustrationTab'
import ToothPreview from '../components/ToothPreview'
import { BottomTab } from '../components/BottomTab'
import Layout from '../components/Layout'
import OperationMenu from '../components/OperationMenu'
import { useModel } from '../contexts/modelContext'
import { useTooth } from '../contexts/teethContext'
import { getToothBaseInfo } from '../lib/getToothBaseInfo'
// import MyModal from '../components/MyModal'

const Model = dynamic(() => import('../components/Model'), {
  ssr: false,
  loading: () => <p>...</p>,
})

const MyModal = dynamic(() => import('../components/OperationModal'), {
  ssr: false,
  loading: () => <p>...</p>,
})

const Home: NextPage = () => {
  const { activeToothName } = useModel()
  const { toothName, toothType, toothLocation } =
    (activeToothName && getToothBaseInfo(activeToothName)) || {}

  const tooth = useTooth(activeToothName)

  return (
    <Layout>
      <div className="min-h-screen w-full bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 hover:bg-gradient-to-l">
        <div className="flex h-screen flex-col bg-white bg-opacity-80 backdrop-blur-lg backdrop-filter">
          {/* <RadioGroupDemo></RadioGroupDemo> */}
          <h1 className="bg-white py-2 text-center align-middle text-xl font-semibold leading-10 text-indigo-400">
            花野猫
            <sub className="font-medium text-gray-500">
              &nbsp;的牙齿成长记录
            </sub>
          </h1>

          <div
            className="relative bg-indigo-200/60  backdrop-blur-lg backdrop-filter"
            style={{ height: '36vh' }}
          >
            <Model />
          </div>
          <div className="flex flex-1 flex-col rounded-t-3xl shadow-xl">
            <div
              className="z-10 -mt-4 flex items-center rounded-t-3xl bg-white"
              style={{ height: '18vh' }}
            >
              <ToothPreview></ToothPreview>
              <div className="flex-1 space-y-3 p-2">
                <h2
                  suppressHydrationWarning
                  className="mt-4 text-center text-xl font-medium text-indigo-700 drop-shadow-sm"
                >
                  {toothName || '请选择牙齿'}
                </h2>
                {tooth ? (
                  <div className="flex flex-wrap items-center justify-start space-x-1">
                    {toothLocation.map((e) => (
                      <div
                        key={e}
                        className="rounded-3xl border border-gray-300 px-2 py-1 text-sm text-gray-400"
                      >
                        {e}
                      </div>
                    ))}

                    <div className="rounded-3xl border border-gray-300 px-2 py-1 text-sm text-gray-400">
                      {toothType}
                    </div>
                    <div className="rounded-3xl border border-gray-300 px-2 py-1 text-sm text-gray-400">
                      {!tooth ? '' : tooth.grown ? '已萌出' : '待萌出'}
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center justify-center space-x-4  ">
                  <OperationMenu />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4 bg-white bg-opacity-50 px-4 pt-4 text-center">
              <IllustrationTab />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
