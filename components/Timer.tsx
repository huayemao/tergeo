import React, { useState, useEffect } from 'react'
import { useTimer, useTimerDispatch } from '../contexts/timerContext'

export function Timer({ duration = 60, radius = 75, content = 'default' }) {
  const { seconds, isActive } = useTimer()

  const dispatch = useTimerDispatch()

  useEffect(() => {
    if (seconds + 1 > duration) {
      dispatch({ type: 'STOP' })
    }
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        dispatch({ type: 'INCREMENT' })
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  const circumference = ((2 * 22) / 7) * radius
  const offset = circumference * (1 - seconds / duration)

  return (
    <div
      className="shadow- relative flex h-[169px] w-[169px] items-center justify-center bg-white "
      style={{ borderRadius: '85px' }}
    >
      <svg className="h-[170px] w-[170px] -rotate-90">
        <circle
          cx="85"
          cy="85"
          r={radius}
          stroke="currentColor"
          strokeWidth="20"
          fill="transparent"
          className="text-indigo-50 shadow"
        />

        <circle
          cx="85"
          cy="85"
          r={radius}
          stroke="currentColor"
          strokeWidth="20"
          fill="transparent"
          strokeDasharray={circumference}
          // strokeLinecap="round"
          strokeDashoffset={offset}
          className="text-indigo-300 shadow-lg transition-all ease-linear"
          style={{ transitionDuration: '1s' }}
        />
      </svg>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-center text-3xl font-semibold text-indigo-500">
        {content === 'default' ? `0:${seconds}` : content}
      </div>
    </div>
  )
}