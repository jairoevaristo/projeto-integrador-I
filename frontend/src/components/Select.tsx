import { ReactNode } from "react";
import { ButtonMenuItem, Menu } from "./Menu"

type SelectProps = {
    label: string;
    placeholder: string | undefined;
    options: ButtonMenuItem[];
    icon?: ReactNode;
}

export const Select: React.FC<SelectProps> = ({ options, label, placeholder, icon }) => {
    return (
        <div>
            <span className="font-semibold text-gray-400 text-sm">
                {label}
            </span>
            <div className="bg-zinc-800 flex items-center border border-gray-600 mt-1 px-2 h-12 rounded">
                <div className="flex-1">
                    <Menu
                        title={placeholder}
                        items={options}
                    />
                </div>
                <div className="flex items-end justify-end">
                    {icon}
                </div>
            </div>
        </div>
    )
}