<template>
  <div id="app">
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">

@import "./sass/_common";

#app {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
