(function () {
    /**
     * 随机数
     * @returns {Number}
     */
    function numRand() {
        let x = 999; //上限
        let y = 111; //下限
        return parseInt(Math.random() * (x - y + 1) + y);
    }

    /**
     * 转动
     */
    let isBegin;

    function roll() {
        let num = $('.num'),
            u = 160, //每个数字的高度
            result = numRand();
        if (isBegin) return false;
        isBegin = true;
        num.css('backgroundPositionY', 0);
        let nums = (result + '').split('');
        // console.log(nums)
        num.each(function (index) {
            let _this = $(this);
            setTimeout(function () {
                _this.animate({
                    backgroundPositionY: u * 10 * 6 - 160 * nums[index]  // 6 转六圈
                }, {
                    duration: 6000,
                    easing: 'easeInOutCubic',
                    complete: function () {
                        if (index == 2) {
                            isBegin = false;
                            alert(result)
                        }
                    }
                })
            }, index * 300);
        })
    }

    function init() {
        let start = $('.start');
        start.on('click', function () {
            roll()
        })
    }

    init()
})();