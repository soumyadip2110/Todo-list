window.onload = displayTasks()
const addTaskBtn = document.getElementById('add-task')

addTaskBtn.addEventListener('click', () => {
    let taskInput = document.getElementById('task-input').value
    saveTask(taskInput)
    displayTasks()
})

function addNewTask(task, index) {
    const allTasksBox = document.querySelector('.all-tasks-container-secondary')

    const taskDiv = document.createElement('div')
    taskDiv.setAttribute('class', 'task-box')

    const taskTextDiv = createTaskTextDiv(task)
    const buttonsDiv = createButtons(index)
    // const editBtn = createEditBtn()
    // const removeBtn = createRemoveBtn()

    // addEditEvent(editBtn, index)
    // addRemoveEvent(removeBtn, index)

    taskDiv.appendChild(taskTextDiv)
    taskDiv.appendChild(buttonsDiv)
    // taskDiv.appendChild(editBtn)
    // taskDiv.appendChild(removeBtn)

    allTasksBox.appendChild(taskDiv)

}

function createTaskTextDiv(text) {
    const taskTextDiv = document.createElement('div')
    taskTextDiv.setAttribute('class', 'task-text-box')

    const taskText = document.createTextNode(text)
    taskTextDiv.appendChild(taskText)

    return taskTextDiv
}

function createButtons(index) {
    const div = document.createElement('div')
    div.setAttribute('class', 'buttons-container')

    const editBtn = createEditBtn()
    const removeBtn = createRemoveBtn()

    addEditEvent(editBtn, div, index)
    addRemoveEvent(removeBtn, index)

    div.appendChild(editBtn)
    div.appendChild(removeBtn)
    return div
}

function createEditBtn() {
    const editBtn = document.createElement('button')
    editBtn.setAttribute('class', 'edit-btn')

    const editBtnText = document.createTextNode('Edit')
    editBtn.appendChild(editBtnText)

    return editBtn
}

function createDoneBtn() {
    const doneBtn = document.createElement('button')
    doneBtn.setAttribute('class', 'done-btn')
    doneBtn.appendChild(document.createTextNode('Done'))
    return doneBtn
}

function createRemoveBtn() {
    const removeBtn = document.createElement('button')
    removeBtn.setAttribute('class', 'remove-btn')

    const removeBtnText = document.createTextNode('Remove')
    removeBtn.appendChild(removeBtnText)

    return removeBtn
}

function addEditEvent(btn, btnContainer, index) {
    btn.addEventListener('click', () => {
        const allTasks = JSON.parse(window.localStorage.getItem('tasks'))

        let editableTask = allTasks.filter((task, idx) => idx === index)
        // in arrow func. '{idx === index}' is not valid as, if '{}' is included then there must be a 'return' statement written explicitely

        // let editableTask = allTasks.filter((task, idx) => {
        //     if (idx == index){
        //         console.log(task)
        //         return task
        //     }
        // })
        // console.log(editableTask);

        // NOTE: THIS METHOD SELECTS ONLY THE TASK TEXT DATA FROM THE LOCAL STORAGE

        const btnParentDiv = btn.parentElement
        const textDiv = btnParentDiv.previousElementSibling
        // use 'previousElementSibling' instead of 'previousSibling' to get the previous element node (skipping text nodes and any other non-element nodes).
        textDiv.setAttribute('contentEditable', 'true')

        const doneBtn = createDoneBtn()
        btnContainer.prepend(doneBtn)

        addDoneEvent(doneBtn, textDiv, index)
    })
}

function addDoneEvent(btn, textDiv, index){
    btn.addEventListener('click', () => {
        const editedTaskText = textDiv.textContent
        // console.log(editedTaskText);
        const allTasks = JSON.parse(window.localStorage.getItem('tasks'))
        const updatedTasks = allTasks.map((task, idx) => {
            return idx === index ? editedTaskText : task
        })
        // console.log(updatedTasks);
        window.localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        btn.remove()
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
    let allTasks = JSON.parse(window.localStorage.getItem('tasks')) || []
    allTasks.push(task)
    allTasks = JSON.stringify(allTasks)
    window.localStorage.setItem('tasks', allTasks)
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
