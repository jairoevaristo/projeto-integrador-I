import { Upload } from "phosphor-react"
import { useEffect, useRef, useState } from "react";
import { useUploadImageProfile } from "../hooks/useUploadAvatar";
import { Avatar } from "./Avatar";
import { RenderConditional } from "./RenderConditional";
import { SpinnerLoading } from "./SpinnerLoading";

interface UploadAvatarProps {
  onHandleSelectedAvatar: (base64: File[] | null) => void;
  title: string;
  value?: string;
}

export const UploadAvatar: React.FC<UploadAvatarProps> = ({
  onHandleSelectedAvatar,
  title,
  value,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isVisibleImageGallery, setIsVisibleImageGallery] = useState(false);

  const {
    errorImage,
    handleUploadFile,
    loadingUploadFile,
    previewUploadFile,
    avatar,
    setPreviewUploadFile
  } = useUploadImageProfile();

  useEffect(() => {
    if (value) {
      setPreviewUploadFile(value);
    }
  }, []);

  useEffect(() => {
    if (avatar) {
      onHandleSelectedAvatar(avatar);
    }
  }, [avatar]);

  return (
    <>
      <Avatar
        photo={previewUploadFile}
        onClick={() => setIsVisibleImageGallery(false)}
        isVisible={isVisibleImageGallery}
      />

      <div>
        <div className="flex justify-between">
          <div>
            <span className="font-semibold text-gray-400 text-sm">
              {title}
            </span>
            <div className="w-full flex">
              <button
                type="button"
                title="Selecionar imagem"
                className="flex items-center gap-2 uppercase px-4 py-2 bg-[#333] text-white rounded-[4px] text-sm mt-2"
                onClick={() => inputFileRef.current?.click()}
              >
                escolher foto
                <Upload className="text-white" size={20} />
              </button>
            </div>
            <input
              type="file"
              name="avatar"
              className="hidden"
              ref={inputFileRef}
              onChange={handleUploadFile}
            />
          </div>

          <RenderConditional condition={!errorImage && loadingUploadFile}>
            <div className="flex">
              <div className="flex items-center justify-center flex-col">
                <p className="uppercase text-center text-gray-500 font-semibold text-[12px]">
                  preview da imagem
                </p>
                <div className="h-16 w-16 rounded-md border-2 border-blue-200 shadow-lg flex items-center justify-center">
                  <SpinnerLoading size="MEDIUM" color="blue-200" />
                </div>
              </div>
            </div>
          </RenderConditional>

          <RenderConditional
            condition={!errorImage && !loadingUploadFile && !!previewUploadFile}
          >
            <div className="flex relative">
              <div className="flex items-center justify-center flex-col">
                <p className="uppercase text-gray-500 text-center font-semibold text-[12px]">
                  preview da imagem
                </p>
                <img
                  src={previewUploadFile || ""}
                  onClick={() => setIsVisibleImageGallery(true)}
                  alt="foto de perfil"
                  className="h-16 w-16 mt-1 cursor-pointer rounded-md border-2 border-blue-200 shadow-lg relative"
                />
              </div>
            </div>
          </RenderConditional>
        </div>
        <RenderConditional
          condition={errorImage}
          component={
            <span className="uppercase text-xs text-red-600 font-bold">
              Arquivos suportados apenas com as extensões (*png, *jpeg, *jpg)
            </span>
          }
        />
      </div>
    </>
  );
};