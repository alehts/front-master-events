import { useState, useEffect, createContext } from 'react';
import { httpClient } from './HttpClient';
import Keycloak from 'keycloak-js';

/*
    Init Options
  */
let initOptions = {
  url: 'http://localhost:8082/',
  realm: 'masterEvents',
  clientId: 'react-client',
}
let kc = new Keycloak(initOptions);


kc.init({
  onLoad: 'check-sso', // Supported values: 'check-sso' , 'login-required'
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((auth) => {
  if (!auth) {
    // window.location.reload();
  } else {
    /* Remove below logs if you are using this on production */
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    console.log('Access Token', kc.token)

    /* http client will use this header in every request it sends */
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;

    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  /* Notify the user if necessary */
  console.error("Authentication Failed");
});


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // const apiUrl = "http://ec2-100-24-53-81.compute-1.amazonaws.com:8081/event";
  const apiUrl = "http://localhost:9090/event";

  const [configuracion, setConfiguracion] = useState(null);
  const [eventById, setEventById] = useState(null);
  const [randomEvent, setRandomEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keycloak, setkeycloak] = useState(null);

  const fetchData = async (apiUrl, setDataCallback) => {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setDataCallback(data);
      } else {
        console.error(`Error al obtener datos de la API: ${apiUrl}`);
      }
    } catch (error) {
      console.error(`Error al obtener datos de la API: ${apiUrl}`, error);
    }
  };





  useEffect(() => {
    fetchData(apiUrl, setConfiguracion);
    // fetchData(`${apiUrl}/id`, setEventById);
    fetchData(`${apiUrl}/random`, setRandomEvent);
    setLoading(false);
  }, []); // Solo se ejecuta una vez al cargar el componente

  useEffect(() => {
    setkeycloak(kc)
  }, []); // Solo se ejecuta una vez al cargar el componente



  return (
    <DataContext.Provider value={{ configuracion, eventById, randomEvent, keycloak }}>
      {loading ? 'Cargando...' : children}
    </DataContext.Provider>
  );
};




//*********************************Desde archivo json************************************* */
/*
import {useState, useEffect, createContext} from 'react';//

export const DataContext = createContext();

export const DataProvider = ( { children }) => {



const url = "https://benjumeacarlos981.github.io/MasterEvents/configuracion.json";

    const [configuracion, setConfiguracion] = useState()

    const fetchApi = async () => {
      const response = await fetch(url)
      const responseJSON = await response.json()
      setConfiguracion(responseJSON)
    }

    useEffect(() => {
      fetchApi();

    }, [configuracion])

  return (
    <>
      { !configuracion ? 'Cargando...' :
      <DataContext.Provider value={
        {
          configuracion,
          setConfiguracion
        }
      }
    >

        { children }
      </DataContext.Provider>
      }
    </>
  )


}
*/
//************************************************************************************** */

