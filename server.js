const express = require('express');
const app = express();
const port = 5000;
const todos = require('./public/modules/todos');

app.use(express.json());
app.use(express.static('public'));

app.get('/todos', (req, res) => {
    res.send(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        todoId: todos.length,
        todoText: req.body.todoText,
        todoComplete: req.body.todoComplete,
        category: req.body.category,
        dueDate: req.body.dueDate
    };
    todos.push(newTodo);
    res.send(newTodo);
});

app.put('/todos/:todoId', (req, res) => {
    const todoId = parseInt(req.params.todoId);
    const todo = todos.find(todo => todo.todoId === todoId);

    todo.todoText = req.body.todoText;
    todo.todoComplete = req.body.todoComplete;
    todo.category = req.body.category;
    todo.dueDate = req.body.dueDate;
    res.send(todo);
});

app.delete('/todos/:todoId', (req, res) => {
    const todoId = parseInt(req.params.todoId);
    const todoIndex = todos.findIndex(todo => todo.todoId === todoId);

    if (todoIndex > -1) {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.send(deletedTodo);
    }
});

app.get('/todos/category/:category', (req, res) => {
    const category = req.params.category;
    const categoryTodos = todos.filter(todo => todo.category === category);
    res.send(categoryTodos);
});

app.get('/categories', (req, res) => {
    const categories = [...new Set(todos.map(todo => todo.category))];  
    res.send(categories);
});

app.post('/categories', (req, res) => {
    const category = req.body.category;
    res.send(category);
});

app.put('/categories/:todoId/:category', (req, res) => {
    const todoId = parseInt(req.params.todoId);
    const category = req.params.category;
    const todo = todos.find(todo => todo.todoId === todoId && todo.category === category);

    if (todo) {
        todo.category = req.body.newCategory;
        res.send(todo);
    } else {
        res.send('Category not found');
    }
});

app.delete('/categories/:category', (req, res) => {
    const category = req.params.category;

    todos.forEach(todo => {
        if (todo.category === category) {
            delete todo.category;
        }
    });

    res.send(todos);
});

app.put('/todos/:todoId/:dueDate', (req, res) => {
    const dueDate = req.params.dueDate;
    const newDueDate = req.body.newDueDate;
    const todosWithDueDate = todos.filter(todo => todo.dueDate === dueDate);

    todosWithDueDate.forEach(todo => {
        todo.dueDate = newDueDate;
    });

    res.send(todosWithDueDate);
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});