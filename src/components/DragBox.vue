<template>
  <v-stage :config="konvaKonfig">
    <v-layer>
      <DragRect v-for="rect in rects" :key="rect.id" :config="rect" />
    </v-layer>
  </v-stage>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ShortUniqueId from "short-unique-id";
import CONSTANTS from '../const';
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
      addRect: "ADD_RECT"
    }),

    makeRect(x = 200, y = 100) {
      this.addRect({
        ...rectConfig,
        id: uuid.randomUUID(8),
        x,
        y
      });
    }
  },
  computed: {
    ...mapState("dragBox", {
      rects: "RECTS"
    })
  }
};
</script>

<style scoped>
</style>
