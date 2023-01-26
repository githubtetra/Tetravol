$(function () {
    $("#crearCuentaStaff").click(function() {
        Swal.fire({
            title: 'Crear cuenta',
            html:
                `<input type="text" placeholder="Nombre" id="nombre-new" class="swal2-input"></input>
                `, 
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                let value = { nombre: $("#nombre-new").val() };

                console.log(value.nombre)
                if (!value.nombre) return Swal.showValidationMessage(`Tienes que indicar el nombre del usuario.`);

                return ajaxRequest("main.php", { accion: "crear-cuenta", nombre_user: value.nombre }).then(e => { console.log(e); }).catch(e => { Swal.showValidationMessage(e) });
            }
        }).then(async (result) => {
            console.log(result)
            if (result.isConfirmed) {
                await Toast.fire({icon: 'success', title: `Se ha creado la cuenta correctamente!`});  
                location.reload();
            }
        })
    });

    $("#eliminarCuenta").click(function() {
        var idStaff = $(this).data("idstaff")

        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡Esta acción no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return ajaxRequest("main.php", { accion: "eliminar-cuenta-staff", idstaff: idStaff }).then(e => {

                }).catch(e => { Swal.showValidationMessage(e) });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then(async (result) => {
            if (result.isConfirmed) {
                await Toast.fire({icon: 'success', title: `Se ha borrado la cuenta correctamente!`});  
                location.reload();
            }
        })
    })
})