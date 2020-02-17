<template>
  <div class="konva-wrapper">
    <button class="btn add-rect-btn" @click="makeRect()">ADD Rect</button>
    <button class="btn delete-rect-btn" @click="deleteRects()">DELETE Rect</button>
    <p class="btn counter">rects on board: {{rects.length}}</p>
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
          @clickOnDot="makeLine"
          @clickOnRect="clickOnRect"
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
      addLine: "ADD_LINE",
      updateRects: "UPDATE_RECTS",
      removeLine: "REMOVE_LINE"
    }),

    makeRect(x = 20, y = 20) {
      this.addRect({
        ...rectConfig,
        id: uuid.randomUUID(8),
        active: false,
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
    },
    deleteRects() {
      let nRects = [];

      this.rects.map(rect => {
        if (rect.active) {
          this.dots[rect.id].map(dot => {
            dot.line ? this.removeLine(dot.line) : null;
          });
        } else nRects.push(rect);
      });

      this.updateRects(nRects);
    },
    clickOnRect({ target }) {
      const currentRect = this.rects.find(rect => rect.id === target.id());
      currentRect.active = !currentRect.active;
    }
  },
  computed: {
    ...mapState("dragBox", {
      rects: "RECTS",
      selectedDot: "SELECTED",
      lines: "LINES",
      dots: "DOTS"
    })
  }
};
</script>

<style scoped>
.btn {
  position: absolute;
  top: 20px;
  font-size: 18px;
}
.add-rect-btn {
  left: 50px;
}
.delete-rect-btn {
  left: 200px;
}

.counter{
  top: 30px;
  left: 50px;
}
</style>
