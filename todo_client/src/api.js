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
