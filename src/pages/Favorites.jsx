import { useFavoritesData } from '../providers/FavoritesContextProvider';
import Card from '../components/Card'

export default function Favorites() {
    const { favorites } = useFavoritesData()

    if (!favorites || favorites.length === 0) {
        return (
            <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold mb-4">Your list is empty</h2>
                <p className="text-gray-400 text-lg">
                    You haven't added anything to your favorites yet.
                    Go back to the Home page to add movies and TV shows!
                </p>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-black text-white px-4 md:px-8 py-24">
            <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">My List</h1>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2">
                    {favorites.map((item) => (
                        <div key={item.id} className="mb-8 lg:mb-0 lg:m-4">
                            <Card media={item} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}