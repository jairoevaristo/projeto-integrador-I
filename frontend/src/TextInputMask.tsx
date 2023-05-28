import React, {
    forwardRef,
    InputHTMLAttributes,
    ReactNode,
    useState,
  } from "react";
  import InputMask from "react-input-mask";
  
  export interface TextInputMaskProps
    extends InputHTMLAttributes<HTMLInputElement> {
    offset?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    label?: string;
    error?: string;
    onClickRightIcon?: () => void;
    onClickLeftIcon?: () => void;
    className?: string;
    mask: string;
  }
  
  export const TextInputMask: React.FC<TextInputMaskProps> = forwardRef(
    (
      {
        error,
        leftIcon,
        rightIcon,
        onClickLeftIcon,
        onClickRightIcon,
        label,
        className,
        mask,
        ...props
      },
      ref
    ) => {
      const [isFocused, setIsFocused] = useState(false);
  
      function handleInputFocus() {
        setIsFocused(true);
      }
  
      function handleInputBlur() {
        setIsFocused(false);
      }
  
      return (
        <div className="flex flex-col justify-start w-ful">
          <label className="font-semibold text-gray-400 text-sm">{label}</label>
          <div
            onBlur={handleInputBlur}
            className={`border w-full border-gray-600 bg-zinc-800 py-3 px-2 rounded-[4px] flex items-center mt-2 ${
              !error && isFocused && "ring-2 ring-slate-600"
            } ${
              error && "border-2 border-red-600"
            } transition duration-200 ease-in-out bg-white ${className}`}
          >
            <div className="mr-2" onClick={onClickLeftIcon}>
              {leftIcon}
            </div>
            <InputMask
              type={props.type}
              mask={mask}
              value={props.value}
              onFocus={handleInputFocus}
              name={props.name}
              className={`w-full border-0 p-0 ring-0 outline-none bg-none overflow-hidden bg-zinc-800 placeholder-gray-400 text-white ${
                error && "placeholder-red-600 text-red-600"
              }`}
              {...props}
            />

            <div>
              {rightIcon}
            </div>
          </div>
        </div>
      );
    }
  );