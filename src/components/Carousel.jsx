import { useRef } from 'react';
import Card from './Card';

function Carousel({ title, data, loading, error }) {

    const carouselRef = useRef(null);

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const cardWidthWithMargin = 200;
            const scrollAmount = direction === 'left' ? -cardWidthWithMargin * 3 : cardWidthWithMargin * 3;

            carouselRef.current.scrollTo({
                left: carouselRef.current.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loading) return <p className="ms-4">Caricamento {title.toLowerCase()}...</p>;
    if (error) return <p className="error ms-4">{error}</p>;
    if (data.length === 0) return <p className="ms-4">Nessun {title.toLowerCase()} trovato.</p>;

    return (
        <div className="carousel-section relative group">

            <h2 className="ms-4 text-xl font-bold mt-6 mb-2 text-white">{title}</h2>

            <div className="relative">

                <button
                    className="absolute z-20 top-0 bottom-0 left-0 flex items-center p-2 
                               bg-black bg-opacity-90 text-white 
                               opacity-0 group-hover:opacity-80 
                               transition-opacity duration-300 
                               hover:bg-opacity-85 rounded-r-lg 
                               pointer-events-none group-hover:pointer-events-auto"
                    onClick={() => scrollCarousel('left')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                <div
                    className="carousel-row flex flex-nowrap py-[10px] overflow-x-scroll scrollbar-hide"
                    ref={carouselRef}
                >
                    {data.map((item) => (
                        <Card key={item.id} media={item} type={'small'}/>
                    ))}
                </div>

                <button
                    className="absolute z-20 top-0 bottom-0 right-0 flex items-center p-2 
                               bg-black bg-opacity-90 text-white 
                               opacity-0 group-hover:opacity-80 
                               transition-opacity duration-300 
                               hover:bg-opacity-85 rounded-l-lg
                               pointer-events-none group-hover:pointer-events-auto" // Rendi i bottoni cliccabili solo all'hover
                    onClick={() => scrollCarousel('right')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Carousel;