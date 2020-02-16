<template>
  <v-group :config="{draggable:true}">
    <v-rect :config="config" ref="rect" />

    <v-circle
      v-for="(dot,index) in dots[config.id]"
      :key="dot.id"
      :config="{
        ...circleConfig,
        y:dot.y || circleConfig.y,
        x:dot.x || circleConfig.x,
        fill:dot.active?'orange':'#70ad47',
        id:dot.id
      }"
      @mouseover="handleHover"
      @mouseout="handleHoverOut"
      @click="handleClick($event,index)"
    />
  </v-group>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import CONSTANTS from "../const";
import {dotsUtil} from "../utils";

export default {
  props: {
    config: {
      x: Number,
      y: Number,
      width: Number,
      height: Number,
      fill: String
    }
  },

  created() {
    this.makeDots();
  },

  data() {
    return {
      circleConfig: {
        x: this.config.x + CONSTANTS.RECT_SIZE / 2,
        y: this.config.y + CONSTANTS.RECT_SIZE / 2,
        radius: CONSTANTS.RECT_SIZE / 7,
        stroke: "white"
      }
    };
  },
  methods: {
    ...mapMutations("dragBox", {
      addDots: "ADD_DOTS",
      changeDotsState: "ACTIVE_DOTS_HANDLER"
    }),
    makeDots() {
      this.addDots({
        id: this.config.id,
        dots: dotsUtil(this.config)
      });
    },
    handleHover(e) {
      e.target.radius(this.circleConfig.radius * 1.2).draw();
    },
    handleHoverOut(e) {
      e.target.radius(this.circleConfig.radius).parent.parent.draw();
    },
    handleClick(e, index) {
      this.changeDotsState({
        id: this.config.id,
        dotId: index,
        state: !this.dots[this.config.id].find(dot => dot.id === e.target.id()).active
      });
      this.$forceUpdate();
      
    }
  },
  computed: {
    ...mapState("dragBox", {
      dots: "DOTS"
    })
  }
};
</script>
