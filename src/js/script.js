const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-todos');
const selectCategory = document.querySelector('.select-category');
const selectDate = document.querySelector('.pick-date');

let todos = [
    {
        todoId: 0,
        todoText: 'Go to the store',
        todoComplete: false,
        category: 'Shopping',
        dueDate: '01-05-2024'
    },
    {
        todoId: 1,
        todoText: 'Mow the lawn',
        todoComplete: true,
        category: 'Work',
        dueDate: '06-15-2024'
    },
    {
        todoId: 2,
        todoText: 'Create my todo project',
        todoComplete: false,
        category: 'Projects',
        dueDate: '09-10-2024'
    },
    {
        todoId: 3,
        todoText: 'Watch movie with wife',
        todoComplete: false,
        category: 'Personal',
        dueDate: '09-14-2024'
    },
    {
        todoId: 4,
        todoText: 'Go camping over labor day weekend',
        todoComplete: false,
        category: 'Personal',
        dueDate: '09-01-2024'
    },
]

const addTodo = () => {
    const todoText = todoInput.value.trim();
    const categoryText = selectCategory.options[selectCategory.selectedIndex].text;
    const datePicker = selectDate.value;

    if (todoText && categoryText && datePicker) {
        const newTodo = {
            todoId: todos.length,
            todoText: todoText,
            todoComplete: false,
            category: categoryText,
            dueDate: datePicker
        }

        todos.push(newTodo);
        console.log(todos);

        todoInput.value = '';
        selectCategory.selectedIndex = 0;
        selectDate.value = '';
        renderTodos();
    }
}

const renderTodos = () => {
    todoList.innerHTML = '';

    todos.forEach((todo, i) => {
        const listItemContainer = document.createElement('div');
        listItemContainer.classList.add('todo-item', 'p-4', 'bg-white', 'rounded-lg', 'shadow-md', 'flex', 'flex-row', 'justify-between', 'items-center', 'mb-2', 'text-gray-800', 'hover:bg-gray-100', 'cursor-pointer');

        const listItem = document.createElement('li');
        listItem.textContent = todo.todoText;
        listItem.classList.add('list-item');

        if (todo.todoComplete) {
            listItem.classList.add('line-through');
        } else {
            listItem.classList.remove('line-through');
        }

        listItemContainer.addEventListener('click', () => {
            todo.todoComplete = !todo.todoComplete;
            renderTodos();
        });

        const deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash text-red-500 cursor-pointer ml-2 hover:text-red-600 transition ease-in-out delay-200"></i>';
        deleteBtn.addEventListener('click', () => deleteTodo(i));

        const editBtn = document.createElement('span');
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square text-blue-500 cursor-pointer mr-2 hover:text-blue-600 transition ease-in-out delay-200"></i>';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editTodo(i)
        });

        const date = document.createElement('div');
        date.textContent = todo.dueDate;
        date.classList.add('date-container','ml-4', 'font-medium');
        date.addEventListener('click', (e) => {
            e.stopPropagation();
            editDate(i, date);

        })

        const rightContent = document.createElement('div');
        rightContent.classList.add('flex', 'justify-between');

        rightContent.appendChild(editBtn);
        rightContent.appendChild(deleteBtn);
        rightContent.appendChild(date);
        listItemContainer.appendChild(listItem);
        listItemContainer.appendChild(rightContent);
        todoList.appendChild(listItemContainer);

        todoCounter();
        renderCategories();
        renderTodosByCategory();
    })
}

