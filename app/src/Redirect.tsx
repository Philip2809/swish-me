import './App.css'

interface Props {
  url: string
}

function Redirect({ url }: Props) {

  return (
    <>
      <a className='redirBtn' href={url}>Fortsätt till swish</a>
    </>
  )
}

export default Redirect
