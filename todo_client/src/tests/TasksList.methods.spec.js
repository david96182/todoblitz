import { shallowMount } from '@vue/test-utils';
import TasksList from '../components/TasksList.vue';
import { getTodos, addNewTodo, deleteTodo, updateTodo  } from '../api.js';


jest.mock('../api.js', () => ({
  getTodos: jest.fn(),
  addNewTodo: jest.fn(),
  deleteTodo: jest.fn(),
  updateTodo: jest.fn()
}));

describe('TasksList - Methods', () => {
  beforeEach(() => {
    getTodos.mockClear();
    addNewTodo.mockClear();
    deleteTodo.mockClear();
    updateTodo.mockClear();
  });

  it('adds a new todo', async () => {
    getTodos.mockResolvedValue([]);
    addNewTodo.mockResolvedValue({description: 'New Todo'})
    const wrapper = shallowMount(TasksList);
    const newTodoValue = 'New Todo';

    wrapper.setData({ newTodo: newTodoValue });

    await wrapper.vm.addTodo();

    expect(wrapper.vm.todos).toContainEqual({description: 'New Todo'});
    expect(wrapper.vm.newTodo).toBe('');
  });

  it('removes a todo', async () => {
    getTodos.mockResolvedValue([]);
    deleteTodo.mockResolvedValue({})
    const wrapper = shallowMount(TasksList);
    const todos = ['Todo 1', 'Todo 2', 'Todo 3'];
    wrapper.setData({ todos });

    const todoToRemove = 'Todo 2';

    await wrapper.vm.removeTodo(todoToRemove);

    expect(wrapper.vm.todos).not.toContain(todoToRemove);
  });

  it('edits a todo', async () => {
    updateTodo.mockResolvedValue({ id: 2, description: 'Updated Todo' })
    const wrapper = shallowMount(TasksList);
    const todos = [
      { id: 1, description: 'Todo 1' },
      { id: 2, description: 'Todo 2' },
      { id: 3, description: 'Todo 3' },
    ];
    wrapper.setData({todos});

    const todoToEdit = todos[1];
    const updatedTodoDescription = 'Updated Todo';

    wrapper.vm.editTodo(todoToEdit);

    wrapper.vm.editedTodo.description = updatedTodoDescription;

    await wrapper.vm.doneEdit(todoToEdit);

    expect(wrapper.vm.editedTodo).toBeNull();
    expect(todoToEdit.description).toBe(updatedTodoDescription);
  });

  it('does not edit a todo when doneEdit is cancelled', async () => {
    updateTodo.mockResolvedValue({ id: 2, description: 'Updated Todo' })
    const wrapper = shallowMount(TasksList);
    const todos = [
      { id: 1, description: 'Todo 1' },
      { id: 2, description: 'Todo 2' },
      { id: 3, description: 'Todo 3' },
    ];
    wrapper.setData({ todos });

    const todoToEdit = todos[1];
    const updatedTodoDescription = 'Updated Todo';

    wrapper.vm.editTodo(todoToEdit);

    wrapper.vm.editedTodo.description = updatedTodoDescription;

    await wrapper.vm.cancelEdit(todoToEdit);

    // Check that the editedTodo is null
    expect(wrapper.vm.editedTodo).toBeNull();

    // Check that the todo's description has not been updated
    expect(todoToEdit.description).toBe('Todo 2');
  });
});