const deleteTodo = (index) => {
    todos.splice(index, 1);
    todoCounter();
    renderTodos();
    renderCategories();
    const todoCategoryContainer = document.querySelector('.todo-category-container');
    todoCategoryContainer.classList.add('hidden');
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
    saveBtn.classList.add('bg-green-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-green-600', 'ml-2');

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('bg-gray-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-gray-600', 'ml-2');

    const rightContent = document.createElement('div');
    rightContent.classList.add('flex', 'justify-between');

    todoItem.innerHTML = '';
    rightContent.appendChild(saveBtn);
    rightContent.appendChild(cancelBtn);
    todoItem.appendChild(editInput);
    todoItem.appendChild(rightContent);

    saveBtn.addEventListener('click', (e) => {
        if (editInput.value.trim() !== '') {
            e.stopPropagation();
            todos[index].todoText = editInput.value.trim();
            renderTodos();
        }
    });

    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            if (editInput.value.trim() !== '') {
                todos[index].todoText = editInput.value.trim();
                renderTodos();
            }
        }
    })

    editInput.addEventListener('click', (e) => {
        e.stopPropagation();
    })

    cancelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        renderTodos()
    });
}

const todoCounter = () => {
    const completedTodos = document.querySelector('.completed-todos');
    const completedTodo = todos.filter(todo => !todo.todoComplete).length;
    completedTodos.textContent = `You have ${completedTodo} pending ${completedTodo === 1 ? 'todo' : 'todos'}.`
}

const clearTodos = () => {
    todos = todos.filter(todo => !todo.todoComplete);
    renderTodos();
    renderCategories();
    const todoCategoryContainer = document.querySelector('.todo-category-container');
    todoCategoryContainer.classList.add('hidden');
}

const renderCategories = () => {
    const displayCategories = document.querySelector('.display-categories');
    displayCategories.innerHTML = '';
    const newSet = new Set();

    const categoryHeader = document.createElement('h1');
    categoryHeader.textContent = 'Categories: ';
    categoryHeader.classList.add('font-bold', 'text-3xl', 'mb-6')
    displayCategories.appendChild(categoryHeader);

    todos.forEach((todo, i) => {
        if (todo.category && !newSet.has(todo.category)) {
            newSet.add(todo.category);

            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category-container','py-4', 'px-8', 'bg-white', 'rounded-lg', 'shadow-md', 'flex', 'flex-col', 'justify-between', 'mb-2', 'text-gray-800', 'hover:bg-gray-100', 'cursor-pointer');

            const categoryText = document.createElement('p');
            categoryText.textContent = todo.category;

            const todoText = document.createElement('p');
            todoText.textContent = `${todo.todoText}...`;
            todoText.classList.add('text-xs', 'text-gray-500', 'mt-2')

            const todoCategoryContainer = document.querySelector('.todo-category-container');

            categoryContainer.addEventListener('click', () => {
                todoCategoryContainer.classList.toggle('hidden');
                renderTodosByCategory(todo.category);
                categoryButtons(todo.category, i);
            })

            categoryContainer.appendChild(categoryText);
            categoryContainer.appendChild(todoText);
            displayCategories.appendChild(categoryContainer);
        }
    })
}

const renderTodosByCategory = (category) => {
    const todoCategoryContainer = document.querySelector('.todo-category-container');
    todoCategoryContainer.innerHTML = ''; 

    const filteredTodos = todos.filter(todo => todo.category === category);

    const categoryWrapper = document.createElement('div');
    categoryWrapper.classList.add('category-wrapper', 'border', 'p-4', 'rounded-lg', 'mb-4', 'bg-transparent');

    const cancelModalBtn = document.createElement('button');
    cancelModalBtn.textContent = 'X';
    cancelModalBtn.classList.add('absolute', 'top-4', 'right-4', 'bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded', 'hover:bg-red-600', 'transition', 'ease-in-out', 'delay-100', 'font-bold');

    if (filteredTodos.length > 0) {
        const categoryTitle = document.createElement('h1');
        categoryTitle.textContent = `${category}:`;
        categoryTitle.classList.add('category-title', 'font-bold', 'text-2xl', 'mb-2');
        categoryWrapper.appendChild(categoryTitle);
    }

    filteredTodos.forEach((todo, i) => {
        const textContainer = document.createElement('div');
        textContainer.classList.add('todo-text-container', 'mb-2', 'p-2', 'bg-transparent', 'rounded');

        const todoText = document.createElement('p');
        todoText.textContent = `${i + 1}. ${todo.todoText}`;

        textContainer.appendChild(todoText);
        categoryWrapper.appendChild(textContainer);
    });

    categoryWrapper.appendChild(cancelModalBtn);
    todoCategoryContainer.appendChild(categoryWrapper);

    cancelModalBtn.addEventListener('click', cancelModal);
};

