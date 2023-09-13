import './App.css'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ShareIcon from '@mui/icons-material/Share';
import { validate } from './helper';
import { useState } from 'react';
import QRCode from 'qrcode'

const SwishMeInput = styled(TextField)({
  '&': {
    width: '100%',
    margin: '0.3em 0'
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& label': {
    color: 'white',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
      transition: 'border-width 0.4s ease-in-out',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
      borderWidth: 2,
    },
  },
});

const SwishMeCheckbox = styled(Checkbox)({
  '&': {
    color: 'white',
  },
  '&.Mui-checked': {
    color: 'white',
  }
})

const SwishMeButton = styled(Button)({
  '&': {
    width: '40%',
    background: 'linear-gradient(135deg, rgb(2, 145, 210) 0%, 31.6138%, rgb(23, 99, 191) 63.2275%, 81.6138%, rgb(11, 43, 161) 100%)',
    border: 'none!important',
  },
})



function Create() {

  const [randomEnabled, setRandomEnabled] = useState(false);

  return (
    <>
      {randomEnabled}
      <SwishMeInput id='number' label="Nummer" inputProps={{ inputMode: 'numeric', placeholder: '0760123456', maxLength: 10 }} defaultValue={localStorage.getItem('number') || ''} />
      <SwishMeInput id='amt' label="Belopp" inputProps={{ inputMode: 'numeric', placeholder: '69.420' }} />
      <FormControlLabel control={<SwishMeCheckbox id='editAmt' />} label="Tillåt redigering" />
      <SwishMeInput id='msg' label="Meddelande" disabled={randomEnabled} inputProps={{ placeholder: 'Tack för avsugningen', maxLength: 50 }} />
      <FormControlLabel control={<SwishMeCheckbox id='randomMsg' onChange={(v) => setRandomEnabled(v.target.checked)} />} label="Random meddelande" />
      <FormControlLabel control={<SwishMeCheckbox id='editMsg' />} label="Tillåt redigering" />

      <canvas id='test' height={200} width={200}></canvas>

      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <SwishMeButton
          variant="contained"
          startIcon={<QrCode2Icon />}
          onClick={() => {
            const canvas = document.getElementById('test') as HTMLCanvasElement | undefined;
            if (!canvas) return;
            const number = (document.getElementById('number') as HTMLInputElement).value;
            const amt = (document.getElementById('amt') as HTMLInputElement).value;
            const msg = (document.getElementById('msg') as HTMLInputElement).value;

            if (validate(number, amt, msg)) {
              const editAmt = (document.getElementById('editAmt') as HTMLInputElement).checked;
              const editMsg = (document.getElementById('editMsg') as HTMLInputElement).checked;
              const edit = [];
              if (editAmt) edit.push('a');
              if (editMsg) edit.push('m');

              localStorage.setItem('number', number);

              QRCode.toCanvas(canvas, `${location.origin}/?n=${number}&a=${amt}${randomEnabled ? '&r=1' : msg ? `&m=${msg}` : ''}${edit.length > 0 ? `&e=${edit.join()}` : ''}`)
            }
          }}
        >
          Qr kod
        </SwishMeButton>
        { /* *Can be undefined, eg firefox windows */}
        {(navigator?.share as (ShareData | undefined)) && <SwishMeButton
          variant="contained"
          startIcon={<ShareIcon />}
          onClick={() => {
            const number = (document.getElementById('number') as HTMLInputElement).value;
            const amt = (document.getElementById('amt') as HTMLInputElement).value;
            const msg = (document.getElementById('msg') as HTMLInputElement).value;

            if (validate(number, amt, msg)) {
              const editAmt = (document.getElementById('editAmt') as HTMLInputElement).checked;
              const editMsg = (document.getElementById('editMsg') as HTMLInputElement).checked;
              const edit = [];
              if (editAmt) edit.push('a');
              if (editMsg) edit.push('m');

              localStorage.setItem('number', number);

              navigator.share({
                url: `${location.origin}/?n=${number}&a=${amt}${randomEnabled ? '&r=1' : msg ? `&m=${msg}` : ''}${edit.length > 0 ? `&e=${edit.join()}` : ''}`,
              })
            }

          }}
        >
          Dela
        </SwishMeButton>}
      </div>
    </>
  )
}

export default Create
