'use strict;'

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')

const app = {
  songs: [
    {
      name: 'quan tâm em mỗi ngày',
      singer: 'Hoàng Tôn',
      path: './asset/music/quan_tam_em_moi_ngay.mp3',
      img: './asset/img/quan_tam_em_moi_ngay.jpg'
    },
    {
      name: 'chơi vơi',
      singer: 'K-ICM, Trung Quân',
      path: './asset/music/song1.mp3',
      img: './asset/img/choi_voi.jpg'
    },
    {
      name: 'vai "ác"',
      singer: 'Phạm Quỳnh Anh, Linh Đan',
      path: './asset/music/song1.mp3',
      img: './asset/img/vai_ac.jpg'
    },
    {
      name: 'quýt làm, cam chịu?',
      singer: 'J Jade, Tumie (Việt Nam), Tdod (Việt Nam)',
      path: './asset/music/song1.mp3',
      img: './asset/img/quyt_lam_cam_chiu.jpg'
    },
    {
      name: 'i used to think i could fly?',
      singer: 'Tate McRae',
      path: './asset/music/song1.mp3',
      img: './asset/img/i_used_to_think_i_could_fly.jpg'
    },
  ],

  currentIndex: 0,
  isPlaying: false,

  render: function() {
    const htmls = this.songs.map(song => {
      return `
        <div class="song">
          <div class="thumb" style="background-image: url('${song.img}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `
    })
    $('.playlist').innerHTML = htmls.join('')
  },

  defineProperties: function() {
    Object.defineProperty(this, 'currentSong', {
      get: function() {
        return this.songs[this.currentIndex]
      }
    })
  },

  loadCurrentSong: function() {
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
    audio.src = this.currentSong.path
  },

  handleEvents: function() {
    const _this = this
    const cdWidth = cd.offsetWidth

    // xu ly khi scroll
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop

      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
      cd.style.opacity = newCdWidth/cdWidth
    }

    // xu ly khi an nut play 
    playBtn.onclick = function() {
      if(_this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
        
      }
    }

    // lang nghe khi play
    audio.onplay = function() {
      player.classList.add('playing')
      _this.isPlaying = true
    }

    // lang nghe khi pause
    audio.onpause = function() {
      player.classList.remove('playing')
      _this.isPlaying = false
    }

    // khi tien do bai hat thay doi
    audio.ontimeupdate = function() {
      if (audio.duration) {
        const progressPercen = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = progressPercen
      }
      
    }

    // khi tua bai hat
    progress.onchange = function(e) {
      const seekTime = audio.duration / 100 * e.target.value 
      audio.currentTime = seekTime
    }
  },

  start: function() {
    this.defineProperties()
    this.handleEvents()
    this.loadCurrentSong()
    this.render()
  }
}

app.start();