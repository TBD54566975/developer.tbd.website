import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Gallery({ images }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const containerStyle = {
    width: '60%',
    margin: '0 auto',
  };

  const imageStyle = {
    width: '100%',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    transform: hoverIndex !== null ? 'scale(1.05)' : 'none',
  };

  return (
    <div style={containerStyle}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            onMouseOver={() => setHoverIndex(index)}
            onMouseOut={() => setHoverIndex(null)}
          >
            <a
              href={image.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              <img
                src={image.path}
                alt={image.caption || `Slide ${index}`}
                style={imageStyle}
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Gallery;
