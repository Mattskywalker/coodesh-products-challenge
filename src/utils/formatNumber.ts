export function fcurrency(value: number) {

  return value.toFixed(2).replace('.', ',');
}