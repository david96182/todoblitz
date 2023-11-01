import { shallowMount } from '@vue/test-utils';
import TasksList from '../components/TasksList.vue';
import { getTodos } from '../api.js';


jest.mock('../api.js', () => ({
  getTodos: jest.fn(),
}));

describe('TasksList', () => {
  beforeEach(() => {
    getTodos.mockClear();
  });

  it('renders correctly', () => {
    getTodos.mockResolvedValue([]);
    const wrapper = shallowMount(TasksList);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.todoapp').exists()).toBe(true);
    expect(wrapper.find('.header').exists()).toBe(true);
    expect(wrapper.find('.main').exists()).toBe(true);
    expect(wrapper.find('.footer').exists()).toBe(true);
  });

  it('fetches todos on created', () => {
    const getDataMock = jest.spyOn(TasksList.methods, 'getData');
    const wrapper = shallowMount(TasksList);
    expect(getDataMock).toHaveBeenCalled();
    getDataMock.mockRestore();
  });

});
