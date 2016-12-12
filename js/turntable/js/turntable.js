(function () {

    let prizeItem = [1, 2, 3, 4, 5, 6],
        priseColor = ['#ff5959', '#ff7f7e', '#ff5959', '#ff7f7e', '#ff5959', '#ff7f7e'],
        resultAngle = [];

    /**
     * 画转盘
     */
    function drawTurntable() {
        let turntable = $('#turntable')[0],  //$对象转DOM对象
            ctx = turntable.getContext('2d');
        let prizeLen = prizeItem.length,
            sector = Math.PI * 2 / prizeLen;

        // 画圆
        ctx.translate(250, 250)  // 移动中心
        ctx.beginPath()
        ctx.arc(0, 0, 250, 0, 2 * Math.PI)
        ctx.fillStyle = priseColor[1]
        ctx.fill()

        // 画出扇形
        prizeItem.forEach((item, i) => {
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.arc(0, 0, 240, sector * i, sector + sector * i)
            ctx.fillStyle = priseColor[i]
            ctx.fill()

            if (i % 2 == 0) {
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.arc(0, 0, 60, sector * i, sector + sector * i)
                ctx.fillStyle = priseColor[1]
                ctx.fill()
            }

            // 画出文字
            ctx.font = "28px Arial";
            let r = 150,
                angle = sector * 180 / Math.PI,
                x1 = r * Math.cos((angle / 2 + angle * i) * Math.PI / 180),
                y1 = r * Math.sin((angle / 2 + angle * i) * Math.PI / 180);
            resultAngle.push((angle / 2 + angle * i) - angle / 2)  // 添加中奖角度到数组
            // console.log(x1,y1,angle)
            ctx.fillStyle = '#fff'
            ctx.fillText(item, x1, y1)
        })

        // 画内圆
        ctx.beginPath()
        ctx.arc(0, 0, 40, 0, 2 * Math.PI)
        ctx.fillStyle = '#fff'
        ctx.fill()

    }

    /**
     * 随机数
     * @returns {number}
     */
    function angleRand() {
        let rand = Math.floor(Math.random() * (prizeItem.length));
        return rand
    }

    /**
     * 点击开始
     */
    function rotateHandler() {
        let start = $('#start'),
            turnTable = $('#turntable'),
            isbegin = false;
        start.on('click', function () {
            //  防止连续点击
            if (isbegin) {
                return false
            }
            isbegin = true
            let result = angleRand()
            turnTable.animate({
                rotate: 360 * 8 - 120 - +resultAngle[result]  //8 - 转8圈
            }, {
                duration: 6000,
                easing: 'easeInOutCubic',
                complete: function () {
                    isbegin = false
                    console.log(prizeItem[result])
                    alert(prizeItem[result])
                }
            });
        })
    }

    function init() {
        drawTurntable()
        rotateHandler()
    }

    init()
})()