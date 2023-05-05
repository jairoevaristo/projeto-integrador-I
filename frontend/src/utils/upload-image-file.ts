import { ChangeEvent } from "react";
import { acceptImageUpload } from "./validate-type-image";

interface UploadImageFileReturn {
  error: boolean;
  files: File[] | undefined;
  imageUrlConvert: string | null;
  blobToBase64?: (blob: any) => Promise<any>
  base64: Blob | undefined;
}

export const uploadImageFile = (event: ChangeEvent<HTMLInputElement>): UploadImageFileReturn => {
  if (event.target.files && event.target.files[0]) {
    const { type } = event.target.files[0];        
    const imageUrlConvert = URL.createObjectURL(event.target.files[0]);

    const blobToBase64 = (blob: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise(resolve => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    };

    
    if (!acceptImageUpload(type)) {
      return {
        error: true,
        files: undefined,
        imageUrlConvert: null,
        blobToBase64,
        base64: undefined
      };
    }
    
    return {
      error: false,
      files: Array.from(event.target.files),
      imageUrlConvert,
      blobToBase64,
      base64: event.target.files[0]
    };
  }

  return {
    error: true,
    files: undefined,
    imageUrlConvert: null,
    base64: undefined
  }
}