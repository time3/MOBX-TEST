import {observable, isArrayLike} from 'mobx';
//observable.box
//

//array.object.map
//
//mobx将变量转变为可观察的对象
//1.对于数组、纯对象、ES6中的map直接把observale当场函数把变量转变为可观察的对象,duix中的数据都将被监视
//array object map

//array
/*
const arr = observable(['a', 'b', 'c']);
console.log(arr, Array.isArray(arr), isArrayLike(arr));
console.log(arr[0], arr[1]);
console.log(arr.pop(), arr.push('d'));
*/

//object  只能监视已有属性 新添加的只能用 extendObservable()
/*
const obj = observable({a:1, b:2});
console.log(obj.a, obj.b)
*/

//map
/*
const map = observable(new Map());
map.set('a', 1); //true
console.log(map.has('a'));
map.delete('a');
console.log(map.has('a'));//false
*/

//2.对于数组、春对象、map以外的都将用observable.box将变量包装成可观察的对象
//number String Bloon
/*
const num = observable.box(20);
const str = observable.box('hello');
const bool = observable.box(true);

//get方法会调用原始的类型值
console.log(num.get(), str.get(), bool.get());
//set方法会设置原始的类型值
num.set(10);
str.set('world');
bool.set(false)
console.log(num.get(), str.get(), bool.get());
*/

class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();

    @observable string = 'hello';
    @observable number = 20;
    @observable bool = false;
}
