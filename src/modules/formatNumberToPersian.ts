const dictionary = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹'
}

const numers = ['1','2','3','4','5','6','7','8','9','0'];

export const persianMonths = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند'
];

function formatNumberToPersian(text: string) {
    for(var i = 0;i < text.length;i++) {
        if (numers.includes(text[i])) {
            text = text.substring(0, i) + dictionary[text[i]] + text.substring(i + 1);
        }
    }
    return text;
}

export default formatNumberToPersian;