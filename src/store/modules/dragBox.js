const state = {
    RECTS: [],
    DOTS: {}
}

const getters = {

}

const mutations = {
    ADD_RECT(state, payload) {
        state.RECTS.push(payload)
    },
    ADD_DOTS(state, payload) {
        state.DOTS[payload.id] = payload.dots;
    },
    ACTIVE_DOTS_HANDLER(state, payload) {
        state.DOTS[payload.id][payload.dotId].active = payload.state;

        console.log(state.DOTS[payload.id][payload.dotId].active);
        
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}