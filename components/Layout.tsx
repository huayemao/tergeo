import { BottomTab } from './BottomTab'

export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen">
        <main>{children}</main>
        <BottomTab></BottomTab>
      </div>
    </>
  )
}
