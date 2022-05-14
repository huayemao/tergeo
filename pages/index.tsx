// @ts-nocheck
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import React, {
  Fragment,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import RadioGroupDemo from '../components/RadioGroupDemo'
import { BottomTab } from '../components/BottomTab'
import Layout from '../components/Layout'
import ModelProvider from '../contexts/modelContext'
import { useUser, useUserDispatch } from '../contexts/userContext'
import { getScene4Home } from '../lib/getScene'
import { partial } from 'lodash'
import ToothPreview from '../components/Scenes/ToothPreview'
import { allToothTypes } from '../lib/tooth'

const Scene = dynamic(() => import('../components/Scenes/Main'), {
  ssr: false,
})

const ModeMenu = dynamic(() => import('../components/ModeMenu'), {
  ssr: false,
})

const Info = dynamic(() => import('../components/ToothInfo'), {
  ssr: false,
})

const IllustrationTab = dynamic(() => import('../components/IllustrationTab'), {
  ssr: false,
})

const Home: NextPage = () => {
  const dispatch = useUserDispatch()
  const user = useUser()

  const getScene = useMemo(() => partial(getScene4Home, user.mode), [user.mode])

  return (
    <Layout
      className={'max-h-screen'}
      title={<ModeMenu {...{ dispatch, user }} />}
    >
      <div
        className="relative bg-indigo-200/60  backdrop-blur-lg backdrop-filter"
        style={{ height: '36vh' }}
      >
        <Scene
          canvasProps={{
            shadows: true,
            dpr: [1, 2],
            style: { height: '36vh' },
            camera: { position: [0, 8, 72], fov: 70, near: 10 },
          }}
          getScene={getScene}
        />
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
