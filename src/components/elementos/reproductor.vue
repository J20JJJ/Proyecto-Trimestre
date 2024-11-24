<template>
  <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.3.1/css/all.css'><link rel="stylesheet" href="./style.css">


<!-- partial:index.partial.html -->
 <div class="todo">
    <div class="body1">
        <div id="player-bg-artwork"></div>
        <div id="player-bg-layer"></div>
        <div id="player-container">
          <div id="player">
            <div id="player-track">
              <div id="album-name"></div>
              <div id="track-name"></div>
              <div id="track-time">
                <div id="current-time"></div>
                <div id="track-length"></div>
              </div>
              <div id="seek-bar-container">
                <div id="seek-time"></div>
                <div id="s-hover"></div>
                <div id="seek-bar"></div>
              </div>
            </div>
            <div id="player-content">
              <div id="album-art">
                <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg" class="active" id="_1" />
                <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_2.jpg" id="_2" />
                <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_3.jpg" id="_3" />
                <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_4.jpg" id="_4" />
                <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_5.jpg" id="_5" />
                <div id="buffer-box">Buffering ...</div>
              </div>
              <div id="player-controls">
                <div class="control">
                  <div class="button" id="play-previous">
                    <i class="fas fa-backward"></i>
                  </div>
                </div>
                <div class="control">
                  <div class="button" id="play-pause-button">
                    <i class="fas fa-play"></i>
                  </div>
                </div>
                <div class="control">
                  <div class="button" id="play-next">
                    <i class="fas fa-forward"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
 </div>
<!-- partial -->
  <!-- <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script><script  src="./script.js"></script> -->



  </template>
  
  <script>
  export default {
    data() {
      return {
        audio: null,
        albumArtworks: [
          "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg",
          "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_2.jpg",
          "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_3.jpg",
          "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_4.jpg",
          "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_5.jpg"
        ],
        albums: ["Me & You", "Electro Boy", "Home", "Proxy (Original Mix)"],
        trackNames: [
          "Alex Skrindo - Me & You",
          "Kaaze - Electro Boy",
          "Jordan Schor - Home",
          "Martin Garrix - Proxy"
        ],
        trackUrl: [
          "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3",
          "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3",
          "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3",
          "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3"
        ],
        currentIndex: 0,
        currentAlbum: "",
        currentTrack: "",
        playPauseIcon: "fas fa-play",
        currentTime: "00:00",
        trackLength: "00:00",
        seekBarWidth: "0%",
        hoverWidth: "0px",
        seekTime: "00:00",
        isBuffering: false
      };
    },
    methods: {
      initPlayer() {
        this.audio = new Audio();
        this.selectTrack(0);
        this.audio.loop = false;
        this.audio.addEventListener("timeupdate", this.updateCurrTime);
      },
      playPause() {
        if (this.audio.paused) {
          this.playPauseIcon = "fas fa-pause";
          this.audio.play();
        } else {
          this.playPauseIcon = "fas fa-play";
          this.audio.pause();
        }
      },
      togglePlayPause() {
        this.playPause();
      },
      showHover(event) {
        const seekBarPos = this.$refs.seekBarContainer.getBoundingClientRect();
        const seekT = event.clientX - seekBarPos.left;
        const seekLoc = this.audio.duration * (seekT / seekBarPos.width);
        this.hoverWidth = `${seekT}px`;
        const ctMinutes = Math.floor(seekLoc / 60);
        const ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
        this.seekTime = `${ctMinutes < 10 ? "0" : ""}${ctMinutes}:${ctSeconds < 10 ? "0" : ""}${ctSeconds}`;
      },
      hideHover() {
        this.hoverWidth = "0px";
        this.seekTime = "00:00";
      },
      playFromClickedPos() {
        const seekBarPos = this.$refs.seekBarContainer.getBoundingClientRect();
        const seekT = event.clientX - seekBarPos.left;
        const seekLoc = this.audio.duration * (seekT / seekBarPos.width);
        this.audio.currentTime = seekLoc;
        this.seekBarWidth = `${(this.audio.currentTime / this.audio.duration) * 100}%`;
      },
      updateCurrTime() {
        const curMinutes = Math.floor(this.audio.currentTime / 60);
        const curSeconds = Math.floor(this.audio.currentTime - curMinutes * 60);
        const durMinutes = Math.floor(this.audio.duration / 60);
        const durSeconds = Math.floor(this.audio.duration - durMinutes * 60);
        this.currentTime = `${curMinutes < 10 ? "0" : ""}${curMinutes}:${curSeconds < 10 ? "0" : ""}${curSeconds}`;
        this.trackLength = `${durMinutes < 10 ? "0" : ""}${durMinutes}:${durSeconds < 10 ? "0" : ""}${durSeconds}`;
        this.seekBarWidth = `${(this.audio.currentTime / this.audio.duration) * 100}%`;
      },
      selectTrack(flag) {
        if (flag === 0 || flag === 1) {
          this.currentIndex++;
        } else {
          this.currentIndex--;
        }
  
        if (this.currentIndex >= 0 && this.currentIndex < this.albumArtworks.length) {
          this.currentAlbum = this.albums[this.currentIndex];
          this.currentTrack = this.trackNames[this.currentIndex];
          this.audio.src = this.trackUrl[this.currentIndex];
          this.audio.play();
        } else {
          if (flag === 0 || flag === 1) {
            this.currentIndex--;
          } else {
            this.currentIndex++;
          }
        }
      },
      prevTrack() {
        this.selectTrack(-1);
      },
      nextTrack() {
        this.selectTrack(1);
      }
    },
    mounted() {
      this.initPlayer();
    }
  };
  </script>
  
  <style scoped>
