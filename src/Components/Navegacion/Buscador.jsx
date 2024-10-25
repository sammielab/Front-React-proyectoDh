import React,  { useState,useEffect } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {  Autocomplete } from '@mui/material';
import { LocalizationProvider,  DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import useAuth from '../../hooks/useAuth';
import {fetchCityPattern} from "../../api/findCityByPattern";

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
          marginTop: '2rem', // Esto lo separa del navbar
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
        >
          Buscar
        </Button>
      </Box>
</Box>
  );
};


