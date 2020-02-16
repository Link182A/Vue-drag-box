<template>
  <div id="app">
    <DragBox/>
  </div>
</template>

<script>
import DragBox from "./components/DragBox";

export default {
  components: {
    DragBox
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.konvajs-content {
  margin: auto;
}
</style>
