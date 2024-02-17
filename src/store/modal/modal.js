export default {
    namespaced: true,

    state: {
        component: '',
        componentData: {},
        // positionCenter: true,
        positionCenter: false,
    },

    mutations: {
        open(state, payload) {
            state.component = payload.component;
            state.componentData = payload.componentData;
            state.positionCenter = payload.positionCenter;
        },

        close(state) {
            state.component = null;
            state.componentData = {};
            state.positionCenter = false;
        },
    },
}