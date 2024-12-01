import { StorageData } from "./models/StorageData.js";
import { Ui } from "./models/Ui.js";

const ui = new Ui()
ui.eventAddTask()

ui.imgThemeContainer.addEventListener('click', () => ui.changeTheme())

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

const lista  = document.getElementById('tasks-container')

export const listSortable = Sortable.create(lista, {
    animation:150,
    chosenClass:"seleccionado",
    dragClass:"drag",
    group: "carlos",

    store:{
        set:(Sortable, id, category = 'All') => {
            console.log(category);
            console.log(id);
            // sortable me devolvera un arreglo con los ids de los items ordenados que esten presentes en la pantalla
            let orden =  Sortable.toArray()
            console.log(orden);
            // sel el id es thurty quiere decir que se esta pasando una tarea nueva y que ya hay un orden establecido en LS y ese es el que debemos seguir
            if(id && !orden.includes(id)){
                orden = localStorage.getItem('carlos').split('|') 
                console.log('entro');
                orden.push(id)
                console.log(orden);
            }
            
           /*  console.log(orden);
            if(id && !orden.includes(id)){
                console.log('entro');
                orden.push(id)
            } */
            if(category == 'All'){
                const array = ui.getTasks.getTasks()
                console.log(orden);
                console.log(array);
                let ordenado = []
                // no es la mejor solucion pero si la mas facil de inplementar
                for(let i = 0; i < orden.length; i++){
    
                    for(let j = 0; j < array.length; j++){
                        if(orden[i] == array[j].id){
                            ordenado.push(array[j])
                            break
                        }
                    }
                }
              //  console.log(ordenado);
                StorageData.setStorageTodos(ordenado)
                ui.getTasks.change(ordenado)
            }
            localStorage.setItem(Sortable.options.group.name, orden.join('|'))
          //  console.log(ui.getTasks.getTasks());
        },

        get: (Sortable) => {
            console.log('get');
            // el metodo toArray devuelve un arreglo que contendra los ids de los elementos hijos de un contenedor especifico
            console.log(Sortable.toArray());
            const theme = StorageData.getThemeColor()
            theme === 'light' ? ui.light() : ui.dark()
            const orden = localStorage.getItem(Sortable.options.group.name)
            ui.renderTask(ui.getTasks.getTasks())
            return orden ? orden.split('|') : []
        }
    }

})




