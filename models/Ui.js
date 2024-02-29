import { listSortable } from "../index.js";
import { Todo } from "./Todo.js";

export class Ui {
    constructor() {
         this.inputTask = document.querySelector('.input-task')
         this.getTasks = new Todo()
         this.tasksContainer = document.querySelector('.tasks-container')
         this.buttonsContainer = document.createElement('div')
         this.button = document.createElement('button')
         this.filtersContainer = document.createElement('div')
         this.spanPendingTasks = document.createElement('span')
    }

    eventAddTask() {
        this.inputTask.addEventListener('keyup', (e) => {
            if(e.code === 'Enter'){
                this.getTasks.addTask({...this.buildTask(e.target.value)})
                this.renderTask(this.getTasks.getTasks())
                e.target.value = ''
                this.spanPendingTasks.innerHTML = `${ this.getTasks.pendingTasks()} items left`
            }         
        })
    }

    renderTask(array) {
        let text = ''
        array.forEach((task) => {
            text+=`
                <div class='task-item' data-id =${task.id}>
                    <input class='is-completed' data-idTask =${task.id} type="checkbox" ${task.completed && 'checked'}>
                    <p>${task.titleTask}</p>
                    <img class='btn-delete' data-idTask =${task.id} src="./images/icon-cross.svg" alt="">
                </div>
            `
        })
        this.tasksContainer.innerHTML = text
        if(this.getTasks.getTasks().length > 0) {
            this.renderButtonsFilter()
        }
        
    }

    removeTask(e,id) {
        e.target.closest('.task-item').remove()
        this.getTasks.deleteTask(id)
        this.spanPendingTasks.innerHTML = `${this.getTasks.pendingTasks()} items left`
        if(this.getTasks.getTasks().length < 1) {
            this.buttonsContainer.remove()
        }
        console.log(this.buttonsContainer);
    }

    checkCompletedTask(id, completedBolean) {
        this.getTasks.completedTask(id, completedBolean)
        console.log(this.getTasks);
        this.spanPendingTasks.innerHTML = `${this.getTasks.pendingTasks()} items left`
    }

    buildTask(titleTask) {
        const obj = {
            id: new Date().getTime(),
            titleTask:titleTask,
            completed:false
        }
        return obj
    }

    removeAllTask() {
        this.getTasks.deleteAllTaskCompleted()
        this.renderTask(this.getTasks.getTasks())
        if(this.getTasks.getTasks().length < 1) {
            this.buttonsContainer.remove()
        }
        console.log(this.buttonsContainer);
    }

    renderButtonsFilter() {
      
        if(this.buttonsContainer.children.length < 2) {
            this.spanPendingTasks.innerHTML = `${ this.getTasks.pendingTasks()} items left`
            this.buttonsContainer.classList.add('buttons-container')

            this.button.classList.add('clear-completed')
            this.button.textContent = 'clear completed'
    
            this.filtersContainer.classList.add('filters-container')

            const allButton = document.createElement('button')
            const activeButton = document.createElement('button')
            const completedButton = document.createElement('button')

            allButton.textContent = 'All'
            activeButton.textContent = 'Active'
            completedButton.textContent = 'Completed'
            this.filtersContainer.append(allButton, activeButton, completedButton)
            this.buttonsContainer.append( this.spanPendingTasks ,this.filtersContainer, this.button)
        }  
        
        this.tasksContainer.insertAdjacentElement('afterend',this.buttonsContainer)
    }

    filtersCategory(category) {
       // console.log(this.getTasks);
        switch(category){
            case('All'):{
               // console.log(this);
                this.renderTask(this.getTasks.getTasks())
                listSortable.option('disabled', false)
                return
            }
            case('Active'):{
                console.log(this.getTasks.getTasks());
                const filter =  this.getTasks.getTasks().filter((task) => !task.completed )
                this.renderTask(filter)
                listSortable.option('disabled', true)
                return
            }
            case('Completed'):{
                console.log(this.getTasks.getTasks());
                const filter =  this.getTasks.getTasks().filter((task) => task.completed )
                this.renderTask(filter)
                listSortable.option('disabled', true)
                return
            }
        }      
       
    }

}