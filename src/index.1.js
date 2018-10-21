// console.log('time')
//原始继承
function Animal(){}
function Dog(){};

Object.defineProperties(Animal.prototype, {
    name: {
        value(){
            return 'Animal';
        }
    },
    say: {
        value(){
            return `I'm ${this.name()}`;
        }
    }
})
//Dog.instanceof Animal => true

//Dog.__proto__.__proto__... = Animal.prototype

//Dog.__proto__ === Dog.prototype

//Dog.prototype.__proto__ === Animal.prototype

Dog.prototype = Object.create(Animal.prototype, {
    constructor: {
        value: Dog,
        enumerable: false //constructor是不可枚举的
    },
    say: {
        value(){
            return `I'm Dog`
        }
    }
});

// document.write(new Dog() instanceof Animal);
document.write(new Dog().say());
console.log(Dog.prototype.constructor)