export const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
// Check if we are in ios webview, as the automatic redirect to app will not work
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isIOSWebView = isIOS ? detectIosWebView() : false;
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
        if (!isNaN(Number(amount)) && Number(amount) >= 1) {
          if (message.length <= 50) {
            return true;
          }
        }
    }
    return false;
}






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