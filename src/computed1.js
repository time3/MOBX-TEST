import {observable, isArrayLike, computed } from 'mobx';

class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();

    @observable string = 'hello';
    @observable number = 20;
    @observable bool = false;
}

//computed 1.对可观察数据做出的反应 2.从使用computed值的角度只是对值的使用
//从函数方面使用
var store = new Store();

const foo = computed(function(){ return store.string + '/' + store.number });
console.log(foo.get())// hello/20
foo.observe(function(change){
    console.log(change); //保存修改前后的值
})
store.string = 'world'
store.number = 10;

