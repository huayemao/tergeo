import React, { useMemo, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { casualPlayList, playlist } from '../constants/playlist'
import { useTimer } from '../contexts/timerContext'
import { getActiveZone } from '../lib/getActiveZone'

export function Player() {
  const { seconds, isActive, reseted } = useTimer()

  const [currentMusicIndex, setIndex] = useState(0)

  const [prefix, name] = getActiveZone(seconds)

  const timeMapping = {
    prepare: 0,
    tr: 1,
    br: 2,
    bl: 3,
    tl: 4,
    over: 5,
  }
  const index = timeMapping[prefix]

  const handleClickPrevious = (): void => {
    setIndex((prevState) =>
      prevState === 0 ? casualPlayList.length - 1 : prevState - 1
    )
  }

  const handleClickNext = (): void => {
    setIndex((prevState) =>
      prevState < casualPlayList.length - 1 ? prevState + 1 : 0
    )
  }

  return (
    <>
      <AudioPlayer
        autoPlay={isActive}
        customProgressBarSection={[]}
        autoPlayAfterSrcChange={true}
        loop={false}
        showSkipControls={true}
        showJumpControls={false}
        src={isActive ? casualPlayList[currentMusicIndex].src : ''}
        onEnded={handleClickNext}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
      />
      <AudioPlayer
        className="!hidden"
        autoPlay={true}
        customProgressBarSection={[]}
        autoPlayAfterSrcChange={true}
        loop={false}
        showSkipControls={true}
        showJumpControls={false}
        src={reseted && index === 0 ? '' : playlist[index].src}

        // onEnded={handleClickNext}
        // onClickPrevious={handleClickPrevious}
        // onClickNext={handleClickNext}
      />
    </>
  )
}