const categoryButtons = (category, index) => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'gap-4', 'absolute', 'bottom-4', 'right-6', 'button-container');

    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash text-red-500 cursor-pointer hover:text-red-600 transition ease-in-out delay-200 text-xl"></i>';
    deleteBtn.addEventListener('click', () => {
        deleteCategory(category);
        renderCategories();
        console.log(`Deleted category: ${category}`);
    });

    const editBtn = document.createElement('span');
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square text-blue-500 cursor-pointer hover:text-blue-600 transition ease-in-out delay-200 text-xl"></i>';
    editBtn.addEventListener('click', () => {
        editCategory(index);
        buttonContainer.style.display = 'none';
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    const categoryWrapper = document.querySelector('.category-wrapper');
    categoryWrapper.setAttribute('data-category-id', index);
    categoryWrapper.appendChild(buttonContainer);
};

// Function to delete a category
const deleteCategory = (category) => {
    todos.forEach(todo => {
        if (todo.category === category) {
            delete todo.category; 
            const todoCategoryContainer = document.querySelector('.todo-category-container');
            todoCategoryContainer.classList.add('hidden');
        }
    });

    renderTodos();
    renderCategories(); 
};

// Edit category
const editCategory = (index) => {
    const categoryTitle = todos[index].category;
    const categoryContainer = document.querySelector(`[data-category-id="${index}"]`); 

    if (!categoryContainer) return; 

    const newCategoryInput = document.createElement('input');
    newCategoryInput.value = categoryTitle;
    newCategoryInput.type = 'text';
    newCategoryInput.classList.add('border', 'border-gray-300', 'p-2', 'rounded-lg', 'w-full', 'mr-2', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');

    const h1Category = document.querySelector('.category-title');
    h1Category.innerHTML = '';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('bg-green-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-green-600', 'ml-2');

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('bg-gray-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-gray-600', 'ml-2');

    const rightContent = document.createElement('div');
    rightContent.classList.add('flex', 'justify-between');

    h1Category.appendChild(newCategoryInput);
    rightContent.appendChild(saveBtn);
    rightContent.appendChild(cancelBtn);
    categoryContainer.appendChild(rightContent);

    const buttonContainer = document.querySelector('.button-container');

    saveBtn.addEventListener('click', () => {
        if(newCategoryInput.value.trim()) {
            todos[index].category = newCategoryInput.value.trim();
            h1Category.innerHTML = `<h1>${newCategoryInput.value.trim()}:</h1>`;

            newCategoryInput.remove();
            saveBtn.remove();
            cancelBtn.remove();

            buttonContainer.style.display = 'flex'

            renderCategories();
        }
    });

    cancelBtn.addEventListener('click', () => {
        h1Category.innerHTML = `<h1>${categoryTitle}:</h1>`;

        newCategoryInput.remove();
        saveBtn.remove();
        cancelBtn.remove();

        buttonContainer.style.display = 'flex'
    });
}

const cancelModal = () => {
    const todoCategoryContainer = document.querySelector('.todo-category-container');
    todoCategoryContainer.classList.add('hidden');
}

const editDate = (index, dateElement) => {
    const currentDate = todos[index].dueDate;

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = currentDate;
    dateInput.classList.add('border', 'border-gray-300', 'px-2', 'rounded-lg', 'w-full', 'mr-2', 'cursor-pointer');

    dateInput.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    dateInput.addEventListener('change', (e) => {
        e.stopPropagation();
        const newDate = e.target.value;
        todos[index].dueDate = newDate;
        renderTodos();
    });

    dateElement.innerHTML = '';
    dateElement.appendChild(dateInput);
}

// Event Listeners

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTodo();
    }
});

selectCategory.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTodo();
    }
})

clearBtn.addEventListener('click', () => {
    confirm('Are you sure you want to clear these todos?') ? clearTodos() : renderTodos();
});

renderTodos();