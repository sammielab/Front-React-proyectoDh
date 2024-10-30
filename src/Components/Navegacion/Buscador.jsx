import React,  { useState,useEffect } from 'react'
import { Box, TextField, Checkbox, FormControlLabel, FormGroup, Button, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {  Autocomplete } from '@mui/material';
import { LocalizationProvider,  DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import useAuth from '../../hooks/useAuth';
import { getCategorias } from '../../api/getCategorias';
import {fetchCityPattern} from "../../api/findCityByPattern";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export const Buscador = () => {
  const [location, setLocation] = useState('');
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([
  ]);
  const {auth} = useAuth();
  const token = auth?.token; 

  const [categorias, setCategorias] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const navigate = useNavigate();

  const handleLocationChange = (event, newValue) => {
    setLocation(newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };



   
    useEffect(() => {
     
      if (location.length > 0) {
        const fetchSuggestions = async () => {
          const response = await fetchCityPattern(token, location);
          console.log(response)
          setSuggestions(response);
        };
  
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, [location]);




    useEffect(() => {
      const fetchCategorias = async () => {
        try {
          const response = await getCategorias(token);
          console.log(response)
          setCategorias(response);
        } catch (error) {
          console.error('Error al obtener las categorías:', error);
        }
      };
    
      fetchCategorias();
    }, []);


    //Function que recibe un event y modifica el valor de la categoria seleccionada 
    const handleCheckboxChange = (event) => {
      const { value, checked } = event.target;
      setSelectedCategorias((prevSelected) =>
        checked ? [...prevSelected, value] : prevSelected.filter((id) => id !== value)
      );
    };

    const handleBuscar = () => {
      
      if(selectedCategorias.length > 0 ){
        navigate('/products/results', { state: { categorias: selectedCategorias } });
      }else if(location && selectedDate && checkoutDate){
        const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
      const formattedCheckoutDate = moment(checkoutDate).format('YYYY-MM-DD');
        navigate('/search/results', { state: { location, selectedDate: formattedSelectedDate, checkoutDate: formattedCheckoutDate } });
      }else{
        // navigate('/productos')
      };
    };

  return (
    <Box sx={{
      display: 'flex', 
      width: {xs: '100%', s:'90%', xl: '100%', l:'100%'}, 
      justifyContent:'center'
    }}>
  <Box
        sx={{
          backgroundColor: '#D9CBBF',
          padding: '16px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          width: { sm: '100%', xs: '100%', lg: '100%' },
          marginTop: '2rem',
          maxWidth: '80%',
          mx: 'auto',
        }}
      >
        <Typography variant="h6" color="#222D52" align="center">
          Busca ofertas en hoteles, casas y mucho más
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Autocomplete
        freeSolo
            options={suggestions}
            getOptionLabel={(option) => option || ""}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            value={location}
            onChange={handleLocationChange}
            renderInput={(params) => (
        <TextField
          {...params}
          placeholder="¿A dónde vamos?"
          variant="outlined"
          fullWidth
          onChange={(e) => setLocation(e.target.value)}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            flex: 1,
            flexBasis: '70%',
            minWidth: '300px', 
            width: {sm: '100%', s: '100%', l: '30%'}
          }}
        />
      )}
    />
  <Box sx={{ display: 'flex', gap: 1, flex: 1, flexBasis: '30%', width: {sm: '100%', s: '100%', l: '30%'}, justifyContent: 'space-around' }}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label="CheckIn"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Fecha de checkin"
            variant="outlined"
            fullWidth
            sx={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              flex: 1, 
              minWidth: { xs: '150px', sm: '200px' }, 
              fontSize: '0.875rem' 
            }}
          />
        )}
      />
      <DatePicker
        label="Checkout"
        value={checkoutDate}
        onChange={(newValue) => setCheckoutDate(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Fecha de checkout"
            variant="outlined"
            fullWidth
            sx={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              flex: 1, 
              minWidth: { xs: '150px', sm: '200px' }, 
              fontSize: '0.875rem' 
            }}
          />
        )}
      />
    </LocalizationProvider>

{categorias && categorias.length > 0 && (
  <FormGroup row>
  {categorias.map((categoria) => (
    <Typography variant="h6" key={categoria.id}> {categoria.titulo} </Typography>,
    <FormControlLabel
      key={categoria.id}
      
      control={
        <Checkbox
          value={categoria.id}
          onChange={handleCheckboxChange}
        />
      }
      label={categoria.titulo}
    />
  ))}
</FormGroup>
)}

  </Box>
      </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: '8px',
            alignSelf: 'center',
            width: { xs: '100%', sm: '200px' },
            backgroundColor: '#222D52', 
            fontColor: '#D9CBBF'
          }}
          onClick={(e) => handleBuscar(e)}
        >
          Buscar
        </Button>
      </Box>
</Box>
  );
};
