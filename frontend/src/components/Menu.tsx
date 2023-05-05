import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { CaretDown, Power, User } from 'phosphor-react'
import { useAuth } from '../hooks/useAuth'

const solutions = [
  {
    name: 'Minha conta',
    icon: <User className='text-white' size={20} />,
  },
  {
    name: 'Sair',
    icon: <Power className='text-white' size={20} />,
  }
]

export const Menu: React.FC = () => {
  const { signOut } = useAuth()

    return (
        <div className="top-16 max-w-sm">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                  ${open ? '' : 'text-opacity-90'}
                  group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <CaretDown className='text-white' size={20} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-3 z-10 w-48 mt-3 -translate-x-1/2 transform px-4 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-4 ring-gray-50 ring-opacity-5">
                    <div className="relative grid gap-4 bg-black p-4 lg:grid-row-2">
                      {solutions.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            if (item.name === 'Sair') {
                              signOut();
                            }
                          }}
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-zinc-900 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white">
                            {item.icon}
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-medium text-white">
                              {item.name}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div> 
    )
}