import React, { useContext, useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './ComponentCarousel.scss';
import { DataContext } from '../../DataContext';
import LoadingComponent from '../../complementos/LoadingComponent/LoadingComponent.jsx';

function ComponentCarousel() {
  const [loading, setLoading] = useState(false);
  const { randomEvent } = useContext(DataContext);
  const [index, setIndex] = useState(0);
  const maxImagesToShow = 10; // Número máximo de imágenes a mostrar
  const [filteredImages, setFilteredImages] = useState([]);
  const intervalRef = useRef(null); // Ref para mantener una referencia persistente al intervalo

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    // Verificar si randomEvent es un array vacío
    if (Array.isArray(randomEvent) && randomEvent.length === 0) {
      setLoading(true);
    }
  }, [randomEvent]); // El efecto se ejecutará cada vez que randomEvent cambie


  useEffect(() => {
    // Filtra las imágenes cuyos nombres contienen "1230" antes de la extensión
    const filtered = randomEvent
      ? randomEvent
        .flatMap((evento) =>
          evento.images.filter((image) =>
            /1230\.(jpg|jpeg|png|gif|webp)$/i.test(image.url)
          )
        )
        .slice(0, maxImagesToShow) // Limita la cantidad de imágenes mostradas a 6
      : [];

    setFilteredImages(filtered);

  }, [randomEvent, maxImagesToShow]);

  // Vuelve al primer índice cuando llegas al final del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex < filteredImages.length - 1) {
          return prevIndex + 1;
        } else {
          return 0; // Vuelve al primer índice cuando llegues al final
        }
      });
    }, 5000); // Cambiar la imagen cada 5 segundos (ajusta este valor según tus necesidades).

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria.
    return () => clearInterval(interval);
  }, [filteredImages]);

  return (
    <div className="ComponentCarousel ">
      <Carousel className='custom-carousel-item' fade activeIndex={index} onSelect={handleSelect}>

        {filteredImages.map((image, i) => {
          return (
            <Carousel.Item style={{ height: '30vw', width: '100%', position: 'relative', borderRadius: '2rem' }} key={i}>

              <img
                className="d-block img"
                src={image.url}
                alt={`Slide ${i}`}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%', // Hace que la imagen ocupe el 100% del ancho del Carousel.Item
                  height: '100%', // Mantiene la proporción de aspecto original de la imagen
                  objectFit: 'cover',
                }}
              />


            </Carousel.Item>
          );
        })}
      </Carousel>
      {loading ? <LoadingComponent /> : null}
    </div>
  );
}

export default ComponentCarousel;
