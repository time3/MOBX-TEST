class Animal{
    name(){
        return 'Animal';
    }
    say(){
        return `I'm ${this.name()}`;
    }
}

class Dog extends Animal{
    food = 'none';
    
    name (){
        return 'Dog';
    }
}

console.log(new Dog() instanceof Animal);