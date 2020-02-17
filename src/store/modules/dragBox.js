const state = {
    RECTS: [],
    DOTS: {},
    SELECTED: null,
    LINES: []
}

const getters = {

}

const mutations = {
    ADD_RECT(state, payload) {
        state.RECTS.push(payload)
    },
    UPDATE_RECTS(state, payload){
        state.RECTS = payload;
    },
    ADD_DOTS(state, payload) {
        state.DOTS[payload.id] = payload.dots;
    },
    ACTIVE_DOTS_HANDLER(state, payload) {
        const activeDot = state.DOTS[payload.id][payload.dotIndex];
        activeDot.active = payload.state;
    },
    ADD_SELECTED(state, payload) {
        state.SELECTED = payload
    },
    REMOVE_SELECTED(state) {
        state.SELECTED = null;
    },
    ADD_LINE(state, {line,dotsIds}){
        state.LINES.push(line);
        dotsIds.forEach(dot => {
            state.DOTS[dot.parent][dot.index].line = line.id
        });
    },
    UPDATE_LINES(state, payload){
        state.LINES = payload;
    },
    REMOVE_LINE(state, payload){

        const line = state.LINES.find(line=>line.id===payload);
        const index = state.LINES.indexOf(line);
        
        line.dots.forEach(dot=>{
            const current = state.DOTS[dot.parent][dot.index]
            current.active = false;
            delete current.line;
        })
        state.LINES.splice(index, 1);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}