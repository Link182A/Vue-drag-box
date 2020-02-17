<template>
  <div class="konva-wrapper">
    <button class="add-rect-btn">ADD Rect</button>
    <v-stage :config="konvaKonfig" class="konva">
      <v-layer>
        <v-line
          v-for="line in lines"
          :key="line.id"
          :config="{
          x:0,
          y:0,
          strokeWidth: 1,
          stroke: '#4472c4',
          points:[line.from.x, line.from.y, line.to.x, line.to.y]
      }"
        />
        <DragRect
          v-for="rect in rects"
          :key="rect.id"
          :config="rect"
          @clickOnDot="makeLine($event)"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ShortUniqueId from "short-unique-id";
import CONSTANTS from "../const";
import DragRect from "./DragRect";

const uuid = new ShortUniqueId();

const rectConfig = {
  width: CONSTANTS.RECT_SIZE,
  height: CONSTANTS.RECT_SIZE,
  fill: CONSTANTS.BLUE_COLOR
};

export default {
  components: {
    DragRect
  },
  mounted() {
    this.makeRect(20, 20);
    this.makeRect(200, 20);
  },
  data() {
    return {
      konvaKonfig: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  },
  methods: {
    ...mapMutations("dragBox", {
      addRect: "ADD_RECT",
      removeSelected: "REMOVE_SELECTED",
      addLine: "ADD_LINE"
    }),

    makeRect(x = 200, y = 100) {
      this.addRect({
        ...rectConfig,
        id: uuid.randomUUID(8),
        x,
        y
      });
    },

    makeLine(data) {
      const line = {
        id: uuid.randomUUID(8),
        from: data.target.absolutePosition(),
        to: this.selectedDot.target.absolutePosition(),
        dots: [data, this.selectedDot]
      };

      const dotsIds = [
        { ...data, id: data.dot },
        { ...this.selectedDot, id: this.selectedDot.dot }
      ];

      this.addLine({ line, dotsIds });

      this.removeSelected();
    }
  },
  computed: {
    ...mapState("dragBox", {
      rects: "RECTS",
      selectedDot: "SELECTED",
      lines: "LINES"
    })
  }
};
</script>

<style scoped>
.add-rect-btn{
  position: absolute;
  top: 20px;
  left: 50px;
}
</style>
