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
  const mapping = {
    hVY42yGwuwDbdH16AX2B4hS9gwRat7lG: 'content',
    nu4p5o7olxq2y6bvaayky1mt87uq9dkg: 'seq',
    zk7q9wcd9gqymm54ghmefgvcyr1h6dyc: 'type',
  }

  const optionsMapping = {
    type: { tadvo8: '普通人群' },
  }

  const { data: json } = await fetch(
    'https://www.yuque.com/api/tables/records?doc_id=76550654&doc_type=Doc&limit=2000&offset=0&sheet_id=tcazgmf0969hhul5of50gskc29li5lwn'
  ).then((e) => e.json())

  const rawData = json.map((e) => ({
    ...omit(e, ['data']),
    ...JSON.parse(e.data),
  })) // data 字段值为 JSON 字符串
  const data = rawData.map((obj) => {
    return {
      ...chain(obj)
        .mapValues((v, k) => {
          const { value } = v
          const trueKey = mapping[k]
          if (!trueKey) return v
          if (Array.isArray(value)) {
            return value.map((e) => optionsMapping[trueKey][e])
          }
          return value
        })
        .mapKeys(function (value, key) {
          return mapping[key] || key
        })
        .value(),
    }
  })
  console.log(data)

  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 24,
  }
}
