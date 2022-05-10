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
import ModelProvider from '../contexts/modelContext'
import { Info } from '../components/Info'

const Model = dynamic(() => import('../components/Models/Model'), {
  ssr: false,
  loading: () => <p>...</p>,
})

const Home: NextPage = () => {
  return (
    <Layout
      title={
        <>
          花野猫
          <sub className="font-medium text-gray-500">&nbsp;的牙齿成长记录</sub>
        </>
      }
    >
      <div className="w-full bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 hover:bg-gradient-to-l">
        <div className="flex h-screen flex-col bg-white bg-opacity-80 backdrop-blur-lg backdrop-filter">
          <div
            className="relative bg-indigo-200/60  backdrop-blur-lg backdrop-filter"
            style={{ height: '36vh' }}
          >
            <Model />
          </div>
          <div className="flex flex-1 flex-col rounded-t-3xl">
            <div
              className="z-10 -mt-4 flex items-center rounded-t-3xl bg-white"
              style={{ height: '18vh' }}
            >
              <ToothPreview />
              <Info />
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
