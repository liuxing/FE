# 迭代器与for-of循环

## 遍历数组的各种方法
1. 传统for-in
2. es5 forEach
3. for-in   **千万不要用来遍历数组**
4. es6 for-of

## 各种迭代器与其不足

- for-in不够简洁
- for-in除了遍历数组元素外还会遍历自定义属性  *fon-in为普通对象设计* **不适用于数组遍历**
  for-in的键是字符串，在不经意间可能会导致我们出错
  在某些情况下，可能按照随机顺序遍历数组元素
  ```javascript
  let arr = [1, 2, 3, 4, 5];
  arr.name = 'test';  // 给arr添加name属性
  for(let index in arr){
  	console.log(index+1); //index不是数字是字符串
  }
  /*
  输出：
  01
  11
  21
  31
  41
  name1
  */
  ```
- foeEach不能用break中断也不能用return返回外层函数

## 强大的for-of

-[x] 最简洁 最直接的遍历数组方法
-[x] 避免了for-in的所有缺陷
-[x] 可以正确响应break continue 和return语句

### for-of还可以遍历其他集合
课遍历大多类数组对象，还可以遍历字符串
### for-of不支持普通对象
用for-in 或者Object.keys()方法




>“能工摹形，巧匠窃意。”——巴勃罗·毕卡索