.todo{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.body1 {
  margin: 0;
  background-color: #f1f9f9;
}
.todo:focus {
  outline: none;
}

.body1 {
  margin: 0;
  background-color: #ffeff5;
}

#player-container {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  width: 430px;
  height: 100px;
  margin: -4px auto;
}

#player-bg-artwork {
  position: fixed;
  top: -30px;
  right: -30px;
  bottom: -30px;
  left: -30px;
  background-image: url("https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: blur(40px);
  -webkit-filter: blur(40px);
  z-index: 1;
}

#player-bg-layer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  opacity: 0.5;
  z-index: 2;
}

#player {
  position: relative;
  height: 100%;
  z-index: 3;
}

#player-track {
  position: absolute;
  top: 0;
  right: 15px;
  left: 15px;
  padding: 13px 22px 10px 184px;
  background-color: #fff7f7;
  border-radius: 15px 15px 0 0;
  transition: 0.3s ease top;
  z-index: 1;
}

#player-track.active {
  top: -92px;
}

#album-name {
  color: #54576f;
  font-size: 17px;
  font-weight: bold;
}

#track-name {
  color: #acaebd;
  font-size: 13px;
  margin: 2px 0 13px 0;
}

#track-time {
  height: 12px;
  margin-bottom: 3px;
  overflow: hidden;
}

#current-time {
  float: left;
}

#track-length {
  float: right;
}

#current-time,
#track-length {
  color: transparent;
  font-size: 11px;
  background-color: #ffe8ee;
  border-radius: 10px;
  transition: 0.3s ease all;
}

#track-time.active #current-time,
#track-time.active #track-length {
  color: #f86d92;
  background-color: transparent;
}

#seek-bar-container,
#seek-bar {
  position: relative;
  height: 4px;
  border-radius: 4px;
}

#seek-bar-container {
  background-color: #ffe8ee;
  cursor: pointer;
}

#seek-time {
  position: absolute;
  top: -29px;
  color: #fff;
  font-size: 12px;
  white-space: pre;
  padding: 5px 6px;
  border-radius: 4px;
  display: none;
}

#s-hover {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  opacity: 0.2;
  z-index: 2;
}

#seek-time,
#s-hover {
  background-color: #3b3d50;
}

#seek-bar {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0;
  background-color: #fd6d94;
  transition: 0.2s ease width;
  z-index: 1;
}

#player-content {
  position: relative;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 30px 80px #656565;
  border-radius: 15px;
  z-index: 2;
}

#album-art {
  position: absolute;
  top: -40px;
  width: 115px;
  height: 115px;
  margin-left: 40px;
  transform: rotateZ(0);
  transition: 0.3s ease all;
  box-shadow: 0 0 0 10px #fff;
  border-radius: 50%;
  overflow: hidden;
}

#album-art.active {
  top: -60px;
  box-shadow: 0 0 0 4px #fff7f7, 0 30px 50px -15px #afb7c1;
}

#album-art:before {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  width: 20px;
  height: 20px;
  margin: -10px auto 0 auto;
  background-color: #d6dee7;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px #fff;
  z-index: 2;
}

#album-art img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: -1;
}

#album-art img.active {
  opacity: 1;
  z-index: 1;
}

#album-art.active img.active {
  z-index: 1;
  -webkit-animation: rotateAlbumArt 3s linear 0s infinite forwards;
          animation: rotateAlbumArt 3s linear 0s infinite forwards;
}

@-webkit-keyframes rotateAlbumArt {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes rotateAlbumArt {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

#buffer-box {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  height: 13px;
  color: #1f1f1f;
  font-size: 13px;
  font-family: Helvetica;
  text-align: center;
  font-weight: bold;
  line-height: 1;
  padding: 6px;
  margin: -12px auto 0 auto;
  background-color: rgba(255, 255, 255, 0.19);
  opacity: 0;
  z-index: 2;
}

#album-art img,
#buffer-box {
  transition: 0.1s linear all;
}

#album-art.buffering img {
  opacity: 0.25;
}

#album-art.buffering img.active {
  opacity: 0.8;
  filter: blur(2px);
  -webkit-filter: blur(2px);
}

#album-art.buffering #buffer-box {
  opacity: 1;
}

#player-controls {
  width: 250px;
  height: 100%;
  margin: 0 5px 0 141px;
  float: right;
  overflow: hidden;
}

.control {
  width: 33.333%;
  float: left;
  padding: 12px 0;
}

.button {
  width: 26px;
  height: 26px;
  padding: 25px;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.button i {
  display: block;
  color: #d6dee7;
  font-size: 26px;
  text-align: center;
  line-height: 1;
}

.button,
.button i {
  transition: 0.2s ease all;
}

.button:hover {
  background-color: #d6d6de;
}

.button:hover i {
  color: #fff;
}
  </style>
  