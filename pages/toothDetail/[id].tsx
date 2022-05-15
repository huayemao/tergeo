import dynamic from 'next/dynamic'
import { useEffect, useMemo } from 'react'
import FilterMenu from '../../components/FilterMenu'
import Layout from '../../components/Layout'
import { getScene4Home } from '../../lib/getScene'
import { allToothTypes, getToothTypeInfo } from '../../lib/tooth'
import { Mode } from '../../typings/user'
import { partial } from 'lodash'
import { useTeethDispatch } from '../../contexts/teethContext'
import Link from 'next/link'
import classnames from 'clsx'

const Scene = dynamic(() => import('../../components/Scenes/Main'), {
  ssr: false,
})

export default function ToothDetail({ content, title, type }) {
  const dispatch = useTeethDispatch()
  const getScene = useMemo(() => partial(getScene4Home, Mode.permanent), [])

  useEffect(() => {
    dispatch({ type: 'FILTER_BY_TYPE', payload: type })
  }, [dispatch, type])

  return (
    <Layout title={title}>
      <div
        className="flex rounded-3xl rounded-t-none  bg-indigo-200/60 align-middle shadow shadow-indigo-200"
        style={{ height: '25vh' }}
      >
        <div className="w-[70%] flex-[1.6]">
          <Scene
            canSelect={false}
            canvasProps={{
              shadows: true,
              className: ' ',
              dpr: [1, 2],
              style: { height: '25vh' },
              camera: { position: [0, 8, 72], fov: 55, near: 10 },
            }}
            getScene={getScene}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 py-4 pr-4">
          {allToothTypes.map((e) => (
            <Link key={e} type="button" href={'/toothDetail/' + e}>
              <a
                className={classnames(
                  'rounded-lg border border-indigo-700 px-3 py-1.5 text-center text-sm  text-indigo-700 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-300',
                  {
                    'bg-indigo-600 !text-white outline-none ring-4 ring-indigo-300':
                      type === e,
                  }
                )}
              >
                {' '}
                {getToothTypeInfo(e).name}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center px-4 py-4">
        <div
          className="prose bg-slate-50 px-4 text-left"
          dangerouslySetInnerHTML={{ __html: content || '' }}
        />
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const { id } = context.params

  const res = await fetch(
    `https://www.yuque.com/api/docs/${id}?book_id=24659353`,
    {
      headers: {
        accept: 'application/json',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        'sec-ch-ua':
          '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-csrf-token': 'qiAkU5pS3XJWt1sryWTV9EMx',
        'x-requested-with': 'XMLHttpRequest',
      },
      referrer: 'https://www.yuque.com/huayemao/yuque/xe8z07',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  )

  const data = await res.json()
  const {
    data: { content: rawContent, title },
  } = data
  const indexes = ['<p', '<h'].map((e) => rawContent.indexOf(e))
  const start = indexes.sort().find((e) => e > -1)
  const content = rawContent.slice(start)

  return {
    props: {
      title,
      content,
      type: id,
    },
    revalidate: 60 * 60 * 48,
  }
}

export async function getStaticPaths() {
  const paths = allToothTypes.map((e) => ({ params: { id: e } }))
  return { paths, fallback: true }
}
