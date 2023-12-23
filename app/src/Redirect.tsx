import styles from './Redirect.module.scss';
import { ALLOW_EDIT_AMOUNT, ALLOW_EDIT_MESSAGE, AMOUNT, MESSAGE, NUMBER, RANDOM, buildUrl } from './helper';

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
        <a className={styles.swishBtn} href={buildUrl(NUMBER, Number(AMOUNT), MESSAGE, ALLOW_EDIT_AMOUNT, ALLOW_EDIT_MESSAGE)}>Fortsätt till Swish</a>
      </div>
    </>
  )
}

export default Redirect;