// @ts-nocheck
import type { NextPage } from 'next'
import { Label } from '../../components/common/FormControls/Label'
import { TextInput } from '../../components/common/FormControls/TextInput'
import Layout from '../../components/Layout'

const Me: NextPage = ({ data }) => {
  return (
    <Layout>
      <form className="flex flex-col gap-4">
        <div>
          <Label className="mb-2 block" htmlFor="email">
            Your email
          </Label>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <Label className="mb-2 block" htmlFor="password">
            Your password
          </Label>
          <TextInput
            id="password"
            type="password"
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <Label className="mb-2 block" htmlFor="repeat-password">
            Repeat password
          </Label>
          <TextInput
            id="repeat-password"
            type="password"
            required={true}
            shadow={true}
          />
        </div>

        <button type="submit">Register new account</button>
      </form>
    </Layout>
  )
}

export default Me
