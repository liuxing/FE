# HTML5 Notification
## 概述
Notification 对象使用来为用户设置和显示桌面通知。 类似于手机锁屏下弹出的新消息提醒

## 先来个小栗子
点击Notify me!按钮桌面会有提示小弹窗
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HTML5 Notification</title>
</head>
<body>
<button onclick="notifyMe()">Notify me!</button>

<script>
    
    function notifyMe() {
        if(Notification.permission == "granted"){
            var notification = new Notification("Hi，帅哥：", {
                body: '可以加你为好友吗？',
                icon: 'http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg'
            });
        }
    }
</script>
</body>
</html>
```

## HTML5  Notification语法

```javascript
var notification = new Notification(title, options)
```
###参数

- title
  - 一定会被显示的通知标题
- options 可选
  一个被允许用来设置通知的对象。它包含以下属性：
  - dir : 文字的方向；它的值可以是 auto（自动）, ltr（从左到右）, or rtl（从右到左）
  - lang: 指定通知中所使用的语言。这个字符串必须在 BCP 47 language tag 文档中是有效的。
  - body: 通知中额外显示的字符串
  - tag: 赋予通知一个ID，以便在必要的时候对通知进行刷新、替换或移除。
  - icon: 一个图片的URL，将被用于显示通知的图标。
