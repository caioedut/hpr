import * as Arr from './src/helpers/Arr';
import { Collection } from './src/helpers/Collection';
import * as Str from './src/helpers/Str';

function dump(value: any) {
  console.log(`'${typeof value}'`, value);
}

console.log('\n---[ Str\n');

dump(Str.from('oi'));
dump(Str.from(1));
dump(Str.from(null));
dump(Str.from(undefined));
dump(Str.from([1, 2, 3]));
dump(Str.from({ x: [1, 2, 3] }));

console.log('\n---[ Arr\n');

const arr = Arr.from([1, 2, 3]);
console.log('arr === from(arr)', arr === Arr.from(arr));
console.log('arr !== clone(arr)', arr !== Arr.clone(arr));

console.log('\n---[ Collection\n');

const items = Collection.from([
  { id: 1, name: 'First Item', status: 'completed' },
  { id: 2, name: 'Second Item', status: 'pending' },
  { id: 3, name: 'Third Item', status: 'running' },
  { id: 4, name: 'Fourth Item', status: 'completed' },
]);

const counts = items.countBy('status');
console.log('counts', counts);

const groups = items.groupBy('status');
console.log('groups', groups);

const first = items.first();
console.log('first', first);
