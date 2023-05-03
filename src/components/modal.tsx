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
  title: string
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
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
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
            <div className="my-8 inline-block w-full max-w-2xl transform overflow-hidden rounded-2xl bg-accent p-8 text-left align-middle shadow-xl transition-all md:p-12 lg:p-16">
              <Dialog.Title
                as="h3"
                className="text-3xl font-bold text-gray-900 md:text-4xl"
              >
                {title}
              </Dialog.Title>
              <div className="mt-6">
                <p className="text-lg">
                  Stay in the loop so you don’t miss an event!
                </p>
              </div>

              <form className="mt-5 grid gap-5">
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm/none font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter email address"
                    className="max-w-sm rounded border-2 border-slate-800 p-3 text-lg/none leading-none placeholder:text-slate-600 sm:p-4"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    size="large"
                    type="submit"
                    onClick={onClose}
                    emphasis="high"
                    tone="accent"
                  >
                    Join mailing list
                  </Button>
                  <Button
                    size="large"
                    onClick={onClose}
                    emphasis="low"
                    tone="accent"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
