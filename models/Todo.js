export class Todo {
    #todos = []
    constructor(){

    }

    getTasks(){
        return this.#todos
    }

    addTask(task){
        this.#todos.push(task)
    }

    completedTask(id, boolean){
       this.#todos = this.#todos.map((task) => task.id == id ? {...task, completed: boolean} : task )
    }

    deleteTask(idTask){
        this.#todos = this.#todos.filter((task) => task.id != idTask)
    }

    deleteAllTaskCompleted(){
        this.#todos=  this.#todos.filter((task) => !task.completed)
    }

}