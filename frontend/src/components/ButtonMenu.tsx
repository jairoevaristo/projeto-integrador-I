import { Link } from "react-router-dom";
import { ButtonMenuItem } from "./Menu";

type ButtonMenuProps = {
  menuButtonItem: ButtonMenuItem;
};

export const ButtonMenu: React.FC<ButtonMenuProps> = ({ menuButtonItem }) => {
  if (menuButtonItem.href) {
    return (
      <Link
        to={menuButtonItem.href}
        key={menuButtonItem.name}
        onClick={menuButtonItem?.onClick}
        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-zinc-900 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
      >
        {menuButtonItem?.icon ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white">
            {menuButtonItem.icon}
          </div>
        ) : (
          <div className="flex h-10 w-2" />
        )}

        <div className="ml-2">
          <p className="text-sm font-medium text-white">
            {menuButtonItem.name}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <button
      type="button"
      key={menuButtonItem.name}
      onClick={menuButtonItem?.onClick}
      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-zinc-900 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
    >
      {menuButtonItem?.icon ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white">
          {menuButtonItem.icon}
        </div>
      ) : (
        <div className="flex h-10 w-2" />
      )}

      <div className="ml-2">
        <p className="text-sm font-medium text-white">{menuButtonItem.name}</p>
      </div>
    </button>
  );
};
