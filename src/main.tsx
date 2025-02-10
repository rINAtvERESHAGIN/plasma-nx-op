import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { themeMui } from './app/theme';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ruRU } from '@mui/x-date-pickers/locales';
import ApplicationStatus from './shared/ui/application status/ui';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { store } from '@org/store-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns} localeText={ruRU}>
    <ThemeProvider theme={themeMui}>
      <Provider store={store}>
        <ApplicationStatus />
        {/* <App /> */}
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </LocalizationProvider>
);
