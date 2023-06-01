import { ChangeEvent, useState } from "react";
import { uploadImageFile } from "../utils/upload-image-file";

export function useUploadImageProfile() {
  const [previewUploadFile, setPreviewUploadFile] = useState<string | null>(
    null
  );
  const [avatar, setAvatar] = useState<File[]>();
  const [loadingUploadFile, setLoadingUploadFile] = useState(false);
  const [errorImage, setErrorImage] = useState(false);

  function handleUploadFile(event: ChangeEvent<HTMLInputElement>) {
    setPreviewUploadFile(null);
    setLoadingUploadFile(true);
    setErrorImage(false);

    const { blobToBase64, error, imageUrlConvert, base64 } =
      uploadImageFile(event);

    setErrorImage(error);
    setPreviewUploadFile(imageUrlConvert);

    if (blobToBase64) {
      blobToBase64(base64).then((res: any) => {
        setAvatar(res);
      });
    }

    setTimeout(() => {
      setLoadingUploadFile(false);
    }, 500);
  }

  return {
    errorImage,
    loadingUploadFile,
    avatar,
    handleUploadFile,
    previewUploadFile,
    setPreviewUploadFile
  };
}