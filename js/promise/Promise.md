[TOC]
# Promise

## 概述
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果
## 语法
```javascript
new Promise(executor);
new Promise(function(resolve, reject) { ... });
```
##Promise对象有以下几种状态:

- pending: 初始状态, 既不是 fulfilled 也不是 rejected.
- fulfilled: 成功的操作.
- rejected: 失败的操作

## 方法
- Promise.all
- Promise.arce
- promise.reject
- promise.resolve

## Promise原型
- Promise.prototype.catch(onRejected)
- Promise.prototype.then(onFulfilled, onRejected)

链接
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [简书](http://www.jianshu.com/p/87183851756f)
- [阮一峰](http://es6.ruanyifeng.com/#docs/promise)
-[谈谈 ES6 的 Promise 对象](https://segmentfault.com/a/1190000002928371)
-[JavaScript Promise迷你书（中文版）](https://segmentfault.com/a/1190000002928371)