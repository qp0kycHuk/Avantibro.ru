const phoneCode = '375'
const phoneCodeRegexp = /(3)?(7)?(5)?/
const phoneRegexp = /(375)?(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/
const phoneCompleteRegexp = /(7|8)\d{10}$/

export function getUnmaskedValue(value) {
    return value.replace(/\D/g, '')
}

export function getMaskedValue(value) {
    const numberValue = getUnmaskedValue(value)

    if (!numberValue) return ''

    const matchValue = numberValue.match(phoneRegexp);
    const matchCode = numberValue.match(phoneCodeRegexp);
    console.log(matchCode);

    if (!matchValue) return ''

    let code = ''

    for (let i = 1; i < matchCode.length; i++) {
        if (matchCode[i]) {
            code += matchCode[i]
        }
    }

    if (!phoneCode.startsWith(code)) {
        code = phoneCode
    }

    console.log(code);

    const a = matchValue[2];
    const b = matchValue[3];
    const c = matchValue[4];
    const d = matchValue[5];
    // +375 - aa - bbb - cc - dd
    const maskedValue = `+375 ${a ? `${a}` : ''}${b ? ` ${b}` : ''}${c ? ` - ${c}` : ''}${d ? ` - ${d}` : ''}`;

    // return maskedValue
    return maskedValue
}

export function isComplete(value) {
    const numberValue = value.replace(/\D/g, '')
    return phoneCompleteRegexp.test(numberValue)
}


export default {
    getUnmaskedValue,
    getMaskedValue,
    isComplete,
}