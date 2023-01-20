$(function () {
    $("#level2").click(function () {
        Toast.fire({ icon: 'success', title: `Nivel 2 desbloqueado!` });

        ajaxRequest("main.php", { accion: "unock-level2", nivel: "level_2" }).then(e => {
            console.log(e)
            location.reload();
        }).catch(e => { Swal.showValidationMessage(e) });
    });

    $("#level3").click(function () {
        Toast.fire({ icon: 'success', title: `Nivel 3 desbloqueado!` });

        ajaxRequest("main.php", { accion: "unock-level3", nivel: "level_2" }).then(e => {
            console.log(e)
            location.reload();
        }).catch(e => { Swal.showValidationMessage(e) });
    });
})