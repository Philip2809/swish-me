import './App.css'
// import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
// import QrCode2Icon from '@mui/icons-material/QrCode2';
// import ShareIcon from '@mui/icons-material/Share';

// const SwishMeInput = styled(TextField)({
//   '&': {
//     width: '100%',
//     margin: '0.3em 0'
//   },
//   '& label.Mui-focused': {
//     color: 'white',
//   },
//   '& label': {
//     color: 'white',
//   },
//   '& .MuiInputBase-input': {
//     color: 'white',
//   },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: 'white',
//       transition: 'border-width 0.4s ease-in-out',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: 'white',
//       borderWidth: 2,
//     },
//   },
// });

// const SwishMeCheckbox = styled(Checkbox)({
//   '&': {
//     color: 'white',
//   },
//   '&.Mui-checked': {
//     color: 'white',
//   }
// })

const SwishMeButton = styled(Button)({
  '&': {
    width: '100%',
    padding: '2em',
    background: 'linear-gradient(135deg, rgb(2, 145, 210) 0%, 31.6138%, rgb(23, 99, 191) 63.2275%, 81.6138%, rgb(11, 43, 161) 100%)',
    border: 'none!important',
  },
})

interface Props {
  url: string
}

function Redirect({ url }: Props) {

  return (
    <>
      <SwishMeButton variant="contained" onClick={() => window.open(url, "_blank")}>Fortsätt till swish</SwishMeButton>
    </>
  )
}

export default Redirect
