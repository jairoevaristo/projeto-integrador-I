import { ReactNode } from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

type AccordionProps = {
    text: string;
    children: ReactNode;
}

export default function Accordion({ text, children }: AccordionProps) {
  return (
    <div className="w-full pt-16">
      <div className="mx-auto w-full p-2 border-b border-gray-700">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-medium focus-visible:ring-opacity-75">
                <h1 className='text-2xl text-white'>{text}</h1>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
                {children}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        </div>
    </div>
  )
}