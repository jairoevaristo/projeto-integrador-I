import { Fragment, ReactNode } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CaretDown } from "phosphor-react";
import { ButtonMenu } from "./ButtonMenu";

export type ButtonMenuItem = {
  id: string | number;
  name: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
};

type MenuProps = {
  items: ButtonMenuItem[];
  title?: string;
};

export const Menu: React.FC<MenuProps> = ({ items, title }) => {
  return (
    <div className="top-16 max-w-sm">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                  ${open ? "" : "text-opacity-90"}
                  group gap-2 inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none`}
            >
              <span>
                {title}
              </span>
              <CaretDown className="text-white" size={20} />
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
              <Popover.Panel className={`absolute ${title ? 'right-8' : 'left-3'} top-10 z-10 w-48 mt-3 -translate-x-1/2 transform px-4 sm:px-0`}>
                <div className="overflow-hidden rounded-lg shadow-lg ring-4 ring-gray-50 ring-opacity-5">
                  <div className="relative grid gap-4 bg-black p-4 lg:grid-row-2">
                    {items.map((item) => (
                      <ButtonMenu key={item.id} menuButtonItem={item} />
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
