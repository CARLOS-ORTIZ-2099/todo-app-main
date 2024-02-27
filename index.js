import { Ui } from "./models/Ui.js";

const ui = new Ui()
ui.eventAddTask()

ui.tasksContainer.addEventListener('click', (e) => {
    let target =  e.target
    if(e.target.matches('.btn-delete')){
        ui.removeTask(e, target.dataset.idtask)
    }
    else if(e.target.matches('.is-completed')){
        const checkBox = e.target
        ui.checkCompletedTask(target.dataset.idtask, checkBox.checked)

    }
    else if(e.target.matches('.clear-completed')){
        ui.removeAllTask()
    }
})

ui.filtersContainer.addEventListener('click', (e) => {
    if(e.target.matches('button')){
        ui.filtersCategory(e.target.textContent)
    }
})

document.addEventListener('DOMContentLoaded', (e) => {
    ui.renderTask(ui.getTasks.getTasks())
})



