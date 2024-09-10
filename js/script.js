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
            todoComplete: false,
        }

        todos.push(newTodo);
        console.log(todos);

        todoInput.value = '';
        renderTodos();
    }
}

const renderTodos = () => {
    todoList.innerHTML = '';

    todos.forEach((todo, i) => {
        const listItem = document.createElement('li');
        listItem.textContent = todo.todoText;
        listItem.classList.add('todo-item', 'p-4', 'bg-white', 'rounded-lg', 'shadow-md', 'flex', 'justify-between', 'items-center', 'mb-2', 'text-gray-800', 'hover:bg-gray-100', 'hover:cursor-pointer');

        if (todo.todoComplete) {
            listItem.style.textDecoration = 'line-through';
        } else {
            listItem.style.textDecoration = 'none';
        }

        listItem.addEventListener('click', () => {
            todo.todoComplete = !todo.todoComplete;
            renderTodos();
        });

        const deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash" style="color: red; cursor: pointer;"></i>';
        deleteBtn.style.marginLeft = '8px';
        deleteBtn.addEventListener('click', () => deleteTodo(i));

        const editBtn = document.createElement('span');
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: blue; cursor: pointer;"></i>';
        editBtn.style.marginRight = '8px';
        editBtn.addEventListener('click', () => editTodo(i));

        const rightContent = document.createElement('div');
        rightContent.classList.add('flex', 'justify-between');

        rightContent.appendChild(editBtn);
        rightContent.appendChild(deleteBtn);
        listItem.appendChild(rightContent);
        todoList.appendChild(listItem);

        todoCounter();
    })
}

const deleteTodo = (index) => {
    todos.splice(index, 1);
    renderTodos();
}

const editTodo = (index) => {
    const currentText = todos[index].todoText;
    const todoItem = todoList.children[index];

    const editInput = document.createElement('input');
    editInput.value = currentText;
    editInput.type = 'text';
    editInput.classList.add('border', 'border-gray-300', 'p-2', 'rounded-lg', 'w-full', 'mr-2', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.backgroundColor = 'green';
    saveBtn.classList.add('.bg-green-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-green-600', 'ml-2');

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.backgroundColor = 'gray';
    cancelBtn.style.marginLeft = '8px';
    cancelBtn.classList.add('bg-gray-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-gray-600', 'ml-2');

    const rightContent = document.createElement('div');
    rightContent.classList.add('flex', 'justify-between');


    todoItem.innerHTML = '';
    rightContent.appendChild(saveBtn);
    rightContent.appendChild(cancelBtn);
    todoItem.appendChild(editInput);
    todoItem.appendChild(rightContent);

    saveBtn.addEventListener('click', () => {
        if (editInput.value.trim() !== '') {
            todos[index].todoText = editInput.value.trim();
            renderTodos();
        }
    });

    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (editInput.value.trim() !== '') {
                todos[index].todoText = editInput.value.trim();
                renderTodos();
            }
        }
    })

    cancelBtn.addEventListener('click', () => renderTodos());
}

const todoCounter = () => {
    const completedTodos = document.querySelector('.completed-todos');
    const completedTodo = todos.filter(todo => !todo.todoComplete).length;
    completedTodos.textContent = `You have ${completedTodo} ${completedTodo === 1 ? 'todo' : 'todos'} done.`
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTodo();
        console.log('pressed');
    }
});

renderTodos();