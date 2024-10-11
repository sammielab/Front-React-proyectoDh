import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

function App({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {children}
    </LocalizationProvider>
  );
}