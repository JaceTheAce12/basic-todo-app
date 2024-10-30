# API Endpoints Documentation

## Table of Contents
- [Get Todos Endpoint](#get-todos-endpoint)
- [Post Todo Endpoint](#post-todo-endpoint)
- [Put Todo Endpoint](#put-todo-endpoint)
- [Delete Todo Endpoint](#delete-todo-endpoint)
- [Get Todos For A Category Endpoint](#get-todos-for-a-category-endpoint)
- [Get All Categories Endpoint](#get-all-categories-endpoint)
- [Post Categories Endpoint](#post-categories-endpoint)
- [Put Categories Endpoint](#put-categories-endpoint)
- [Delete Categories Endpoint](#delete-categories-endpoint)

## Get Todos Endpoint

### Get All Todos
- **URL:** `/todos`
- **Method:** `GET`
- **Description:** Get's all todos in the array
- **Response:**

    ```json
    [
        {
            "todoId": "0",
            "todoText": "Go to the store",
            "todoComplete": false,
            "category": "Shopping",
            "dueDate": "01-05-2024"
        },
        ...
    ]
    ```

## Post Todo Endpoint

### Create a new todo
- **URL:** `/todos`
- **Method:** `POST`
- **Description:** Adds a new todo item.
- **Request Body:**
    ```json
    {
        "todoText": "Complete assignment",
        "todoComplete": false,
        "category": "School",
        "dueDate": "2024-10-14"
    }
    ```
    **Response:**

    ```json
    {
        "todoId": 2,
        "todoText": "Complete assignment",
        "todoComplete": false,
        "category": "School",
        "dueDate": "2024-10-14"
    }
    ```

## Put Todo Endpoint

### Update todo
- **URL:** `/todos/:todoId`
- **Method:** `PUT`
- **Description:** Updates a todo by the todoId.
- **Request Body:**
    ```json
    {
        "todoText": "Buy milk",
        "todoComplete": true,
        "category": "home",
        "dueDate": "2024-10-16"
    }
    ```
    **Response:**

    ```json
    {
       "todoId": 2,
       "todoText": "Buy milk",
       "todoComplete": true,
       "category": "home",
       "dueDate": "2024-10-16"
    }
    ```

## Delete Todo Endpoint

### Delete Todo
- **URL:** `/todos/:todoId`
- **Method:** `DELETE`
- **Description:** Deletes a todo item by todoId.
- **Request Params:**
    todoId: The ID of the todo to delete.
- **Response:**

    ```json
    {
        "todoId": 1,
        "todoText": "Buy groceries",
        "todoComplete": true,
        "category": "home",
        "dueDate": "2024-10-15"
    }
    ```

## Get Todos For A Category Endpoint

### Todo = Category
- **URL:** `/todos/category/:category`
- **Method:** `GET`
- **Description:** Gets all todo items associated with a specific category.
-**Request Params:**
    category: The category name to filter the todos.
- **Response:**

    ```json
    {
        "todoId": 0,
        "todoText": "Complete assignment",
        "todoComplete": false,
        "category": "School",
        "dueDate": "2024-10-14"
    }
    ```

## Get All Categories Endpoint

### Categories
- **URL:** `/categories`
- **Method:** `GET`
- **Description:** Gets all of the unique todo categories
- **Request Body:**

    ```json
    [
        "Personal",
        "Shopping",
        "Projects",
        "Personal"
    ]
    ```

## Post Categories Endpoint

### Add Category
- **URL:** `/categories`
- **Method:** `POST`
- **Description:** Adds a new category 
- **Request Body:**

    ```json
    {
        "category": "work"
    }
    ```

    **Response:**

    ```json
    {
        "work"
    }
    ```

## Put Categories Endpoint

### Update Category
- **URL:** `/categories/:todoId/:category`
- **Method:** `PUT`
- **Description:** Updates the category of all todo items in a specific category
- **Request Params:** todoId: The ID of the todo item.
    category: The current category name.

    **Request Body:**

    ```json
    {
        "newCategory": "personal"
    }
    ```

    **Request Body:**

    ```json
    [
        {
            "todoId": 0,
            "todoText": "Complete assignment",
            "todoComplete": false,
            "category": "Personal",
            "dueDate": "2024-10-14"
        }
    ]
    ```

## Delete Categories Endpoint

### Delete Category
- **URL:** `/categories/:todoId/:category`
- **Method:** `DELETE`
- **Description:** Deletes a category
- **Request Params:** category: The category name to delete.

    **Request Body:**

    ```json
    [
        {
            "todoId": 0,
            "todoText": "Complete assignment",
            "todoComplete": false,
            "category": null,
            "dueDate": "2024-10-14"
        }
    ]
    ```