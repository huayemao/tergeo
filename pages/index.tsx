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
import ToothPreview from '../components/ToothPreview'
import { allToothTypes } from '../lib/tooth'
import { chain, omit } from 'lodash'
import { getYuqueTable } from '../lib/getYuqueTable'

const Scene = dynamic(() => import('../components/TeethScene'), {
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

const Home: NextPage = ({ data }) => {
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
          <IllustrationTab metaInfo={data} />
        </div>
      </div>
    </Layout>
  )
}

export default Home

export async function getStaticProps(context) {
  const mapping = {
    wCgg1ypIUToF48dQ3hnw1gT4w3PIPpYC: 'name',
    gw1uagme14ml65r4zkgkzt4og4us6avz: 'intro',
    yxzkcss6mopga4gcc7qs93sg69x6llq6: 'id',
  }

  const optionsMapping = {
    type: { tadvo8: '普通人群' },
  }

  const data = await getYuqueTable(
    'https://www.yuque.com/api/tables/records?doc_id=77460663&doc_type=Doc&limit=2000&offset=0&sheet_id=cw4rydibd04im63ugyyshg3lh5sfvewt',
    mapping,
    optionsMapping
  )

  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 24,
  }
}
