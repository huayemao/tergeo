import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function OperationModal({
  isOpen,
  onConfirm,
  closeModal,
  content,
  title,
}) {
  return (
    <>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0" />
          {/* </Transition.Child> */}

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-semibold leading-6 text-indigo-700"
            >
              {title}
            </Dialog.Title>
            <div className="mt-2 text-sm">{content}</div>

            <div className="mt-4 space-x-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-1 text-sm font-medium text-white hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                onClick={onConfirm}
              >
                {'确认'}
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                {'取消'}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
