const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

const todos = [
    {
        todoId: 0,
        todoText: 'Go to the store',
        todoComplete: false,
        category: 'Chore',
        dueDate: '01-05-2024'
    },
    {
        todoId: 1,
        todoText: 'Mow the lawn',
        todoComplete: true,
        category: 'Chore',
        dueDate: '06-15-2024'
    },
    {
        todoId: 2,
        todoText: 'Create my todo project',
        todoComplete: false,
        category: 'Homework',
        dueDate: '09-10-2024'
    },
    {
        todoId: 3,
        todoText: 'Watch movie with wife',
        todoComplete: false,
        category: 'Fun',
        dueDate: '09-14-2024'
    },
    {
        todoId: 4,
        todoText: 'Go camping over labor day weekend',
        todoComplete: false,
        category: 'Fun',
        dueDate: '09-01-2024'
    },
]


const addTodo = () => {
    const todoText = todoInput.value.trim();

    if (todoText) {
        const newTodo = {
            todoId: todos.length,
            todoText: todoText,
        }

        todos.push(newTodo);
        console.log(todos);

        todoInput.value = '';
        renderTodos();
    }
}

const renderTodos = () => {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = todo.todoText;

        todoList.appendChild(listItem);
    })
}

const deleteTodo = () => {

}

addBtn.addEventListener('click', addTodo);

renderTodos();