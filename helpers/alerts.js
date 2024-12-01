
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })
  
export async function addTask() {
    await Toast.fire({
        icon: 'success',
        title: 'add task',
        
      })
}


export async function eventRepeated() {
    await Toast.fire({
        icon: 'warning',
        title: 'repeat event',
    })
}


export async function deleteTask() {
  await Toast.fire({
      icon: 'error',
      title: 'delete task',
  })
}


export function crossEvent(eventRepeat) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `hay un cruce de horarios con el curso ${eventRepeat} `,
        allowOutsideClick:false,
    });
}



export const eventDeleted = async (id) => {
    const result = await Swal.fire({
      title: 'Eliminar',
      text: '¿Estás seguro de eliminar este evento?',
      icon: 'question',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'green',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'red',
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  
    if (result.isConfirmed) {
      return true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return false;
    }
  };
  


/*   ;(async () => {

    await Toast.fire({
      icon: 'success',
      title: 'Success',
    })
    await Toast.fire({
      icon: 'error',
      title: 'Error',
    })
    await Toast.fire({
      icon: 'warning',
      title: 'Warning',
    })
    await Toast.fire({
      icon: 'info',
      title: 'Info',
    })
    await Toast.fire({
      icon: 'question',
      title: 'Question',
    })

  })() */
  