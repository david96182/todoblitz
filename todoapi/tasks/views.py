from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from .models import Task
from .serializers import TaskSerializer


class TaskListCreateView(ListAPIView, CreateAPIView):
    """
    List and Create task view
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskUpdateDeleteView(UpdateAPIView, DestroyAPIView):
    """
    Update and Delete task view
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer 
