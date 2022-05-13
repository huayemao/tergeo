import Layout from '../../components/Layout'

export default function ToothDetail({ content, title }) {
  return (
    <Layout title={title}>
      <div className="flex w-full justify-center px-8">
        <div
          className="prose bg-slate-50 text-left"
          dangerouslySetInnerHTML={{ __html: content || '' }}
        />
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const { id } = context.params

  const res = await fetch(
    'https://www.yuque.com/api/docs/xe8z07?book_id=24659353',
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
    },
    revalidate: 60 * 60 * 48,
  }
}

export async function getStaticPaths() {
  const paths = [
    {
      id: '切牙',
    },
  ].map((e) => ({ params: e }))

  return { paths, fallback: true }
}
