import Card from "./Card";
function CardGrid({ title, data, currentPage, totalPages, loading, error, onPageChange }) {

    if (loading) return <p className="p-4 text-white">Loading {title.toLowerCase()}...</p>;
    if (error) return <p className="error p-4 text-red-500">{error}</p>;
    if (!data || data.length === 0) return <p className="p-4 text-white">No results found for {title.toLowerCase()}.</p>;

    return (
        <div className="media-grid-page p-4">

            <h2 className="text-3xl font-bold mb-6 text-white">{title}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7 gap-4">
                {data.map((item) => (
                    <Card key={item.id} media={item} type={'grid'}/>
                ))}
            </div>
            <div className="flex justify-center items-center my-8 space-x-4 text-white">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-2 rounded-lg transition-colors"
                >

                    Previous Page
                </button>

                <span className="text-lg">
                    Page {currentPage}/{totalPages}
                </span>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-2 rounded-lg transition-colors"
                >
                    Next Page
                </button>
            </div>
        </div>
    );
}

export default CardGrid;