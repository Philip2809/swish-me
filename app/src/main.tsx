import ReactDOM from 'react-dom/client'
import Create from './Create.tsx'
import './index.css'
import { AMOUNT, MESSAGE, NUMBER, validate } from './helper.ts';
import Redirect from './Redirect.tsx';
import { SnackbarProvider } from 'notistack';

let swishing = false;
if (validate(NUMBER, AMOUNT, MESSAGE) === true) swishing = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  swishing ? <Redirect /> : <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} maxSnack={2} ><Create /></SnackbarProvider>
)
