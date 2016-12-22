
let和const
=====
[TOC]

## 1.let

### 基本用法
>ES6新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。

```javascript
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```
*`for`循环的计数器，就很合适使用`let`命令*
```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
// var 全局范围都有效，每次循环会覆盖旧值

for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
// let 只在本轮循环有效 所以每一次循环的i其实都是一个新的变量
```

### 不存在变量提示

>`let`不像`var`那样会发生“变量提升”现象。所以，变量一定要在声明后使用
```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

### 暂时性锁区
>只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
>ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。“暂时性死区”（temporal dead zone，简称 TDZ）
```javascript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```
“暂时性死区”也意味着`typeof`不再是一个百分之百安全的操作
```javscript
typeof x; // ReferenceError
let x;


typeof undeclared_variable // "undefined"
```

 **变量一定要在声明之后使用**
暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

### 不允许重复声明
> let不允许在相同作用域内，重复声明同一个变量

## 2.块级作用域

### ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景
- 内层变量可能会覆盖外层变量
- 用来计数的循环变量泄露为全局变量

### let实际上为JavaScript新增了块级作用域

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```
*块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了*
```javascript
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```
### 块级作用域与函数声明
> ES5规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明
> ES6 引入了块级作用域，明确允许在块级作用域之中声明函数ES6 规定，块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。ES6的块级作用域允许声明函数的规则，只在使用大括号的情况下成立

浏览器的实现可以不遵守上面的规定，有自己的行为方式。
- 允许在块级作用域内声明函数。
- 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。
  *考虑到环境导致的行为差异太大，应该**避免在块级作用域内声明函数**。如果确实需要，也应该写成函数表达式，而不是函数声明语句。*
### do 表达式
**本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值**
现在有一个提案，使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上do，使它变为do表达式(提案)。
```javscript
{
  let t = f();
  t = t * t + 1;
}

let x = do {
  let t = f();
  t * t + 1;
};
```

## 3.const
> `const`声明一个只读的常量。一旦声明，常量的值就不能改变。`const`声明的变量不得改变值，这意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值
- `const`的作用域与let命令相同：只在声明所在的块级作用域内有效。
- `const`命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
- `const`声明的常量，也与let一样不可重复声明。
- 对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。`const`命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。*如果真的想将对象冻结，应该使用Object.freeze方法*

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数
``` javascript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

## 4.顶层对象的属性
> 顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。ES5之中，顶层对象的属性与全局变量是等价的。 从ES6开始，全局变量将逐步与顶层对象的属性脱钩。

```javascript
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```

- [ECMAScript 6 入门 --阮一峰](http://es6.ruanyifeng.com/)




