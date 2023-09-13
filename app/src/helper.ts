export const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
// Check if we are in ios webview, as the automatic redirect to app will not work
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isIOSWebView = (navigator as any).standalone || false;
export const swishLink = 'app.swish.nu/1/p/sw';
export const appPrefix = isIOS ? 'https://' : 'swish://';
export const PREFIX = `${appPrefix}${swishLink}`

export function buildUrl(number: string, amount: number, message: string, allowAmt: boolean, allowMsg: boolean) {
    let url = `${PREFIX}/`
    // number
    url += `?sw=${number}`
    // amount
    url += `&amt=${amount}`
    // message
    url += `&msg=${message}`
    // edits
    const edits = []
    if (allowAmt) edits.push('amt')
    if (allowMsg) edits.push('msg')
    if (edits.length > 0) url += `&edit=${edits.join(',')}`
    // swish stuff
    url += `&cur=SEK&src=qr`
    return url;
}

export function validate(number: string, amount: string, message: string) {
    if (number && number.length === 10 && (number.match(/07[0-9]{8}$/) || number.match(/123[0-9]{7}$/))) {
        if (!isNaN(Number(amount)) && Number(amount) > 1) {
          if (message.length <= 50) {
            return true;
          }
        }
    }
    return false;
}
