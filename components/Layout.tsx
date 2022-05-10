import { BottomTab } from './BottomTab'

export default function Layout({ children, title, className }) {
  return (
    <>
      <div className={'flex min-h-screen flex-col ' + className}>
        <h1 className="sticky top-0 z-20 bg-white py-2 text-center align-middle text-xl font-semibold leading-10 text-indigo-400 shadow">
          {title}
        </h1>
        <main className="flex flex-1 flex-col">{children}</main>
        <BottomTab></BottomTab>
      </div>
    </>
  )
}
