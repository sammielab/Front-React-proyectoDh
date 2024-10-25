import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; 
import { useParams } from "react-router-dom"; 
import { findProductById } from '../../api/findProduct';
import useAuth from "../../hooks/useAuth";
import NavBar from '../../Components/Navegacion/NavBar';
import { Footer } from '../../Components/Navegacion/Footer';


export const ProductGallery = () => {
  const { id } = useParams();
  const [productFound, setProductFound] = useState();
  const { auth } = useAuth(); 
  const token = auth?.token;

  const getProducto = async () => {
    try {
      const data = await findProductById(id, token);
      setProductFound(data); 
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getProducto();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true, // Hace que el slider se ajuste a la altura de la imagen
  };

  return (
    <>
    <NavBar></NavBar>
      {productFound && productFound.imgdtos && productFound.imgdtos.length > 0 ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Card sx={{ maxWidth: 800, width: '100%' }}>
            <Typography variant="h6" sx={{ padding: 2 }}>
              Imágenes de {productFound.titulo}
            </Typography>
            <Slider {...settings}>
              {productFound.imgdtos.map((img, index) => (
                <div key={index}>
                  <CardMedia
                    component="img"
                    src={`data:image/jpeg;base64,${img.imagen}`} // Asegúrate de acceder a la propiedad correcta
                    alt={`Imagen ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
            </Slider>
          </Card>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography variant="h6">No hay imágenes disponibles</Typography>
        </Box>
      )}
      <Footer></Footer>
    </>
  );
};
