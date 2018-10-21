function log(target){
    const desc = Object.getOwnPropertyDescriptors(target.prototype);

    for(const key of Object.keys(desc)){
        if(key === 'constructor'){
            continue;
        }
    
        const func = desc[key].value;

        if('function' === typeof func){
            Object.defineProperty(target.prototype, key, {
                value(...args){
                    console.log('before ' + key);
                    const ret = func.apply(this, args);
                    console.log('after ' + key);
                    return ret;
                }
            })
        }
    }
}
/**
 * 类属性的修饰器
 * target l类的实例对象
 * key  类成员的名称
 * descriptor 类成员的描述符
 */
function readonly(target, key, descriptor){
    descriptor.writable = false;
}

/**
 * 类方法的修饰器
 *  */
function validate(target, key, descriptor){
    const func = descriptor.value;
    descriptor.value = function(...args){
        for(let num of args){
            if('number' !== typeof num){
                throw new Error(`"${num}" is not a number`);
            }
        }

        return func.apply(this, args);
    }
}

@log //特殊的函数
class Numberic{
    @readonly PI = 3.1415926;

    @validate

    add(...nums){
        return nums.reduce((p, n) => (p+n), 0)
    }
}
new Numberic().add(1, 'x');