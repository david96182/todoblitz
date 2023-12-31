<template>
  <section class="todoapp" v-cloak>
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
    </header>
    <section class="main" v-show="todos.length">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li class="todo" v-for="todo in filteredTodos" :key="todo.id" :class="{completed: todo.completed, editing: todo == editedTodo}">
          <div class="view">
            <input class="toggle" @click="updateStatus(todo)" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{todo.description}}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input class="edit" type="text" v-model="todo.description" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong v-text="remaining"></strong> {{pluralize('item', remaining)}} left
      </span>
      <ul class="filters">
        <li><a href="#/all" :class="{selected: visibility == 'all'}">All</a></li>
        <li><a href="#/active" :class="{selected: visibility == 'active'}">Active</a></li>
        <li><a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a></li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
        Clear completed
      </button>
    </footer>
  </section>
</template>
<script>
import { getTodos, addNewTodo, updateTodo, deleteTodo } from '../api.js';

var filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
};

export default {
  name: 'TasksList',
  data() {
    return {
      // todos
      todos: [''],
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    }
  },
  watch: {
    '$route.name': function (newVisibility) {
      this.visibility = newVisibility;
    }
  },
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos);
    },
    remaining: function () {
      return filters.active(this.todos).length;
    },
    allDone: {
      get: function () {
        return this.remaining === 0;
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value;
          updateTodo(todo)
        });
      }
    }
  },
  methods: {
    getData() {
      getTodos().then(todos => {
        this.todos = todos;
      });
    },

    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }

      addNewTodo(value).then(todo => {
        this.todos.push(todo);
        this.newTodo = '';
      });
    },

    removeTodo: function (todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
      deleteTodo(todo)
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.description;
      this.editedTodo = todo;
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.description = todo.description.trim();
      if (!todo.description) {
        this.removeTodo(todo);
        return;
      }
      updateTodo(todo)
    },

    cancelEdit: function (todo) {
      this.editedTodo = null;
      todo.description = this.beforeEditCache;
    },

    updateStatus: function(todo) {
      todo.completed = !todo.completed
      updateTodo(todo)
    },

    removeCompleted: function () {
      let todelete = filters.completed(this.todos)
      this.todos = filters.active(this.todos);
      todelete.forEach(function (todo) {
          deleteTodo(todo)
        });
    },

    pluralize: function (word, count) {
      return word + (count === 1 ? '' : 's');
    },
  },
  created() {
    // Fetch todos on page load
    this.getData();
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
}
</script>
<style>
@import '@/assets/styles/index.css';
[v-cloak] { display: none; }
</style>
