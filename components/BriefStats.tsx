import { getAgeDetails, getDefaultLocalDateTime } from '../lib/day'

export function BriefStats({ user }) {
  const { label } = getAgeDetails(
    getDefaultLocalDateTime(),
    user.child.birthday
  )
  return (
    <div className="w-48 bg-white bg-opacity-70 p-2 text-sm backdrop-blur-lg backdrop-filter">
      <p className="text-gray-500">
        {user.child.name}
        <span className="font-semibold text-indigo-400 ">{label}</span>
        啦，已经坚韧地长出了{' '}
        <span className="font-semibold text-indigo-400">1 颗</span>牙
        乳牙已长出：XXX/20，已脱落：XXX/20； 恒牙已长出：XXX/28
      </p>
    </div>
  )
}
