[TOC]
# js本地储存

## 各种储存方案

- **cookies：** *浏览器均支持，容量为4KB*
- **LocalStorage：** *HTML5，容量为5M*
- **sessionStorage：** *HTML5，容量为5M*
- UserData：仅IE支持，容量为64KB
- Flash：100KB，非HTML原生，需要插件支持
- Google Gears SQLite ：需要插件支持，容量无限制
- globalStorage：Firefox独有的，Firefox13开始就不再支持这个方法

> UserData仅IE支持， Google Gears SQLite需要插件，Flash已经伴随着HTML5的出现渐渐退出了历史舞台

## Cookie

### Cookie特点

1. cookie大小限制为4kb
2. 只要有请求涉及cookie，cookie就要在服务器与客户端来回传送
3. cookie会随请求到服务器，js操作cookie比较繁琐

### Session

session机制是一种服务器端的机制

### Cookie和Session简单对比

1. cookie客户端 session 服务器
2. session 占用资源
3. 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie
4. cookie 不安全
5. 建议： - 将登陆信息等重要信息存放为SESSION
   - 其他信息如果需要保留，可以放在cookie中

### cookie语法
- 读取cookie `allCookies = document.cookie;`
- 写入cookie `document.cookie = updatedCookie;`
- `;path=*path*` (例如 '/', '/mydir') 如果没有定义，默认为当前文档位置的路径。
- `;domain=*domain*` (例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com') 如果没有定义，默认为当前文档位置的路径的域名部分。
- `;max-age=*max-age-in-seconds*` (例如一年为60*60*24*365)
- `;expires=*date-in-GMTString-format*` 如果没有定义，cookie会在对话结束时过期这个值的格式参见[Date.toUTCString()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toUTCString) 
- `;secure` (cookie只通过https协议传输)

### MDN docCookies.js

```javascript
/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
```
- `docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])`写入cookie
- `docCookies.getItem(name)`得到cookie
- `docCookies.removeItem(name[, path],domain)`移除cookie
- `docCookies.hasItem(name)`检查cookie
- `docCookies.keys()得到所有cookie的列表`
  [MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie) [NPM链接](https://www.npmjs.com/package/doc-cookies)


## LocalStorage
> 这是一种持久化的存储方式，也就是说如果不手动清除，数据就永远不会过期。
> 它也是采用Key - Value的方式存储数据，底层数据接口是sqlite，按域名将数据分别保存到对应数据库文件里。它能保存更大的数据（IE8上是10MB，Chrome是5MB），同时保存的数据不会再发送给服务器，避免带宽浪费。

### LocalStorage的属性与方法
| 属性方法                             | 说明                           |
| :------------------------------- | :--------------------------- |
| localStorage.length              | 获得storage中的个数                |
| localStorage.key(n)              | 获得storage中第n个元素对的键值（第一个元素是0） |
| localStorage.key                 | 获取键值key对应的值                  |
| localStorage.getItem(key)        | 获取键值key对应的值                  |
| localStorage.setItem(key, value) | 添加数据，键值为key，值为value          |
| localStorage.removeItem(key)     | 移除键值为key的数据                  |
| localStorage.clear()             | 清除所有数据                       |

### LocalStorage缺点

- localStorage大小限制在500万字符左右，各个浏览器不一致
- localStorage在隐私模式下不可读取
- localStorage本质是在读写文件，数据多的话会比较卡（firefox会一次性将数据导入内存，想想就觉得吓人啊）
- localStorage不能被爬虫爬取，不要用它完全取代URL传参

## sessionStorage
> 和服务器端使用的session类似，是一种会话级别的缓存，关闭浏览器会数据会被清除。不过有点特别的是它的作用域是窗口级别的，也就是说不同窗口间的sessionStorage数据不能共享的。使用方法（和localStorage完全相同）

## sessionStorage和localStorage的区别
- sessionStorage用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。当用户关闭浏览器窗口后，数据立马会被删除。

- localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。第二天、第二周或下一年之后，数据依然可用。

## web Storage和cookie的区别
- web Storage 有更大的储存
- web Storage 使用更简单
- Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生
