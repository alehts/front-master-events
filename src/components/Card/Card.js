import React, { useContext, useEffect, useState } from "react";
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import "./Card.scss";
import { DataContext } from "../../DataContext";
import ModalCard from "./ModalCard";

function Card() {
  const { randomEvent } = useContext(DataContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();

    // Filtrar el array de objetos por cualquier criterio
    const results = randomEvent.filter((item) => {
      // Modifica esta condición según tus criterios de búsqueda
      return (
        (item.nameEvent).toLowerCase().includes(term) ||
        (item.city).toLowerCase().includes(term) ||
        (item.category).toLowerCase().includes(term) ||
        (item.location).toLowerCase().includes(term) ||
        (item.description).toLowerCase().includes(term)
      );
    });
    setSearchTerm(term);
    setSearchResults(results);
  };

  // useEffect(() => {
  //   if (randomEvent) {
  //     return setSearchResults(randomEvent);
  //   }
  // }, [])

  // console.log(randomEvent);
  // Comprobar si configuracion es null o undefined
  if (!randomEvent) {
    return null; // O cualquier otro manejo de error que prefieras
  }

  // Función para mostrar el modal con los datos del evento seleccionado
  const showEventModal = (event) => {
    setSelectedEvent(event);
    setModalShow(true);
  };

  return (
    <div id="ContenedorEventos">
      <div id="ContenedorCard">
        <div className="encabezadocard">
          {/* Buscador */}
          <div>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />


          </div>

          {/* <Nav.Link  >
            <i className="bi bi-cart4 shopping-cart"></i> <Badge bg="light" text="dark">Recurso</Badge>
          </Nav.Link> */}

          <small>CONOCE NUESTROS</small>
          <h2>EVENTOS</h2>
        </div>
        <div id="cont-row">
          {
            (() => {
              return searchResults.length > 0 ? searchResults : randomEvent;
            })().map((evento, index) => {
              // Filtra las imágenes que contienen "1230" en su URL
              const imagenesFiltradas = evento.images.filter((imagen) =>
                imagen.url.includes("327")
              );
              const imagenURL = imagenesFiltradas.length > 0 ? imagenesFiltradas[0].url : "";

              return (
                <div id="card" key={evento.id}>
                  <div
                    id="imagen"
                    className="card-imagen"
                    style={{
                      backgroundImage: `url(${imagenURL})`,
                    }}
                  ></div>
                  <div id="body">
                    <h3>{evento.nameEvent}</h3>
                    <div className="linea"></div>
                    <div className="detallesevent">
                      <div className="fecha">

                        <div className="fecha-mes">
                          {new Date(evento.date).toLocaleString("default", {
                            month: "short",
                          })}
                        </div>
                        <div className="fecha-dia">
                          {new Date(evento.date).getDate()}
                        </div>
                        <div className="fecha-mesAno">
                          {new Date(evento.date).getFullYear()}
                        </div>
                      </div>
                      <div className="contbodyizquierdo">
                        {/* <div className="lugar">{evento.location}</div> */}
                        <h3 className="lugar">{evento.location}</h3>
                        <div className="button" onClick={() => showEventModal(evento)}>
                          <a href="#" type="button">
                            Ver Detalles
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {modalShow && (
        <ModalCard show={modalShow} onHide={() => setModalShow(false)} event={selectedEvent} />
      )}

      {/* {modalShow && selectedEvent && (
        <ModalCard
          show={modalShow}
          onHide={() => setModalShow(false)}
          event={selectedEvent} // Pasa el evento seleccionado como prop
        />
      )} */}

    </div>
  );
}




export default Card;
