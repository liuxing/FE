$(function () {

    let musics = [
        {
            song: '',
            singer: ''
        }
    ]

    let onOff = $('.on-off'),
        prev = $('.prev'),
        next = $('.next'),
        disk = $('.disk'),
        music = $('#music')[0],
        progressBar = $('.progress-bar');

    function musicPaly() {
        music.play()
        disk.css('webkitAnimationPlayState','running')
        // console.log(music.duration)
        // console.log(music.currentTime)
    }
    
    function musicPause() {
        music.pause()
        disk.css('webkitAnimationPlayState','paused')
    }

    function progressCtrl() {
        let _val = $(this).val()
        $(this).css('background',`linear-gradient(to right,#666 ${_val}%, #222 ${_val}%)`)
    }
    
    function control() {
        let volume = $('.volume'),
            like = $('.like');

        onOff.on('click',function () {
            $(this).toggleClass('icon-bofang icon-zanting')
            $('.hand').toggleClass('play')
            if($(this).hasClass('icon-bofang')){
                musicPaly()
            }else {
                musicPause()
            }
        })

        volume.on('click',function () {
            $(this).toggleClass('icon-shengyin icon-jingyin')
            music.volume = 0
        })

        like.on('click',function () {
            $(this).toggleClass('icon-diligently icon-xin')
        })

        progressBar.on('input',progressCtrl)
    }

    control()
})