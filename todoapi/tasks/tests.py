from rest_framework.test import APIClient, APITestCase
from django.test import TestCase
from django.urls import reverse, resolve
from .models import Task
from .views import TaskListCreateView, TaskUpdateDeleteView


class TaskViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.task_data = {'description': 'Test task', 'completed': False}
        self.response = self.client.post('/api/tasks/', self.task_data, format='json')
        self.task = Task.objects.get(id=self.response.data['id'])

    def test_create_task(self):
        self.assertEqual(self.response.status_code, 201)
        self.assertEqual(self.task_data['description'], self.task.description)
        self.assertEqual(self.task_data['completed'], self.task.completed)

    def test_get_tasks(self):
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['description'], self.task.description)

    def test_update_task(self):
        new_data = {'description': 'Updated task', 'completed': True}
        response = self.client.put(f'/api/tasks/{self.task.id}/', new_data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(new_data['description'], response.data['description'])
        self.assertEqual(new_data['completed'], response.data['completed'])

    def test_delete_task(self):
        response = self.client.delete(f'/api/tasks/{self.task.id}/')
        self.assertEqual(response.status_code, 204)

    def test_create_task_with_empty_description(self):
        task_data = {'description': '', 'completed': False}
        response = self.client.post('/api/tasks/', task_data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_get_non_existent_task(self):
        response = self.client.get('/api/tasks/999/')
        self.assertEqual(response.status_code, 405)

    def test_update_non_existent_task(self):
        new_data = {'description': 'Updated task', 'completed': True}
        response = self.client.put('/api/tasks/999/', new_data, format='json')
        self.assertEqual(response.status_code, 404)

    def test_delete_non_existent_task(self):
        response = self.client.delete('/api/tasks/999/')
        self.assertEqual(response.status_code, 404)


class TaskModelTest(TestCase):
    def setUp(self):
        self.task = Task.objects.create(description='Test task', completed=False)

    def test_task_creation(self):
        self.assertTrue(isinstance(self.task, Task))
        self.assertEqual(self.task.__str__(), self.task.description)


class UrlTest(TestCase):
    def test_task_list_url(self):
        url = reverse('task-list-create')
        self.assertEqual(resolve(url).func.view_class, TaskListCreateView)

    def test_task_detail_url(self):
        url = reverse('task-update-delete', args=[1])
        self.assertEqual(resolve(url).func.view_class, TaskUpdateDeleteView)
