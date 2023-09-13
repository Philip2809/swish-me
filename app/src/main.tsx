import ReactDOM from 'react-dom/client'
import Create from './Create.tsx'
import './index.css'
import { buildUrl, isIOSWebView, validate } from './helper.ts';
import Redirect from './Redirect.tsx';


const randomMsgs = [
  "Tack för avsugningen!",
  "Det var roligt igår ;)"
]

let swishUrl = '';

const url = new URL(location.href);
const number = url.searchParams.get("n") || '';
const amt = url.searchParams.get("a") || '';
let msg = url.searchParams.get("m") || '';
const edit = url.searchParams.get("e") || '';
const random = (url.searchParams.get("r") || '') === '1';

if (validate(number, amt, msg)) {
  if (random) msg = encodeURIComponent(randomMsgs[Math.floor(Math.random() * randomMsgs.length)]);
  swishUrl = buildUrl(number, Number(amt), msg, edit.includes("a"), edit.includes("m"));
  if (!isIOSWebView) location.href = swishUrl; 
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  swishUrl ? <Redirect url={swishUrl} /> : <Create />
)
