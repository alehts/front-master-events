import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import "./FormEvent.scss";
import { DataContext } from '../../DataContext';

const bucket = process.env.REACT_APP_AWS_S3_BUCKET_IMG;
const api = process.env.REACT_APP_AWS_EC2_API_EVENT;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const region = process.env.REACT_APP_AWS_REGION;

console.log(api)


const EventForm = () => {

    //****************************Footer******************************** */

    const handleFooterFix = () => {
      const footerElement = document.querySelector('.footer');
      const appElement = document.querySelector('.App');
      if (footerElement) {
        footerElement.style.position = 'fixed';
        footerElement.style.bottom = '0';
      }
      if (appElement) {
        appElement.style.display = 'flex';
        appElement.style.flexDirection = 'column';
        appElement.style.justifyContent = 'center';
      }
    };

    const handleRemoveFooterFix = () => {
      const footerElement = document.querySelector('.footer');
      const appElement = document.querySelector('.App');
      if (footerElement) {
        footerElement.style.position = ''; // Restablecer la posición predeterminada
        footerElement.style.bottom = '';
      }
      if (appElement) {
        appElement.style.display = '';
        appElement.style.flexDirection = '';
        appElement.style.justifyContent = '';
      }
    };

    useEffect(() => {
      // Aquí puedes llamar a la función que ajusta el footer cuando el componente se monta
      handleFooterFix();

      // Limpia la configuración cuando el componente se desmonta
      return () => {
        handleRemoveFooterFix();
      };
    }, []); // Se ejecutará cuando clientSecret cambie

    //********************************************************************** */


  const fileInputRef = useRef(null);
  const { keycloak } = useContext(DataContext);

  const initialFormData = {
    nameEvent: "",
    description: "",
    location: "",
    city: "",
    date: "",
    category: "",
    minimumAge: "",
    address: "",
    openTime: "",
    price: "",
    quantity: "",
    images: [],
  };
  const [formData, setFormData] = useState({
    nameEvent: "",
    description: "",
    location: "",
    city: "",
    date: "",
    category: "",
    minimumAge: "",
    address: "",
    openTime: "",
    price: "",
    quantity: "",
    images: [],
  });

  const [formMessage, setFormMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [nameEventError, setNameEventError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [cityError, setCityError] = useState("");
  const [dateError, setDateError] = useState("");
  const [openTimeError, setOpenTimeError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [minimumAgeError, setMinimumAgeError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [imagesError, setImagesError] = useState("");



  const [userId, setUserId] = useState(null);
  // const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Use the Keycloak object to get the user ID after authentication
    if (keycloak.authenticated) {
      // setUserName(keycloak.tokenParsed.preferred_username);
      setUserId(keycloak.tokenParsed.sub);
    }
  }, [keycloak.authenticated]);



  const isValidOpenTime = (time) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return timeRegex.test(time);
  };

  //********************************************************** */
  const formatIntegerWithCommas = (number) => {
    // Aplicar formato con separadores de miles para números enteros
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  //********************************************************** */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    //*********************Formatea price******************** */
    if ((name === "price" || name === "quantity") && value !== "") {
      // Eliminar cualquier coma existente antes de formatear el valor
      const formattedValue = formatIntegerWithCommas(value.replace(/,/g, ''));
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // if (name === "quantity" && value !== "") {
    //   // Eliminar cualquier coma existente antes de formatear el valor
    //   const formattedValue = formatIntegerWithCommas(value.replace(/,/g, ''));
    //   setFormData({
    //     ...formData,
    //     [name]: formattedValue,
    //   });
    // } else {
    //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   });
    // }
    // //******************************************************** */

    if (name === "nameEvent") {
      if (value.trim() === "") {
        setNameEventError("El campo Nombre del Evento no puede estar vacío");
      } else {
        setNameEventError("");
      }
    } else if (name === "description") {
      if (value.trim() === "") {
        setDescriptionError("El campo Descripción no puede estar vacío");
      } else {
        setDescriptionError("");
      }
    } else if (name === "location") {
      if (value.trim() === "") {
        setLocationError("El campo Ubicación no puede estar vacío");
      } else {
        setLocationError("");
      }
    } else if (name === "city") {
      if (value.trim() === "") {
        setCityError("El campo Ciudad no puede estar vacío");
      } else {
        setCityError("");
      }
    } else if (name === "date") {
      if (value.trim() === "") {
        setDateError("El campo Fecha no puede estar vacío");
      } else {
        setDateError("");
      }
    } else if (name === "openTime") {
      if (!isValidOpenTime(value)) {
        setOpenTimeError("El formato debe ser 00:00:00");
      } else {
        setOpenTimeError("");
      }
    } else if (name === "category") {
      if (value.trim() === "") {
        setCategoryError("El campo Categoría no puede estar vacío");
      } else {
        setCategoryError("");
      }
    } else if (name === "minimumAge") {
      if (value.trim() === "") {
        setMinimumAgeError("El campo Edad Mínima no puede estar vacío");
      } else {
        setMinimumAgeError("");
      }
    } else if (name === "address") {
      if (value.trim() === "") {
        setAddressError("El campo Dirección no puede estar vacío");
      } else {
        setAddressError("");
      }
    } else if (name === "price") {
      if (value.trim() === "") {
        setPriceError("El campo precio no puede estar vacío");
      } else {
        setPriceError("");
      }
    } else if (name === "quantity") {
      if (value.trim() === "") {
        setQuantityError("El campo cantidad no puede estar vacío");
      } else {
        setQuantityError("");
      }
    }
  };


  const handleImageChange = (e) => {
    const images = e.target.files;
    const resizedImages = [];

    if (images.length === 0) {
      setImagesError("Debe cargar al menos un archivo.");
      return;
    } else {
      setImagesError(""); // Reiniciar el mensaje de error
    }

    const specialCharacterRegex = /[^a-zA-Z0-9._-]/; // Expresión regular para caracteres especiales

    for (const image of images) {
      if (specialCharacterRegex.test(image.name)) {
        setImagesError("El nombre del archivo contiene caracteres especiales y no se puede mostrar.");
        return;
      }

      resizeImages([image]).then((resizedImage) => {
        resizedImages.push(...resizedImage);

        if (resizedImages.length === images.length * 3) {
          setFormData({ ...formData, images: resizedImages });
        }
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nameEvent) {
      setNameEventError("El campo Nombre del Evento no puede estar vacío");
      return;
    }
    if (!formData.description) {
      setDescriptionError("El campo Descripción no puede estar vacío");
      return;
    }
    if (!formData.location) {
      setLocationError("El campo localizacion no puede estar vacío");
      return;
    }
    if (!formData.city) {
      setCityError("El campo Ciudad no puede estar vacío");
      return;
    }
    if (!formData.date) {
      setDateError("El campo Fecha no puede estar vacío");
      return;
    }
    if (!formData.category) {
      setCategoryError("El campo Categoria no puede estar vacío");
      return;
    }
    if (!formData.minimumAge) {
      setMinimumAgeError("El campo Edad minima no puede estar vacío");
      return;
    }
    if (!formData.address) {
      setAddressError("El campo Dirección no puede estar vacío");
      return;
    }
    if (!formData.openTime) {
      setOpenTimeError("El campo hora de apertura no puede estar vacío");
      return;
    }
    if (!formData.price) {
      setPriceError("El campo precio no puede estar vacío");
      return;
    }
    if (!formData.quantity) {
      setQuantityError("El campo cantidad no puede estar vacío");
      return;
    }

    if (formData.images.length === 0) {
      setImagesError("Se debe cargar un archivo de imagen");
      return;
    }

    const validImages = formData.images.filter((image) => image.blob !== null);


    const updatedImages = validImages.map((image) => {
      return { url: bucket + image.filename };
    });

    const formDataToSend = {
      idCompany: userId,
      nameEvent: formData.nameEvent,
      description: formData.description,
      location: formData.location,
      city: formData.city,
      date: formData.date,
      category: formData.category,
      minimumAge: formData.minimumAge,
      address: formData.address,
      openTime: formData.openTime,
      price: parseInt(formData.price.replace(/,/g, ''), 10), // Convertir a entero antes de enviar a la API
      quantity: parseInt(formData.quantity.replace(/,/g, ''), 10),
      stock: parseInt(formData.quantity.replace(/,/g, ''), 10),
      images: updatedImages,
    };

    try {
      const response = await axios.post('/event/crear', formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            'Content-Type': 'application/json;charset=UTF-8',
          }
        }
      );

      console.log("Evento creado con éxito:", response.data);
      setFormMessage("Evento creado con éxito: ");
      setIsError(false);
      setFormData(initialFormData);

      // Restablecer el campo adicionar archivo
      fileInputRef.current.value = "";

      // Redimensionar y cargar imágenes en AWS S3
      await uploadImagesToS3(validImages);
    } catch (error) {
      console.error("Error al crear el evento:", error);
      setFormMessage("Error al crear el evento: ");
      setIsError(true);
    }
  };

  const resizeImages = async (images) => {

    const sizes = [
      { width: 1230, height: 447, name: 1230 },
      { width: 327, height: 218, name: 327 },
      { width: 600, height: 254, name: 600 },
    ];

    const resizedImages = [];

    for (const image of images) {
      const nombreArchivo = image.name;
      const ext = nombreArchivo.split('.').pop();
      const primeraParte = nombreArchivo.replace(`.${ext}`, '');

      for (const size of sizes) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = URL.createObjectURL(image);

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        canvas.width = size.width || (size.height * img.width) / img.height;
        canvas.height = size.height || (size.width * img.height) / img.width;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


        const resizedBlob = await new Promise((resolve) => {
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            `image/${ext}`, // Utiliza la extensión del archivo como formato
            { quality: 0.9 } // Ajusta la calidad según tus necesidades
          );
        });

        // Genera un nombre de archivo único para la imagen redimensionada
        const filename = `${primeraParte}_${size.name}.${ext}`;

        resizedImages.push({
          blob: resizedBlob,
          filename: filename,
        });
      }
    }

    return resizedImages;
  };


  const uploadImagesToS3 = async (images) => {
    const AWS = require("aws-sdk");
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });

    const s3 = new AWS.S3();

    for (const image of images) {
      const params = {
        Bucket: "master-events-img",
        Key: image.filename,
        Body: image.blob,
      };

      await s3.upload(params).promise();
    }
  };





  return (

    <div className="form-container">

      <div className="centrarForm">
        <p className={`message ${isError ? "error-message" : "messageok"}`}>{formMessage}</p>

        <h1>Adicionar Evento</h1>
        <form onSubmit={handleSubmit}>
          <div className="inpuEvent">
            <input
              type="text"
              name="nameEvent"
              value={formData.nameEvent}
              onChange={handleInputChange}
              placeholder="Nombre del evento"
            />
            {nameEventError && <p className="error-message">{nameEventError}</p>}
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Descripción"
            />
            {descriptionError && <p className="error-message">{descriptionError}</p>}
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Ubicación"
            />
            {locationError && <p className="error-message">{locationError}</p>}
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Ciudad"
            />
            {cityError && <p className="error-message">{cityError}</p>}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="Fecha"
            />
            {dateError && <p className="error-message">{dateError}</p>}
            <input
              type="text"
              name="openTime"
              value={formData.openTime}
              onChange={handleInputChange}
              placeholder="Hora de apertura 00:00:00"
            />
            {openTimeError && <p className="error-message">{openTimeError}</p>}
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Categoría"
            />
            {categoryError && <p className="error-message">{categoryError}</p>}
            <input
              type="number"
              name="minimumAge"
              value={formData.minimumAge}
              onChange={handleInputChange}
              placeholder="Edad mínima"
            />
            {minimumAgeError && <p className="error-message">{minimumAgeError}</p>}
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Dirección"
            />
            {addressError && <p className="error-message">{addressError}</p>}
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Cantidad entradas"
            />
            {quantityError && <p className="error-message">{quantityError}</p>}
            <input
              type="text"  // Cambiado de 'number' a 'text'
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Precio"
            />
            {priceError && <p className="error-message">{priceError}</p>}

            <input type="file" multiple name="images" onChange={handleImageChange} ref={fileInputRef} />
            {imagesError && <p className="error-message">{imagesError}</p>}
          </div>
            <button type="submit">Crear Evento</button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
