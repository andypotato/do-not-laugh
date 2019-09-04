<template>
  <div class="page page-start">

    <div class="headline">Do not laugh!</div>
    <div class="buttons">
      <button v-if="!isReady" class="btn btn-start">
        Please wait...
      </button>
      <button v-if="isReady" class="btn btn-start" @click="startGame()">
        😊Smile to start😊
      </button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'start',
  data() {
    return {
      isReady: false,
      isPresented: false
    }
  },
  methods: {
    startGame: function() {
      this.$sounds['button1'].play();
      this.$router.push({ name: 'play' });
    }
  },

  mounted() {

    // listen to messages
    this.$electron.ipcRenderer.on('message-from-worker', (event, data) => {

      if(!this.isPresented) {
        // ignore if view isn't presented
        return;
      }

      if(typeof data.command === 'undefined') {
        console.error('IPC message is missing command string');
        return;
      }

      if(data.command == 'ready') {
        // network is ready
        this.isReady = true;
        return;
      }

      if(data.command == 'expression') {
        if(data.payload.type == 'happy') {
          this.startGame();
          return;
        }
      }

    });

  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.isPresented = true;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.isPresented = false;
    next();
  }
}
</script>

<style lang="scss">

  .page-start {
    background-color: #000000;

    .headline {
      text-align: center;
      font-size: 128px;
      margin-top: 200px;
    }

    .buttons {
      text-align: center;
      margin-top: 100px;
      .btn {
        font-family: "Comic Sans MS";
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

</style>
