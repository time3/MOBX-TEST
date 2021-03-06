import {observable, isArrayLike, computed, autorun, when, reaction } from 'mobx';

class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();

    @observable string = 'hello';
    @observable number = 20;
    @observable bool = false;
    @computed get mixed(){
        return store.string + '/' + store.number;
    }
}

//computed 1.对可观察数据做出的反应 2.从使用computed值的角度只是对值的使用
//从函数方面使用
var store = new Store();
/*
const foo = computed(function(){ return store.string + '/' + store.number });
console.log(foo.get())// hello/20
foo.observe(function(change){
    console.log(change); //保存修改前后的值
})
store.string = 'world'
store.number = 10;
*/

//autorun 自动运行传入autorun的函数参数
//修改autorun中任意可观察的数据会触发autorun
//意义：在可观察数据修改之后，自动执行可观察数据的行为，这个行为一般是指传入autorun的函数
/*
autorun(() => {
    console.log(store.mixed) // hello/20
    //computed的值是可以当做一种新的可观察的数据值看待的
    //computed的值可以引用其他computed的值但不能循环使用
});
store.string = 'world'
store.number = 10;
*/

//when 使用场景：只有条件A成立才去执行函数B
//1.第一个参数必须根据可观察数据计算布尔值
//2.第一个参数一开始就返回true,第二个参数立即执行

when(() => store.bool, () => console.log("it's true"));
store.bool = true;

