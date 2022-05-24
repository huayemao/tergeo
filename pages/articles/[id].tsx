import Layout from '../../components/Layout'

const Article: NextPage = ({ html }) => {
  const matched = /JSON.parse\(.*"\)\)/.exec(html)
  const data = matched ? eval(matched[0]) : null
  return (
    <Layout>
      <div className="flex w-full justify-center px-8">
        <div
          className="prose text-left"
          dangerouslySetInnerHTML={{ __html: data?.note?.doclet?.body || '' }}
        />
      </div>
    </Layout>
  )
}

export default Article

export async function getStaticProps(context) {
  const { id } = context.params

  const res = await fetch(`https://www.yuque.com/r/notes/share/${id}`, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'cache-control': 'max-age=0',
      'sec-ch-ua':
        '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: null,
    method: 'GET',
  })

  return {
    props: {
      html: await res.text(),
    },
    revalidate: 60 * 60 * 48,
  }
}

export async function getStaticPaths() {
  const paths = [
    {
      id: '4e67cf4a-2ca8-4a45-a0b3-ede8852f516c',
    },
  ].map((e) => ({ params: e }))

  return { paths, fallback: true }
}
