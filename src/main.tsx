import { createRoot } from 'react-dom/client';
import './global.css';
import App from '@/App';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
  >
    <App />
  </SnackbarProvider>
);
