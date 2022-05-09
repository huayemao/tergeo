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
      <button
        onClick={() => {
          Notification.requestPermission().then((result) => {
            if (result === 'granted') {
              randomNotification()
            }
          })
        }}
      >
        Register new account
      </button>
      <button
        onClick={() => {
          navigator.serviceWorker.register('/sw.js')
          Notification.requestPermission(function (result) {
            if (result === 'granted') {
              navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification('Notification with ServiceWorker')
              })
            }
          })
        }}
      >
        new
      </button>
    </Layout>
  )
}

export default Me

function randomNotification() {
  // const randomItem = Math.floor(Math.random() * games.length)
  const notifTitle = 'sadfsfsdfs'
  const notifBody = `Created by xxx.`
  // const notifImg = `data/img/${games[randomItem].slug}.jpg`
  const options = {
    body: notifBody,
    // icon: notifImg,
  }
  new Notification(notifTitle, options)
  setTimeout(randomNotification, 3000)
}
