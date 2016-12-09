(function () {

    let prizeItem = [1, 2, 3, 4, 5,6],
        priseColor = ['#ff5959','#ff7f7e','#ff5959','#ff7f7e','#ff5959','#ff7f7e']

    function drawTurntable() {
        let turntable = $('#turntable')[0],  //$对象转DOM对象
            ctx = turntable.getContext('2d');
        let prizeLen = prizeItem.length,
            sector = Math.PI * 2/prizeLen;

        // 画圆
        ctx.translate(250, 250)  // 移动中心
        ctx.beginPath()
        ctx.arc(0, 0, 250, 0, 2 * Math.PI)
        ctx.fillStyle = priseColor[1]
        ctx.fill()

        // 画出扇形
        prizeItem.forEach((item, i)=>{
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.arc(0, 0, 240, sector *i, sector + sector*i)
            ctx.fillStyle = priseColor[i]
            ctx.fill()

            if(i % 2 == 0){
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.arc(0, 0,70, sector *i, sector + sector*i)
                ctx.fillStyle = priseColor[1]
                ctx.fill()
            }
        })

        // 画内圆
        ctx.beginPath()
        ctx.arc(0,0,60,0,2*Math.PI)
        ctx.fillStyle = '#fff'
        ctx.fill()

    }

    function init() {
        drawTurntable()
    }

    init()
})()