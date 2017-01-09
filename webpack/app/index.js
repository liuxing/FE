import generateText from './sub'
//import $ from 'jquery'
import moment from 'moment'
import './scss/main.scss'
import './plugin'

// 时间本地化
moment.locale('zh-cn')

let app = document.createElement('div')
const myPromise = Promise.resolve(42)
myPromise.then((number) => {
    $('body').append('<p>promise result is ' + number + ' now is ' + moment().format() + '</p>')

    // 使用插件
    $('p').greenify()
})
app.innerHTML = '<h1>Hello World it</h1>'
document.body.appendChild(app)
app.appendChild(generateText())
