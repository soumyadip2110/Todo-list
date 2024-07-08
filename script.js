window.onload = displayTasks()

const addTaskBtn = document.getElementById('add-task')

addTaskBtn.addEventListener('click', () => {
    let taskInput = document.getElementById('task-input').value
    saveTask(taskInput)
    displayTasks()
})

function addNewTask(task, index){
    const allTasksBox = document.querySelector('.all-tasks-container-secondary')

    const taskDiv = document.createElement('div')
    taskDiv.setAttribute('class', 'task-box')
    
    const taskTextDiv = createTaskTextDiv(task)    
    const removeBtn = createRemoveBtn()
    addRemoveEvent(removeBtn, index)

    taskDiv.appendChild(taskTextDiv)
    taskDiv.appendChild(removeBtn)
    
    allTasksBox.appendChild(taskDiv)

}

function createTaskTextDiv(text){
    const taskTextDiv = document.createElement('div')
    taskTextDiv.setAttribute('class', 'task-text-box')

    const taskText = document.createTextNode(text)
    taskTextDiv.appendChild(taskText)

    return taskTextDiv
}

function createRemoveBtn(){
    const removeBtn = document.createElement('button')
    removeBtn.setAttribute('class', 'remove-btn')

    const removeBtnText = document.createTextNode('Remove')
    removeBtn.appendChild(removeBtnText)

    return removeBtn
}

function addRemoveEvent(btn, index){
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

function saveTask(task){
    let allTasks;
    if (!window.localStorage.getItem('tasks')){
        allTasks = []
    } else {
        allTasks = JSON.parse(window.localStorage.getItem('tasks'))
    }
    allTasks.push(task)
    allTasks = JSON.stringify(allTasks)
    window.localStorage.setItem('tasks', allTasks)
}

function displayTasks(){
    const allTasksBox = document.querySelector('.all-tasks-container-secondary')
    allTasksBox.innerHTML = ''
    const allTasks = JSON.parse(window.localStorage.getItem('tasks'))
    if (allTasks){
        allTasks.forEach((task, index) => {
            addNewTask(task, index)
        })
    }
}
