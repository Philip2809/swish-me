export const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
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