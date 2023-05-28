import { useEffect, useState } from "react";
import { randomColor } from "../utils/random-color";

interface ProfileAvatarProps {
    name: string | undefined;
    avatar_url?: string;
    size?: "SMALL" | "MEDIUM" | "LARGE";
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, avatar_url, size = "SMALL" }) => {
    const firstLetter = name?.slice(0, 1).toUpperCase();
    const [colorProfile, setColorProfile] = useState('');

    const sizeAvatar = {
        SMALL: "w-16 h-16",
        MEDIUM: "w-22 h-22",
        LARGE: "w-28 h-28",
      };

    useEffect(() => {
        const storage = localStorage.getItem('profile_color');
        if (storage) {
            setColorProfile(storage)
            return;
        }

        const borderProfileColor = `#${randomColor()}`;
        localStorage.setItem('profile_color', borderProfileColor);

    }, [])

    if (!avatar_url) {
        return (
            <div className={`rounded-full flex items-center justify-center ${sizeAvatar[size]} border-4`} style={{ borderColor: colorProfile }}>
                <span className="rounded-full overflow-hidden border-4 border-none text-3xl font-bold text-white">{firstLetter}</span>
            </div>
        )
    }

    return (
        <div className={`rounded-full ${sizeAvatar[size]} border-4`} style={{ borderColor: colorProfile }}>
            <img 
                className="rounded-full overflow-hidden border-4 border-zinc-900 aspect-square"
                src={avatar_url} alt={name || ''} />
        </div>
    )
}