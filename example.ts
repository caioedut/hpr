import { Collection } from './draft/Collection.ts';
import * as Str from './src/helpers/Str';

function dump(value: any) {
  console.log(`'${typeof value}'`, value);
}

console.log('\n---[ Str');

dump(Str.from('oi'));
dump(Str.from(1));
dump(Str.from(null));
dump(Str.from(undefined));
dump(Str.from([1, 2, 3]));
dump(Str.from({ x: [1, 2, 3] }));

console.log('\n---[ Collection');

// Coletando itens em uma Collection
const numbers = Collection.from([1, 2, 3, 4, 5]);

// Exemplo de map
const doubled = numbers.map((x) => x * 2);
console.log(doubled.all()); // [2, 4, 6, 8, 10]

// Exemplo de filter
const greaterThanThree = numbers.filter((x) => x > 3);
console.log(greaterThanThree.all()); // [4, 5]

// Exemplo de reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// Verifica se a coleção contém um valor
const hasTwo = numbers.contains(2);
console.log(hasTwo); // true
