import { useMemo } from 'react'
import {
  Tooth,
  ToothGrowthActionType,
  ToothGrowthRecord,
} from '../typings/Tooth'
import { gitDistanceFromBirth } from '../lib/day'
import { useUser } from '../contexts/userContext'
import { Child } from '../typings/child'

export const getTimeline: ToothGrowthRecord[] = (tooth: Tooth) => {
  const filterdRecord: ToothGrowthRecord[] = tooth.growthRecord.reduce(
    (acc, cur) =>
      cur.type === ToothGrowthActionType.REVERT
        ? acc.slice(0, -1)
        : acc.concat(cur),
    []
  )
  return filterdRecord.reverse()
}
interface DisplayRecord extends ToothGrowthRecord {
  diff: any[]
}

export const TimelineItem = ({
  record,
  child,
}: {
  record: DisplayRecord
  child: Child
}) => {
  return (
    <li className="mb-10 ml-6 text-left">
      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-200 ring-8 ring-white dark:bg-indigo-900 dark:ring-gray-900">
        <svg
          className="h-3 w-3 text-indigo-600 dark:text-indigo-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
      <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
        {record.name}
        {/* <span className="mr-2 ml-3 rounded bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800 dark:bg-indigo-200 dark:text-indigo-800">
          最新
        </span> */}
      </h3>
      <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {new Date(record.dateTime).toLocaleString()}
      </time>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {child.name}
        {record.diff}
        {record.remarkContent}
      </p>
    </li>
  )
}

export const GrowtTimeLine = ({ tooth }: { tooth: Tooth }) => {
  const { child } = useUser()

  const { name, birthday } = child || {}

  const records = useMemo((): (ToothGrowthRecord | { diff: any[] })[] => {
    const rawRecords: ToothGrowthRecord = getTimeline(tooth)
    return rawRecords.map((e) => ({
      ...e,
      diff: birthday ? gitDistanceFromBirth(e.dateTime, birthday) : [0, 0, 0],
    }))
  }, [birthday, tooth])

  return (
    <>
      <ol className="relative border-l border-gray-200">
        {tooth &&
          records.map((e) => (
            <TimelineItem
              key={e.dateTime}
              record={e}
              child={child}
            ></TimelineItem>
          ))}
      </ol>
    </>
  )
}
