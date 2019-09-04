<template>
  <div class="page page-play">

    <div class="overlay overlay-game">
      <h1>😆 Do not laugh! 😆</h1>
      <div class="video-container">
        <!-- Video credit: -->
        <!-- https://www.youtube.com/watch?v=kcQi16Te4CY&t=57s -->
        <!-- Licensed under Creative Commons Attribution license -->
        <!-- Music: "Happy Happy Game Show, Monkeys Spinning Monkeys" -->
        <!-- By Kevin MacLeod (incompetech.com) -->
        <video ref="vid" width="100%" poster="@/assets/curtains.jpg">
          <source src="@/assets/video/funny.mp4" type="video/mp4">
        </video>
      </div>
      <div class="cam-container">

        <div class="hud">
          <div class="timer">
            <SimpleTimer ref="stopwatch" />
          </div>
          <div class="strikes">
            Round {{currentRound}} of {{maxStrikes}}
          </div>
        </div>

        <video ref="cam" autoplay muted playsinline></video>
      </div>
    </div>

    <div :class="['overlay', 'overlay-finished', { 'overlay-visible': showFinished }]">
      <div class="gameover">
        Game over!
      </div>
      <div class="result">
        You lasted: {{finalTime}}
      </div>
      <div class="buttons">
        <button class="btn btn-start">
          Make an angry face to try again! 😠😠😠
        </button>
      </div>
    </div>

    <div :class="['overlay', 'overlay-laugh', { 'overlay-visible': showLaugh }]">
      <div class="smiley"><img src="../assets/laugh.png" alt="Laugh"></div>
    </div>

    <div :class="['overlay', 'overlay-countdown', { 'overlay-visible': showCountdown }]">
      <Countdown ref="countdown" initialNumber="3" />
    </div>

  </div>
</template>

<script>

import Countdown from '@/components/Countdown.vue';
import SimpleTimer from '@/components/SimpleTimer.vue';
import Utils from '../lib/Utils';

export default {
  name: 'play',
  components: { Countdown, SimpleTimer },
  data() {
    return {

      /*
        0: countdown
        1: running
        2: paused
        3: gameover
      */
      gameState: 0,

      showCountdown: false,
      showFinished: false,
      showLaugh: false,

      currentRound: 0,
      maxStrikes: 3,
      finalTime: '00:00.00'
    }
  },
  methods: {

    initCamera: async function(width, height) {

      // create cam reference
      let cam = this.$refs.cam;
      cam.width = width;
      cam.height = height;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: width,
          height: height
        }
      });
      cam.srcObject = stream;

      return new Promise((resolve) => {
        cam.onloadedmetadata = () => {
          resolve(cam);
        };
      });
    },

    newGame: function() {

      // set game state
      this.gameState = 0; // countdown

      // reset layers
      this.showLaugh = false;
      this.showFinished = false;

      // reset round counter
      this.currentRound = 0;

      // reset stopwatch
      this.$refs['stopwatch'].stop();
      this.$refs['stopwatch'].currentTime = 0;

      // start countdown
      this.showCountdown = true;
      this.$refs['countdown'].start();

      // start round
      setTimeout(() => {
        this.showCountdown = false;
        this.startRound();
      }, 4000);
    },

    startRound: function() {

      this.currentRound++;
      console.log('Starting new round', this.currentRound);

      // running!
      this.gameState = 1;

      // reset game
      this.showLaugh = false;

      // start the funny video
      let startTime = Math.floor(Math.random() * 400);
      this.$refs['vid'].currentTime = startTime;
      this.$refs['vid'].play();

      // start the timer
      this.$refs['stopwatch'].start();
    },

    onLaugh: function() {

      if(this.gameState != 1) {
        return;
      }

      // pause game
      this.gameState = 2;

      // pause timer
      this.$refs['stopwatch'].stop();

      // stop video
      this.$refs['vid'].pause();

      // play explosion sound
      this.$sounds['explosion'].play();

      // show laugh
      this.showLaugh = true;

      // continue after 4 seconds
      setTimeout(() => {

        // check game status
        if(this.currentRound == this.maxStrikes) {

          // game over
          this.gameState = 3;
          this.finalTime = Utils.formatTime(this.$refs['stopwatch'].currentTime);
          this.showLaugh = false;
          this.showFinished = true;

        } else {

          // next round
          this.startRound();
        }

      }, 4000);
    },

    onAngry: function() {

      if(this.gameState != 3) {
        return;
      }

      // start new game
      this.newGame();
    },
  },

  mounted() {

    this.initCamera(640, 480)
    .then(video => {
      console.log('Camera was initialized');

      // new game
      this.newGame();
    });

    // listen to messages
    this.$electron.ipcRenderer.on('message-from-worker', (event, data) => {

      if(typeof data.command === 'undefined') {
        console.error('IPC message is missing command string');
        return;
      }

      if(data.command == 'expression') {
        if(data.payload.type == 'happy') {
          this.onLaugh();
          return;
        }

        if(data.payload.type == 'angry') {
          this.onAngry();
          return;
        }
      }

    });

  }
}
</script>

<style lang="scss">

  .page-play {
    background-color: #000000;

    h1 {
      margin: 24px 0;
      font-size: 32px;
      text-align: center;
    }

    .video-container {
      width: 800px;
      margin: auto;
    }

    .cam-container {

      width: 800px;
      margin: auto;
      position: relative;

      .hud {
        position: absolute;
        top: 40px;
        left: 20px;

        color: deeppink;

        .timer {
          font-size: 48px;
        }

        .strikes {
          margin-top: 16px;
        }

      }

      video {
        position: absolute;
        top: -60px;
        right: 20px;
        width: 320px;
        height: 240px;
        border: 4px solid pink;
        border-radius: 120px;
      }
    }

    .overlay-countdown {

      display: none;

      .countdown {
        text-align: center;
        margin-top: 120px;
        font-size: 340px;
        .number {
          font-weight: bold;
        }
      }
    }

    .overlay-finished {

      display: none;
      background-color: rgba(0, 0, 0, 0.9);
      text-align: center;

      .gameover {
        margin-top: 120px;
        font-size: 64px;
      }

      .result {
        color: deeppink;
        margin-top: 20px;
        font-size: 32px;
      }

      .buttons {
        text-align: center;
        margin-top: 60px;
        .btn {
          border: 8px dashed pink;
          background-color: white;
          font-size: 48px;
          border-radius: 10px;
          color: #ff0000;
          padding: 10px;
          width: 500px;
        }
      }
    }

    .overlay-laugh {
      display: none;
      .smiley {
        margin-top: 100px;
        text-align: center;
      }
    }

    .overlay-visible {
      display: block;
    }
  }

</style>
