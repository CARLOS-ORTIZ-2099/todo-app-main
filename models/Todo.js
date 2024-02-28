import { StorageData } from "./StorageData.js"


export class Todo {
    #todos = StorageData.getStorageTodos() ||  []
    constructor(){}

    getTasks(){
        return this.#todos
    }

    addTask(task){
        this.#todos.push(task)
        StorageData.setStorageTodos(this.#todos)
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

}