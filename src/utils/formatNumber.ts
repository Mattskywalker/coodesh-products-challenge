import numeral from 'numeral';

try {
  numeral.register('locale', 'pt-br', {
    delimiters: {
      thousands: '.',
      decimal: ','
    },
    abbreviations: {
      thousand: 'mil',
      million: 'milhões',
      billion: 'b',
      trillion: 't'
    },
    ordinal: function (number) {
      return 'º';
    },
    currency: {
      symbol: 'R$'
    }
  });
} catch (e) {

}

try {
  numeral.locale('pt-br');
} catch (e) {
}

export function fcurrency(value?: number, symbol: string = '') {
  if(!value) return symbol +'0,00'
  return symbol + numeral(value).format('0,0.00')
}

export function fCurrencyToNumber(value: string) {
  return parseInt(value.replace(/\D+/g, ''));
}