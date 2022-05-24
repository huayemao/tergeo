import { useMemo } from 'react'
import {
  Tooth,
  ToothGrowthActionType,
  ToothGrowthRecord,
} from '../typings/Tooth'
import { getAgeDetails, gitDistanceFromBirth } from '../lib/day'
import { useUser } from '../contexts/userContext'
import { Child } from '../typings/child'
import { getToothBaseInfo } from '../lib/tooth'
import { CalendarIcon } from '@heroicons/react/outline'

export const getTimelineRecords: ToothGrowthRecord[] = (tooth: Tooth) => {
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
  ageDetail: any
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
        <CalendarIcon className="h-3 w-3 text-indigo-600"></CalendarIcon>
      </span>
      <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
        {getToothBaseInfo(record.toothName).toothName} {record.eventName}
        {/* <span className="mr-2 ml-3 rounded bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800 dark:bg-indigo-200 dark:text-indigo-800">
          最新
        </span> */}
      </h3>
      <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {new Date(record.dateTime).toLocaleString()}
      </time>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {child.name}
        {record.ageDetail.label}。{record.remarkContent}
      </p>
    </li>
  )
}

export const GrowthTimeLine = ({ tooth }: { tooth: Tooth }) => {
  const { child } = useUser()

  const { name, birthday } = child || {}

  const records = useMemo((): DisplayRecord[] => {
    const rawRecords: ToothGrowthRecord[] = getTimelineRecords(tooth)
    return rawRecords.map((e) => ({
      ...e,
      ageDetail: getAgeDetails(e.dateTime, birthday),
    }))
  }, [birthday, tooth])

  return (
    <>
      <ol className="relative m-2 border-l border-gray-200">
        {tooth &&
          records.map((e) => (
            <TimelineItem key={e.dateTime} record={e} child={child} />
          ))}
      </ol>
    </>
  )
}

export const AllTeethGrowthTimeLine = ({ teeth }: { teeth: Tooth[] }) => {
  const { child } = useUser()

  const { name, birthday } = child || {}

  const records = useMemo((): DisplayRecord[] => {
    const rawRecords: ToothGrowthRecord[] = teeth
      .flatMap((tooth) => getTimelineRecords(tooth))
      .sort(
        (a: ToothGrowthRecord, b: ToothGrowthRecord) => a.dateTime - b.dateTime
      )
    return rawRecords.map((e) => ({
      ...e,
      ageDetail: getAgeDetails(e.dateTime, birthday),
    }))
  }, [birthday, teeth])

  return (
    <>
      <ol className="relative m-2 border-l border-gray-200">
        {teeth &&
          records.map((e) => (
            <TimelineItem
              key={e.toothName + e.dateTime}
              record={e}
              child={child}
            />
          ))}
      </ol>
    </>
  )
}
