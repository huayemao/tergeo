// @ts-nocheck
import type { NextPage } from 'next'
import Card from '../../components/Card'

import Layout from '../../components/Layout'

const Tips: NextPage = () => {
  return (
    <Layout>
      <div className="p-4">
        <Card title="糖分和蛀牙"></Card>
      </div>
      {/* <div className='prose container'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sigourney Weaver</td>
              <td>Ripley</td>
            </tr>
            <tr>
              <td>Carrie Henn</td>
              <td>Newt</td>
            </tr>
            <tr>
              <td>Michael Biehn</td>
              <td>Corporal Hicks</td>
            </tr>
            <tr>
              <td>Paul Reiser</td>
              <td>Burke</td>
            </tr>
            <tr>
              <td>Lance Henriksen</td>
              <td>Bishop</td>
            </tr>
            <tr>
              <td>Bill Paxton</td>
              <td>Private Hudson</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </Layout>
  )
}

export default Tips
