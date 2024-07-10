window.onload = displayTasks()
const addTaskBtn = document.getElementById('add-task')

window.addEventListener('keydown', (e) => {
    if (e.key == 'Enter'){
        addTaskBtn.click()
    }
})

addTaskBtn.addEventListener('click', () => {
    let taskInput = document.getElementById('task-input')
    if (taskInput.value){
        saveTask(taskInput.value)
        displayTasks()
    }

    taskInput.value = ''
})

function addNewTask(task, index) {
    const allTasksBox = document.querySelector('.all-tasks-container-secondary')

    const taskDiv = createElement('div', 'task-box', '')
    const taskTextDiv = createElement('div', 'task-text-box', task)
    const buttonsDiv = createButtons(index)

    taskDiv.appendChild(taskTextDiv)
    taskDiv.appendChild(buttonsDiv)

    allTasksBox.appendChild(taskDiv)
}

function createButtons(index) {
    const div = createElement('div', 'buttons-container', '')
    const editBtn = createElement('button', 'edit-btn', 'Edit')
    const removeBtn = createElement('button', 'remove-btn', 'Remove')

    addEditEvent(editBtn, div, index)
    addRemoveEvent(removeBtn, index)

    div.appendChild(editBtn)
    div.appendChild(removeBtn)
    return div
}

function addEditEvent(btn, btnContainer, index) {
    btn.addEventListener('click', () => {
        const btnParentDiv = btn.parentElement
        const textDiv = btnParentDiv.previousElementSibling
        // NOTE: use 'previousElementSibling' instead of 'previousSibling' to get the previous element node 
        // (skipping text nodes and any other non-element nodes).

        if (!textDiv.hasAttribute('contentEditable')){
            textDiv.setAttribute('contentEditable', 'true')

            const doneBtn = createElement('button', 'done-btn', 'Done')
            btnContainer.prepend(doneBtn)

            addDoneEvent(doneBtn, textDiv, index)
        }
    })
}

function addDoneEvent(btn, textDiv, index){
    btn.addEventListener('click', () => {
        const editedTaskText = textDiv.textContent
        if (editedTaskText.trim().length > 0){
            const allTasks = JSON.parse(window.localStorage.getItem('tasks'))

            const updatedTasks = allTasks.map((task, idx) => {
                return idx === index ? editedTaskText : task
            })

            window.localStorage.setItem('tasks', JSON.stringify(updatedTasks))
            btn.remove()
            textDiv.setAttribute('contentEditable', 'false')
        }
    })
}

function addRemoveEvent(btn, index) {
    btn.addEventListener('click', () => {
        const allTasks = JSON.parse(window.localStorage.getItem('tasks'))

        let updatedAllTasks = JSON.stringify(
            allTasks.filter((task, idx) => {
                return idx !== index;
            })
        )
        
        window.localStorage.setItem('tasks', updatedAllTasks)
        displayTasks()
    })
}

function saveTask(task) {
    if (task.trim().length > 0){
        let allTasks = JSON.parse(window.localStorage.getItem('tasks')) || []
        allTasks.push(task)
        allTasks = JSON.stringify(allTasks)
        window.localStorage.setItem('tasks', allTasks)
    }
}

function displayTasks() {
    const allTasksBox = document.querySelector('.all-tasks-container-secondary')
    allTasksBox.innerHTML = ''

    const allTasks = JSON.parse(window.localStorage.getItem('tasks'))

    if (allTasks) {
        allTasks.forEach((task, index) => {
            addNewTask(task, index)
        })
    }
}

function createElement(elementName, className, text){
    const element = document.createElement(elementName)
    element.setAttribute('class', className)
    if (text){
        element.appendChild(document.createTextNode(text))
    }
    return element
}
