const addTaskBtn = document.getElementById('add-task')

addTaskBtn.addEventListener('click', () => {
    let taskInput = document.getElementById('task-input').value
    // console.log(taskInput);
    addNewTask(taskInput)
})

function addNewTask(task){
    const allTasksBox = document.querySelector('.all-tasks-container-secondary')

    const taskDiv = document.createElement('div')
    taskDiv.setAttribute('class', 'task-box')
    
    const taskTextDiv = createTaskTextDiv(task)    
    const removeBtn = createRemoveBtn()
    addClickEvent(removeBtn)

    taskDiv.appendChild(taskTextDiv)
    taskDiv.appendChild(removeBtn)
    
    // console.log(taskDiv);
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

function addClickEvent(btn){
    btn.addEventListener('click', () => {
        // alert('working')
        const taskToRemove = btn.parentElement
        // console.log(taskToRemove);
        taskToRemove.remove()
    })
}
