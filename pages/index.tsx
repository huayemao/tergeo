// @ts-nocheck
import { Menu, Transition } from '@headlessui/react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import React, { Fragment, Suspense, useRef, useState } from 'react'
import RadioGroupDemo from '../components/RadioGroupDemo'
import TabDemo from '../components/TabDemo'


const Model = dynamic(() => import('../components/Model'), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <div className="min-h-screen w-full py-2">
      <div className="grid h-full flex-1 grid-cols-2">
        <RadioGroupDemo></RadioGroupDemo>
        <Model />
        <TabDemo />
      </div>
    </div>
  )
}

export default Home
