import './App.css'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ShareIcon from '@mui/icons-material/Share';

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

  return (
    <>
      <SwishMeInput id='number' label="Nummer" inputProps={{ inputMode: 'numeric', placeholder: '0760123456', maxLength: 10 }} />
      <SwishMeInput id='amt' label="Belopp" inputProps={{ inputMode: 'numeric', placeholder: '69.420' }} />
      <FormControlLabel control={<SwishMeCheckbox id='editAmt' />} label="Tillåt redigering" />
      <SwishMeInput id='msg' label="Meddelande" inputProps={{ placeholder: 'Tack för avsugningen', maxLength: 50 }} />
      <FormControlLabel control={<SwishMeCheckbox id='randomMsg' />} label="Random meddelande" />
      <FormControlLabel control={<SwishMeCheckbox id='editMsg' />} label="Tillåt redigering" />

      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <SwishMeButton
          variant="contained"
          startIcon={<QrCode2Icon />}
        >
          Qr kod
        </SwishMeButton>
        { /* *Can be undefined, eg firefox windows */ }
        {(navigator?.share as (ShareData | undefined)) && <SwishMeButton
          variant="contained"
          startIcon={<ShareIcon />}
          onClick={() => {
            const number = (document.getElementById('number') as HTMLInputElement).value;
            const amt = (document.getElementById('amt') as HTMLInputElement).value;
            const msg = (document.getElementById('msg') as HTMLInputElement).value;
            const editAmt = (document.getElementById('editAmt') as HTMLInputElement).checked;
            // const randomMsg = (document.getElementById('randomMsg') as HTMLInputElement).checked;
            const editMsg = (document.getElementById('editMsg') as HTMLInputElement).checked;
            // let edit = [];
            // if (editAmt) edit.push('a');
            // if (editMsg) edit.push('m');
            
            navigator.share({
              url: `${location.origin}/?n=${number}&a=${amt}&m=${msg}&e=${editAmt ? 'a' : ''}${editMsg ? 'm' : ''}`,
            })
          }}
        >
          Dela
        </SwishMeButton>}
      </div>
    </>
  )
}

export default Create
