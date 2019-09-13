import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    todoList: []
};

const mutations = {
    ADD_ITEM (state, data) {
        state.todoList.unshift(data);
    },
    SAVE_CHANGES (state, data) {
        const elem = state.todoList.find(item => item.id === data.id);
        elem.title = data.val;
    },
    DELETE_ITEM (state, data) {
        const arr = state.todoList;
        const elem = arr.find(item => item.id === data);
        const index = arr.indexOf(elem);
        arr.splice(index, 1);
    },
    MARK_COMPLETE (state, data) {
        const elem = state.todoList.find(item => item.id === data.id);
        elem.completed = data.val;
    },
    CLEAR_COMPLETED (state) {
        state.todoList = state.todoList.filter(obj => {
            return obj.completed !== true
        });
    },
    COMPLETE_ALL (state) {
        state.todoList.forEach(item => {
            item.completed = true
        })
    }
};

const actions = {
    addItem: ({ commit }, data) => commit('ADD_ITEM', data),
    saveChanges: ({ commit }, data) => commit('SAVE_CHANGES', data),
    deleteItem: ({ commit }, data) => commit('DELETE_ITEM', data),
    markComplete: ({ commit }, data) => commit('MARK_COMPLETE', data),
    clearCompleted: ({ commit }) => commit('CLEAR_COMPLETED'),
    completeAll: ({ commit }) => commit('COMPLETE_ALL'),
};

const getters = {
    allTodoList: state => state.todoList,
    completedTodoList: state => state.todoList.filter(item => item.completed === true),
    unCompletedTodoList: state => state.todoList.filter(item => item.completed === false)
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
