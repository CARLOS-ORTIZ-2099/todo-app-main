import { StorageData } from "./StorageData.js"
import { listSortable } from "../index.js";

export class Todo {
    #todos = StorageData.getStorageTodos() ||  []
    constructor(){}

    getTasks(){
        return this.#todos
    }

    addTask(task, category){
        this.#todos.push(task)
        //console.log(this.#todos);
        StorageData.setStorageTodos(this.#todos)
        //console.log(listSortable.options.store);
        localStorage.getItem('carlos') ? listSortable.options.store.set(listSortable, task.id, category) : ''
    }

    completedTask(id, boolean){
       this.#todos = this.#todos.map((task) => task.id == id ? {...task, completed: boolean} : task )
       StorageData.setStorageTodos(this.#todos)
    }

    deleteTask(idTask){
        this.#todos = this.#todos.filter((task) => task.id != idTask)
        StorageData.setStorageTodos(this.#todos)
    }

    deleteAllTaskCompleted(){
        this.#todos=  this.#todos.filter((task) => !task.completed)
        StorageData.setStorageTodos(this.#todos)
    }
    change(data) {
        this.#todos = data 
    }

    pendingTasks() {
       const number = this.#todos.reduce((acc, current) => {
            if(!current.completed){
                return acc + 1
            }else{
                return acc
            }
       }, 0)
       return number
    }

}