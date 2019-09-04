<template>
  <div class="countdown">
    <span :class="['countdown-zoom', 'number', {'puffer': isPuffer}]">{{currentNumber}}</span>
  </div>
</template>

<script>

  export default {
    name: 'Countdown',
    props: ['initialNumber'],
    data() {
      return {
        currentNumber: this.initialNumber,
        isPuffer: false,
        countdownInterval: false,
      };
    },
    methods: {
      start: function() {

        this.$sounds['countdown'].play();

        // reset countdown
        this.currentNumber = this.initialNumber;
        this.isPuffer = false;

        const setPufferDelayed = (delay) => {
          setTimeout(() => { this.isPuffer = true; }, delay);
        };

        this.countdownInterval = setInterval(() => {

          this.currentNumber--;
          this.isPuffer = false;
          setPufferDelayed(600);

          if(this.currentNumber == 0) {
            // it's the final countdown \o/
            clearInterval(this.countdownInterval);
          }
        }, 1000);

        setPufferDelayed(600);
      }
    }
  }
</script>

<style lang="scss">
  .countdown-zoom {
    display: block;
    opacity: 1.0;
    transition: opacity 0.4s ease;
    &.puffer {
      opacity: 0;
      transform: scale(1.6, 1.6);
      transition: all 0.4s ease-out;
    }
  }
</style>