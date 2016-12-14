$(function () {

    let musics = [
        {
            song:'Five Hundred Miles',
            url: 'http://m5.file.xiami.com/506/16506/146691/1658080_4017332_l.mp3',
            singer: 'Justin Timberlake'
        },
        {
            song:'把悲伤留给自己',
            url: 'http://m5.file.xiami.com/119/119/449/5384_96212_l.mp3',
            singer: '陈升'
        },
        {
            song:'当爱已成往事',
            url: 'http://m5.file.xiami.com/166/1166/5833/377412_21906_l.mp3',
            singer: '张国荣'
        },
        {
            song:'野子',
            url: 'http://m5.file.xiami.com/83/2075780083/537396972/1774520623_16916469_l.mp3',
            singer: '苏运莹'
        },

    ];
    let i = 0, //第几首歌
        musicLen = musics.length;


    /**
     * 音乐列表
     */
    function musicList() {
        let menuBtn = $('.menu-btn'),
            menu = $('.menu'),
            list = menu.find('ul');

        musics.forEach(function (item, i) {
            list.append('<li><a href="javascript:void(0);">'+item.song+'<span>'+item.singer+'</span></a></li>')
        })

        // 打开音乐列表
        menuBtn.on('click', function () {
            if($(this).hasClass('icon-caidan')){
                menu.slideDown(100)
            }else{
                menu.slideUp(100)
            }
            $(this).toggleClass('icon-caidan icon-menu')
        })

        // 关闭音乐列表
        $('.close').click(function () {
            menuBtn.click()
        })

        menu.on('click', 'li', function () {
            let _index = $(this).index()
            i = _index
            choseMusic(_index)
            console.log(i)
        })

    }

    /**
     * 切换歌曲
     * @param i 第几首歌
     */
    function choseMusic(i) {
        musicPause()
        music.src = musics[i].url;
        $('.player-header h1').html(musics[i].song+'<br><small>'+ musics[i].singer+'</small>')
        musicPlay()
    }

    let onOff = $('.on-off'),
        prev = $('.prev'),
        next = $('.next'),
        disk = $('.disk'),
        music = $('#music')[0],
        progressBar = $('.progress-bar');

    /**
     * 播放控制
     */
    function control() {
        let volume = $('.volume'),
            like = $('.like');

        // 播放暂停
        onOff.on('click',function () {
            if($(this).hasClass('icon-zanting')){
                musicPlay()
            }else {
                musicPause()
            }
        })

        // 上一首
        prev.on('click',function () {
            i--
            if (i <= -1){
                i = musicLen-1
            }
            choseMusic(i)
        })

        // 下一首
        next.on('click',function () {
            i++
            if(i == musicLen){
                i = 0
            }
            console.log(i)
            choseMusic(i)
        })

        volume.on('click',function () {
            if($(this).hasClass('icon-shengyin')){
                music.volume = 0
            }else {
                music.volume = 1
            }
            $(this).toggleClass('icon-shengyin icon-jingyin')
        })

        like.on('click',function () {
            $(this).toggleClass('icon-diligently icon-xin')
        })

        // 进度条
        progressBar.on('input',progressCtrl)
    }

    let timer;

    /**
     * 播放音乐
     */
    function musicPlay() {
        onOff.removeClass('icon-zanting').addClass('icon-bofang')
        $('.hand').addClass('play')
        music.play()
        // console.log(music.duration)
        disk.css('webkitAnimationPlayState','running')
        // 进度条
        timer = setInterval(function () {
            // 歌曲时间
            let totalTime = Math.floor(music.duration/60)+':'+Math.round(music.duration%60);
            let nowTime = Math.floor(music.currentTime/60)+':'+Math.round(music.currentTime%60)
            progressBar.val(100*music.currentTime/music.duration)
            $('.progress time').text(nowTime+'/'+totalTime)
            progressBar.css('background',`linear-gradient(to right,#666 ${progressBar.val()}%, #222 ${progressBar.val()}%)`)
        },1000)
    }

    /**
     * 暂停
     */
    function musicPause() {
        onOff.removeClass('icon-bofang').addClass('icon-zanting')
        $('.hand').removeClass('play')
        music.pause()
        disk.css('webkitAnimationPlayState','paused')
        clearInterval(timer)
    }

    /**
     * 播放进度
     */
    function progressCtrl() {
        let _val = progressBar.val()
        music.currentTime = _val/100 * music.duration
        console.log(_val/100 * music.duration)
        progressBar.css('background',`linear-gradient(to right,#666 ${_val}%, #222 ${_val}%)`)
    }
    // 播放完成自动播放下一首
    music.addEventListener('ended', function () {
        musicPause()
        setTimeout(function () {
            next.click()
        }, 600)
    })

    function init() {
        musicList()
        control()
    }

    init()
})