export const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
// Check if we are in ios webview, as the automatic redirect to app will not work
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isIOSWebView = isIOS ? detectIosWebView() : false;
export const swishLink = 'app.swish.nu/1/p/sw';
export const appPrefix = 'https://';
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

enum InputErrors {
    NUMBER = 'Numret måste vara 10 siffror och börja på 07 eller 123',
    AMOUNT_MIN = 'Beloppet måste vara minst 1 SEK',
    AMOUNT_MAX = 'Beloppet får vara max 150 000 SEK',
    MESSAGE = 'Meddelandet får vara max 50 tecken',
}

export function validate(number: string, amount: string, message: string) {
    if (number && number.length === 10 && (number.match(/07[0-9]{8}$/) || number.match(/123[0-9]{7}$/))) {
        if (!isNaN(Number(amount)) && Number(amount) >= 1) {
            if (Number(amount) <= 150000) {
                if (message.length <= 50) {
                    return true;
                }
                return InputErrors.MESSAGE;
            }
            return InputErrors.AMOUNT_MAX;
        }
        return InputErrors.AMOUNT_MIN;
    }
    return InputErrors.NUMBER;
}

const randomMsgs = [
    "Tack för avsugningen!",
    "Det var roligt igår ;)",
    "Tack för hjälpen!",
    "Till tvätten",
]

const url = new URL(location.href);
export const NUMBER = url.searchParams.get("n") || '';
export const AMOUNT = url.searchParams.get("a") || '';
export let MESSAGE = url.searchParams.get("m") || '';
export const RANDOM = (url.searchParams.get("r") || '') === '1';
if (RANDOM) MESSAGE = randomMsgs[Math.floor(Math.random() * randomMsgs.length)];
const edit = url.searchParams.get("e") || '';
export const ALLOW_EDIT_AMOUNT = edit.includes("a");
export const ALLOW_EDIT_MESSAGE = edit.includes("m");





function detectIosWebView() {
    // Method #1
    // See: https://developer.apple.com/documentation/webkit/wkscriptmessagehandler
    // window.webkit.messageHandlers is defined in WKWebView with WKScriptMessageHandler
    // 1) if window.webkit.messageHandlers is present then it is 100% WKWebView
    // 2) if window.webkit.messageHandlers is not present then it could be:
    //    2.1) WKWebView without WKScriptMessageHandler
    //    2.2) not a WKWebView
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if((window as any)?.webkit?.messageHandlers) return true;
    // Method #2
    // This code relies on CSS styles
    /* 
        html {
            height: 100vh;
        }

        body {
            height: 100%;
            position: fixed;
        }
    */
    const webViewMode = window.document?.documentElement?.clientHeight === window.document?.documentElement?.scrollHeight;
    return webViewMode
}