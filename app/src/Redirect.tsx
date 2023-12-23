import styles from './Redirect.module.scss';
import { AMOUNT, MESSAGE, NUMBER, RANDOM } from './helper';

function Redirect() {
  return (
    <>
      <div className={styles.card}>
        <span className={styles.number}>{NUMBER}</span>
        <span className={styles.amount}> &#x2022; {AMOUNT} SEK</span>
        <span className={styles.message}>
          { RANDOM ? <i>Meddelandet är en överraskning</i> :  MESSAGE ? `"${MESSAGE}"` : <i>Inget meddelande inkluderat</i> }
        </span>
        <span className={styles.warning}>OSB! Kontrollera <u>alltid</u> att informationen i Swish-appen och BankId är korrekt!</span>
        <a className={styles.swishBtn} href={''}>Fortsätt till Swish</a>
      </div>
    </>
  )
}

export default Redirect;