<template>
  <div>{{ timeFormatted }}</div>
</template>

<script>

  import Utils from '../lib/Utils';

  export default {
    name: 'SimpleTimer',
    data () {
      return {
        timer: false,
        currentTime: 0
      };
    },
    computed: {
      timeFormatted: function() {
        return Utils.formatTime(this.currentTime);
      }
    },
    methods: {
      start: function() {
        this.timer = setInterval(() => { this.currentTime += 100; }, 100);
      },
      stop: function() {
        clearInterval(this.timer);
      }
    }
  }
</script>
