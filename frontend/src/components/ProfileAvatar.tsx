import { randomColor } from "../utils/random-color";

interface ProfileAvatarProps {
    name: string;
    avatar_url?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, avatar_url }) => {
    const borderColor = `#${randomColor()}`;
    const firstLetter = name?.slice(0, 1).toUpperCase();

    if (!avatar_url) {
        return (
            <div className="rounded-full flex items-center justify-center h-16 w-16 border-4" style={{ borderColor }}>
                <span className="rounded-full overflow-hidden border-4 border-zinc-900 text-3xl font-bold text-white">{firstLetter}</span>
            </div>
        )
    }

    return (
        <div className="rounded-full h-16 w-16 border-4" style={{ borderColor }}>
            <img 
                className="rounded-full overflow-hidden border-4 border-zinc-900 aspect-square"
                src={avatar_url} alt={name} />
        </div>
    )
}