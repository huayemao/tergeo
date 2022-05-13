// @ts-nocheck
import type { NextPage } from 'next'
import { chain, omit } from 'lodash'
import Card from '../../components/Card'
import Layout from '../../components/Layout'

const Tips: NextPage = ({ data }) => {
  return (
    <Layout
      title={
        <>
          牙齿健康指南
          <sub className="font-medium text-gray-500">&nbsp;</sub>
        </>
      }
    >
      {data.map((e) => (
        <div className="p-4" key={e.uuid}>
          <Card title={e.content.name} item={e}></Card>
        </div>
      ))}
    </Layout>
  )
}

export default Tips

export async function getStaticProps(context) {
  const s = {
    fields: {
      hVY42yGwuwDbdH16AX2B4hS9gwRat7lG: 'content',
      nu4p5o7olxq2y6bvaayky1mt87uq9dkg: 'seq',
      zk7q9wcd9gqymm54ghmefgvcyr1h6dyc: 'type',
    },
    options: {
      tadvo8: '普通人群',
    },
  }

  const { data: raw } = await fetch(
    'https://www.yuque.com/api/tables/records?doc_id=76550654&doc_type=Doc&limit=2000&offset=0&sheet_id=tcazgmf0969hhul5of50gskc29li5lwn'
  ).then((e) => e.json())

  const toc = raw.map((e) => ({ ...omit(e, ['data']), ...JSON.parse(e.data) }))
  const data = toc.map((obj) => {
    return {
      ...obj,
      ...chain(obj)
        .mapValues((v, k) => (s.fields[k] ? v.value : v))
        .mapKeys(function (value, key) {
          return s.fields[key] || key
        })
        .value(),
    }
  })

  return {
    props: {
      data,
    },
    revalidate: 30,
  }
}
