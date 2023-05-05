import React, { useCallback, useEffect } from "react";
import { X } from 'phosphor-react'

interface AvatarProps {
  photo: string | null;
  onClick: () => void;
  isVisible: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  photo,
  onClick,
  isVisible,
}: AvatarProps) => {
  const photoComponent =
    photo ||
    "https://www.google.com/search?q=placeholder+image&rlz=1C1GCEA_pt-BRBR977BR977&sxsrf=ALiCzsZ-wtCKJyAqa9CI3lUg9uZIFXI7Mw:1659490816190&tbm=isch&source=iu&ictx=1&vet=1&fir=2vPMmqYJEzuiWM%252CjKN_oULurygfxM%252C_%253BE9-dfhF34W5_uM%252C7Q1L1mDaxZwCnM%252C_%253BWLYeHymZ57mJiM%252Cl5j5TNAE6HBXoM%252C_%253BBxAlwNaiKbTcxM%252CYM0t3tz9czjj1M%252C_%253BTfJ4WQJrQtR0FM%252Cq5Vzj9UOHVARRM%252C_%253BnqCzAZFVfmrDnM%252CCFueadwjE5FYgM%252C_%253BTyNWXI5j-URvWM%252CPodgqzE4V9M5xM%252C_%253BmgqxH47gQqrmXM%252CODo_DEB3NtRwlM%252C_%253B65cnYqLXN9pY-M%252ClyzZAogyNvvx5M%252C_%253B6_BE2Bv1oAkV1M%252C7Q1L1mDaxZwCnM%252C_&usg=AI4_-kTX7Mj-PFrwA50C5qEyCWWOlDn9aA&sa=X&ved=2ahUKEwjRle2Exan5AhUutpUCHSNcBOIQ9QF6BAgDEAE#imgrc=2vPMmqYJEzuiWM";

  const handlePressCloseGallery = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClick();
      }
    },
    [onClick]
  );

  useEffect(() => {
    document.addEventListener("keydown", handlePressCloseGallery, false);

    return () => {
      document.removeEventListener("keydown", handlePressCloseGallery, false);
    };
  }, [handlePressCloseGallery]);

  return (
    <div
      className={`fixed bg-gray-900/20 top-0 left-0 w-full h-screen flex justify-center items-center z-30 ${
        !isVisible && "hidden"
      }`}
    >
      <div className="absolute top-3 right-3 cursor-pointer" onClick={onClick}>
        <X className="text-white" size={32} />
      </div>
      <div className="xl:w-[55vw] flex items-center justify-center px-6 lg:px-0">
        <img
          src={photoComponent}
          alt="foto do avatar"
          className="rounded-sm md:h-[70vh] xl:h-[90vh]"
        />
      </div>
    </div>
  );
};