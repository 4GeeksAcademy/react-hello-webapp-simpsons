import { useState } from "react";

export const Carousel = ({ items, itemsPerSlide = 4, renderItem, title }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = Math.ceil(items.length / itemsPerSlide);

    const nextSlide = () => {
    if (currentSlide === totalSlides - 1) {
        setCurrentSlide(0);
    } else {
        setCurrentSlide(currentSlide + 1);
    }
};

    const prevSlide = () => {
    if (currentSlide === 0) {
        setCurrentSlide(totalSlides - 1); 
    } else {
        setCurrentSlide(currentSlide - 1);
    }
};

    return (
        <div className="carousel-container position-relative">
            {title && <h2 className="mb-4">{title}</h2>}
            <div className="carousel slide">
                <div className="carousel-inner">
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div key={slideIndex} className={`carousel-item ${slideIndex === currentSlide ? 'active' : ''}`}>
                            <div className="row g-4 justify-content-center">
                                {items.slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide).map((item, idx) => (
                                        <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                                            {renderItem(item)}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
                {totalSlides > 1 && (
                    <div>
                        <button
                            className="carousel-control-prev position-absolute top-50 start-0 translate-middle-y"
                            style={{ 
                                width: '40px', 
                                height: '40px', 
                                background: 'rgba(0,0,0,0.3)', 
                                borderRadius: '50%', 
                                border: 'none',
                            }} onClick={prevSlide}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </button>
                        <button className="carousel-control-next position-absolute top-50 end-0 translate-middle-y"
                            style={{ 
                                width: '40px', 
                                height: '40px', 
                                background: 'rgba(0,0,0,0.3)', 
                                borderRadius: '50%', 
                                border: 'none'
                            }} onClick={nextSlide}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};