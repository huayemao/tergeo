import { useTeeth } from '../contexts/teethContext'
import { getAgeDetails, getDefaultLocalDateTime } from '../lib/day'
import {
  isPresentPermanentTooth,
  isPresentPrimaryTooth,
  isShedPrimaryTooth,
} from '../lib/teeth'

export function BriefStats({ user }) {
  const { teeth } = useTeeth()

  const countByFn = (fn) => teeth.filter((e) => fn(e)).length

  const items = [
    {
      key: 'primaryPresent',
      label: '乳牙已萌出',
      count: countByFn(isPresentPrimaryTooth),
      suffix: ' / 20',
    },
    {
      key: 'primaryShed',
      label: '乳牙已脱落',
      count: countByFn(isShedPrimaryTooth),
      suffix: ' / 20',
    },
    {
      key: 'permanentPresent',
      label: '恒牙已萌出',
      count: countByFn(isPresentPermanentTooth),
      suffix: ' / 28',
    },
  ]

  const stats = teeth
  const { label } = getAgeDetails(
    getDefaultLocalDateTime(),
    user.child.birthday
  )
  return (
    <div className="bg-white bg-opacity-70 p-2 text-center">
      <p className="text-gray-500">
        {user.child.name}
        <span className="font-semibold text-indigo-400 ">{label}</span>
        啦。
      </p>
      <section className="text-center">
        <div className="mx-auto max-w-screen-xl rounded-xl px-4 py-2 shadow-lg shadow-indigo-200 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-2 gap-4  p-4 lg:grid-cols-4">
            {items.map((e) => (
              <div key={e.key}>
                <h5 className="font-semibold">{e.label}</h5>
                <p className="text-2xl font-thin text-gray-400">
                  <span className=" text-3xl font-extrabold text-indigo-500">
                    {e.count}
                  </span>
                  {e.suffix}
                </p>
              </div>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
