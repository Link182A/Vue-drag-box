import Vue from 'vue';
import Vuex from 'vuex';
import dragBox from './modules/dragBox';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        dragBox
    }
})