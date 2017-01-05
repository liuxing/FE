// js面向对象传统写法


/*
function Point(x, y) {
    this.x = x
    this.y =y
}

Point.prototype.toString = function () {
    return `(${this.x}, ${this.y})`
}

let P = new Point(1, 2)
*/

// console.log(P.toString())

// es6 引入class

class Point{
    constructor(x, y){
        this.x = x
        this.y =y
    }

    toString(){
        return `(${this.x}, ${this.y})`
    }
}

let P = new Point(1, 2)

console.log(P.toString())
