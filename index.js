
import { StorageData } from "./models/StorageData.js";
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
})

ui.filtersContainer.addEventListener('click', (e) => {
    if(e.target.matches('button')){
        ui.filtersCategory(e.target.textContent)
    }
})


ui.button.addEventListener('click', (e) => ui.removeAllTask())

/* document.addEventListener('DOMContentLoaded', (e) => {
    ui.renderTask(ui.getTasks.getTasks())
})
 */

const lista  = document.getElementById('tasks-container')

export const listSortable = Sortable.create(lista, {
    animation:150,
    chosenClass:"seleccionado",
    dragClass:"drag",

    onEnd: () => {
        console.log('se inserto un elemento');
    },
    group: "carlos",

    store:{
        set:(Sortable) => {
            const orden = Sortable.toArray()
            const array = ui.getTasks.getTasks()
            console.log(orden);
            console.log(array);
            let ordenado = []
            // no es la mejor solucion pero si la mas rapida
            for(let i = 0; i < orden.length; i++){

                for(let j = 0; j < array.length; j++){
                    if(orden[i] == array[j].id){
                        ordenado.push(array[j])
                        break
                    }
                }
            }
            console.log(ordenado);
            StorageData.setStorageTodos(ordenado)
            ui.getTasks.change(ordenado)
            localStorage.setItem(Sortable.options.group.name, orden.join('|'))
            console.log(ui.getTasks.getTasks());
        },

        get: (Sortable) => {
            const orden = localStorage.getItem(Sortable.options.group.name)
            ui.renderTask(ui.getTasks.getTasks())
            return orden ? orden.split('|') : []
        }
    }

})





