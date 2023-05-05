import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-center container mx-auto p-4">
            {children}
        </div>
    )
}