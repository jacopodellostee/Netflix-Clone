import Card from "./Card";
function CardGrid({ title, data, currentPage, totalPages, loading, error, onPageChange }) {

    if (loading) return <p className="p-4 text-white">Loading {title.toLowerCase()}...</p>;
    if (error) return <p className="error p-4 text-red-500">{error}</p>;
    if (!data || data.length === 0) return <p className="p-4 text-white">No results found for {title.toLowerCase()}.</p>;

    return (
        <div className="media-grid-page p-4">

            <h2 className="text-3xl font-bold mb-6 text-white">{title}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 xxl:grid-cols-7 gap-4 justify-items-center">
                {data.map((item) => (
                    <Card key={item.id} media={item} type={'grid'} />
                ))}
            </div>
            <div className="flex justify-center items-center my-8 space-x-4 text-white">
                <a
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`p-2 transition-colors underline ${currentPage <= 1
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-gray-200 hover:text-red-700 cursor-pointer"
                        }`}
                >
                    Previous Page
                </a>

                <span className="text-lg">
                    Page {currentPage}/{totalPages}
                </span>

                <a
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={`p-2 transition-colors underline ${currentPage >= totalPages
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-gray-200 hover:text-red-700 cursor-pointer"
                        }`}
                >
                    Next Page
                </a>
            </div>
        </div>
    );
}

export default CardGrid;