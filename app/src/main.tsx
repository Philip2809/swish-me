import ReactDOM from 'react-dom/client'
import Create from './Create.tsx'
import './index.css'
import { buildUrl, isIOS, isSnapchat } from './helper.ts';
import Redirect from './Redirect.tsx';

let swishUrl = '';

const url = new URL(location.href);
const number = url.searchParams.get("n");
const amt = url.searchParams.get("a");
const msg = url.searchParams.get("m") || '';
const edit = url.searchParams.get("e");

// validate url
if (number && number.length === 10 && (number.match(/07[0-9]{8}$/) || number.match(/123[0-9]{7}$/))) {
  if (!isNaN(Number(amt)) && Number(amt) > 1) {
    if (msg.length <= 50) {
      // automatically redirect to swish
      swishUrl = buildUrl(number, Number(amt), msg, edit?.includes("a") || false, edit?.includes("m") || false);
      if (!isIOS || !isSnapchat) location.href = swishUrl; 
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  swishUrl ? <Redirect url={swishUrl} /> : <Create />
)
