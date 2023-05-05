import { ButtonHTMLAttributes, ReactElement } from "react";
import { RenderConditional } from "./RenderConditional";
import { SpinnerLoading } from "./SpinnerLoading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: ReactElement;
    className?: string;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ text, icon, className, isLoading, ...props }: ButtonProps) => {
   return (
        <button 
            className={`flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md focus:ring-2 focus:outline-none focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-600 hover:bg-blue-700 transition-colors ${className}`}
            {...props}
        >
            <RenderConditional condition={!!isLoading}>
                <SpinnerLoading />
            </RenderConditional>
            
            <RenderConditional condition={!!!isLoading && !!icon}>
                {icon}
            </RenderConditional>
            {text}
        </button>
    )
}