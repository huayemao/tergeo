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
import { useUser, useUserDispatch } from '../contexts/userContext'
import { ModeMenu } from '../components/ModeMenu'

const Model = dynamic(() => import('../components/Models/Model'), {
  ssr: false,
})

const Home: NextPage = () => {
  const dispatch = useUserDispatch()
  const user = useUser()
  return (
    <Layout
      className={'max-h-screen'}
      title={<ModeMenu {...{ dispatch, user }} />}
    >
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
    </Layout>
  )
}

export default Home
