<template>
  <v-group :config="{draggable:true}" @dragmove="dragHandler">
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
import { dotsUtil } from "../utils";

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
  watch:{
    lines(){
      this.$forceUpdate();
    }
  },
  methods: {
    ...mapMutations("dragBox", {
      addDots: "ADD_DOTS",
      changeDotsState: "ACTIVE_DOTS_HANDLER",
      removeSelected: "REMOVE_SELECTED",
      addSelected: "ADD_SELECTED",
      updateLines: "UPDATE_LINES",
      removeLine: "REMOVE_LINE"
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
      const dotID = e.target.id();
      const dot = this.dots[this.config.id].find(dot => dot.id === dotID);

      const dotObj = {
        target: e.target,
        parent: this.config.id,
        dot: dotID,
        index
      };

      if (dot.line) {
        this.removeLine(dot.line);
        return;
      } else if (this.selectedDot) {
        if (this.selectedDot.dot === dotID) {
          this.removeSelected();
        } else {
          this.$emit("clickOnDot", dotObj);
        }
      } else {
        this.addSelected(dotObj);
      }

      this.changeDotsState({
        id: this.config.id,
        dotIndex: index,
        state: !dot.active
      });

      this.$forceUpdate();
    },
    dragHandler() {
      const lines = this.lines.map(line => {
        return {
          ...line,
          from: line.dots[0].target.absolutePosition(),
          to: line.dots[1].target.absolutePosition()
        };
      });
      this.updateLines(lines);
    }
  },
  computed: {
    ...mapState("dragBox", {
      dots: "DOTS",
      selectedDot: "SELECTED",
      lines: "LINES"
    })
  }
};
</script>
