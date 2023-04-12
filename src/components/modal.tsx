import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Poppins } from 'next/font/google'

import Button from './button'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

type ModalProps = {
  open: boolean
  onClose: () => void
  title: strig
}

export default function Modal({ open, onClose, title }: ModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`${poppins.variable} fixed inset-0 z-30 overflow-y-auto`}
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-2xl transform overflow-hidden rounded-2xl bg-indigo-300 p-16 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-4xl font-bold leading-6 text-gray-900">
                {title}
              </Dialog.Title>
              <div className="mt-6">
                <p className="text-lg">Stay in the loop so you don’t miss an event!</p>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <Button size="large" onClick={onClose} emphasis="high" tone="accent">
                  Join mailing list
                </Button>
                <Button size="large" onClick={onClose} emphasis="low" tone="accent">
                  Cancel
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
