import { CardChampions } from "./CardChampions"

export const ListChampions: React.FC = () => {
    return (
        <div className="grid grid-cols-3 gap-6 py-6 h-[60vh] overflow-auto rounded-md">
            {
                [1,2,3].map(item => {
                    return <CardChampions key={item} />
                })
            }
        </div>
    )
}