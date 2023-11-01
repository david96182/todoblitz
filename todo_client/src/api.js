// api.js
import axios from 'axios';

export function getTodos() {
  return axios.get('http://localhost:8000/api/tasks/')
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function addNewTodo(description) {
  return axios.post('http://localhost:8000/api/tasks/', {
    description: description,
    completed: false
  })
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function updateTodo(todo) {
  return axios.put(`http://localhost:8000/api/tasks/${todo.id}/`, {
    description: todo.description,
    completed: todo.completed
  })
    .then(response => response.data)
    .catch(error => console.log(error));
}

export function deleteTodo(todo) {
  return axios.delete(`http://localhost:8000/api/tasks/${todo.id}/`)
    .then(response => response.data)
    .catch(error => console.log(error));
}
