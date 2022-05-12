// @ts-nocheck
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import React, { Fragment, useRef, useState } from 'react'
import RadioGroupDemo from '../components/RadioGroupDemo'
import IllustrationTab from '../components/IllustrationTab'
import ToothPreview from '../components/Models/ToothPreview'
import { BottomTab } from '../components/BottomTab'
import Layout from '../components/Layout'
import ModelProvider from '../contexts/modelContext'
import { Info } from '../components/ToothInfo'
import Menu from '../components/common/Menu'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useUser, useUserDispatch } from '../contexts/userContext'
// import Model from '../components/Models/Model';

const Model = dynamic(() => import('../components/Models/Model'), {
  ssr: false,
  // loading: () => <Loader/>,
})

const Home: NextPage = () => {
  const dispatch = useUserDispatch()
  const { mode, child } = useUser()
  return (
    <Layout
      className={'max-h-screen'}
      title={
        <>
          <Menu
            onChange={(e) => dispatch({ type: 'SET_MODE', payload: e.key })}
            className={'flex items-center font-bold'}
            options={[
              { label: '成长记录模式', key: 'children' },
              { label: '普通模式', key: 'normal' },
            ]}
          >
            <div suppressHydrationWarning>
              {mode === 'children' ? (
                <>
                  花野猫的牙齿成长记录
                  <sub className="font-medium text-gray-500">
                    （{'成长记录模式'}）
                  </sub>
                </>
              ) : (
                <>
                  主页
                  <sub className="font-medium text-gray-500">
                    （{'普通模式'}）
                  </sub>
                </>
              )}
            </div>
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-indigo-400"
              aria-hidden="true"
            />{' '}
          </Menu>
        </>
      }
    >
      {/* <div className="w-full bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 hover:bg-gradient-to-l"> */}
      {/* <div className="flex flex-col bg-white bg-opacity-80 backdrop-blur-lg backdrop-filter"> */}
      <div
        className="relative bg-indigo-200/60  backdrop-blur-lg backdrop-filter"
        style={{ height: '36vh' }}
      >
        <Model />
      </div>
      <div className="flex h-[60vh] flex-col rounded-t-3xl">
        <div
          className="z-10 -mt-4 flex items-center rounded-t-3xl bg-white"
          style={{ height: '18vh' }}
        >
          <ToothPreview />
          <Info />
        </div>
        <div className="h-[42vh] flex-1 space-y-4 bg-white bg-opacity-50 px-4 pt-4 text-center">
          <IllustrationTab />
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </Layout>
  )
}

export default Home
