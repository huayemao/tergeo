import Image from 'next/image'
import React from 'react'

export type CardProps = PropsWithChildren<{
  title
  className?: string
  tags?: string[]
  imgSrc?: string
}>

const Card: FC<CardProps> = ({
  title,
  children,
  className = '',
  tags,
  imgSrc,
}) => {
  return (
    <a
      className={
        'group grid grid-cols-3 overflow-hidden rounded-lg border border-gray-100 shadow-lg md:grid-cols-1 ' +
        className
      }
      href=""
    >
      <div className="relative">
        <Image
          objectFit={'cover'}
          layout={'fill'}
          // width={'100%'}
          // height={'100%'}
          className="absolute inset-0 h-full w-full object-cover"
          src="https://www.hyperui.dev/photos/activity-1.jpeg"
          alt=""
        />
      </div>

      <div className="col-span-2 p-8 md:col-span-1">
        <ul className="flex space-x-1">
          <li className="inline-block rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
            Notice
          </li>

          <li className="inline-block rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
            Information
          </li>
        </ul>

        <h5 className="mt-4 font-bold">{title}</h5>

        <p className="mt-2 text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
          adipisci!
        </p>
      </div>
    </a>
  )
}

export default Card
