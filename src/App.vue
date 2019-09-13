<template>
  <v-app id="app" class="container">
    <main class="container__main">
      <section>
        <TodoStats
                class="list-stats"
                :deal="allTodoList.length"
                :dealLeft="unCompletedTodoList.length"
        ></TodoStats>
        <button
                type="button"
                title="clear completed"
                class="btn reset-btn color-pink"
                @click="clearCompleted"
        >
          clear completed
        </button>
      </section>
      <section class="container__main__list">
        <h1 class="title">Todo list</h1>
        <div class="todo-item-wrapper">
          <TodoInput v-model="newTodo"
                     :value="newTodo"
                     :editable="true"
                     @onEnterSave="addToDo"
          />
          <button
                  type="submit"
                  title="ADD TO LIST"
                  class="btn add-btn color-white"
                  @click="addToDo"
          >ADD TO LIST</button>
        </div>
          <ul>
            <li v-for="(item, key) in actualList" v-bind:key="key">
              <TodoItem :data="item"></TodoItem>
            </li>
          </ul>
      </section>
      <section class="progress-bar">
        <h5>PROGRESS</h5>
        <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="progressValue"
                color="teal"
        >
          {{ progressValue }}
        </v-progress-circular>
        <button
                type="button"
                title="complete all"
                class="btn complete-btn color-blue"
                @click="completeAll"
        >
          complete all
        </button>
      </section>
    </main>
    <footer>
      <ul class="footer__filter-item">
        <li
                v-for="(item, key) in filters"
                v-bind:key="key"
                :class="{'checked color-blue': checked === item }"
                @click="checked = item"
        >
          <label :for="item">
            <input type="radio" :id="item" :value="item" v-model="checked">
            {{ item }}
          </label>
        </li>
      </ul>
    </footer>
  </v-app>
</template>

<script>
import TodoInput from './components/TodoInput.vue';
import TodoItem from './components/TodoItem.vue';
import TodoStats from './components/TodoStats.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    TodoInput, TodoItem, TodoStats
  },
  data() {
    return {
      newTodo: '',
      checked: 'all',
      filters: ['all', 'completed', 'uncompleted'],
    }
  },
  methods: {
    ...mapActions(['addItem', 'clearCompleted', 'completeAll']),
    addToDo() {
      if (this.newTodo.length < 1) {
        return
      } else {
        const todo = {
          title: this.newTodo,
          editable: true,
          completed: false,
          id: this.idForItem
        };
        this.addItem(todo);
        this.newTodo = '';
      }
    }
  },
  computed: {
    ...mapState(['todoList']),
    ...mapGetters(['allTodoList', 'completedTodoList', 'unCompletedTodoList']),
    idForItem() {
      return  this.todoLength + 1
    },
    todoLength() {
      return this.todoList.length
    },
    actualList() {
      switch (this.checked) {
        case 'completed':
          return this.completedTodoList;
        case 'uncompleted':
          return this.unCompletedTodoList;
        default:
          return this.allTodoList
      }
    },
    progressValue() {
      const calc = this.completedTodoList.length * 100 / this.allTodoList.length;
      return this.completedTodoList.length > 0 ? calc.toFixed(0) : 0
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 5%;
    background: white;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .v-application--wrap {
      /*if need to fix footer at the bottom of the screen*/
      /*min-height: 100vh;*/
      min-height: 50vh;
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  /***************** colors *****************/
  .color-blue {
    color: #283593;
  }
  .color-pink {
    color: #D81B60;
  }
  .color-white {
    color: white;
  }
  /*************** end colors **************/
  /*************** transition **************/
  /*TODO:
     add transition for todos list (v-show)*/
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }
  /*************** end transition **************/
  .container {
    max-width: 1185px;
    max-height: 80vh;
    &__main {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      justify-content: space-evenly;
      &__list {
        flex-basis: 50%;
      }
    }
  }
</style>

<style lang="scss" scoped>
  input[type=radio] {
    opacity: 0;
  }
  .progress-bar,
  .list-stat {
    flex-basis: auto;
  }
  .btn {
    margin-top: 20px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    height: 36px;
    min-width: 125px;
    padding: 0 16px;
    border-radius: 3px;
    transition: background 0.2s cubic-bezier(0.4, 0, 0.6, 1);
    white-space: nowrap;
  }
  .reset-btn {
    background: white;
    &:hover {
      background: #fdf1f6;
    }
  }
  .complete-btn {
    background: white;
    &:hover {
      background: #ecedf6;
    }
  }
  .add-btn {
    background: #283593;
    margin-left: 20px;
    margin-top: 0;
    &:hover {
      background: #8289c0;
    }
  }
  .todo-item-wrapper,
  .progress-bar {
    display: flex;
  }
  .progress-bar {
    flex-direction: column;
    align-items: center;
    .v-progress-circular {
      margin-top: 20px;
    }
  }
  .footer {
    &__filter-item {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      li {
        width: 200px;
        padding: 10px 0;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        label {
          width: 200px;
          cursor: pointer;
          text-transform: uppercase;
          font-size: 14px;
        }
        &.checked {
          border-bottom: 3px solid #283593;
        }
      }
    }
  }
</style>
