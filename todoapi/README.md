# Todo Api

This is a backend API for a Todo List application developed with Django and Django REST framework. The API allows users to create, retrieve, update, and delete todos.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

```
SECRET_KEY=<Your-Secret-Key>
DEBUG=0
```

In the project folder there is a .env.example that has the exact structure. You could rename the file to .env(removing the .example) and set your specific settings.

## Project Setup

You must have Python installed on your machine. You can download it and follow the instructions on the

Before running the project, you need to install the dependencies. You can do this by running:

```
pip install -r requirements.txt
```

To start the server, you can run:

```
python manage.py runserver
```

## API Endpoints

The API has two main endpoints:

- `GET /tasks/`: List all todos.
- `POST /tasks/`: Create a new todo.
- `GET /tasks/<id>/`: Retrieve a specific todo.
- `PUT /tasks/<id>/`: Update a specific todo.
- `DELETE /tasks/<id>/`: Delete a specific todo.

## Models

The `Task` model represents a todo item. It has the following fields:

- `id`: The unique identifier of the todo.
- `description`: The description of the todo.
- `completed`: A boolean field indicating whether the todo has been completed.
- `created_at`: The timestamp when the todo was created.

## Views

The `TaskListCreateView` view allows users to list all todos and create a new todo. It uses the `TaskSerializer` to serialize and deserialize the `Task` model.

The `TaskUpdateDeleteView` view allows users to update and delete a specific todo. It also uses the `TaskSerializer` to serialize and deserialize the `Task` model.

## Serializers

The `TaskSerializer` is used to serialize and deserialize the `Task` model. It includes all fields of the `Task` model.

## Testing

To run the tests, you can use the `python manage.py test` command.
