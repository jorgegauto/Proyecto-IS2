eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e){
    e.preventDefault();//hace que el formulario no se envie para realizar de manera manual los codigos y validaciones de acceso, por defecto sin el prevendefault se envia automaticamente
    
    //se obtiene el usuario y password
    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;

//https://sweetalert2.github.io/ enlace para descargar los tipos de errores
//se valida si algun campo esta vacio, se genera el error
    if(usuario === '' || password === ''){
        //la validacion falló
        swal({
            type: 'error',
            title: 'Error...',// se puede modificar
            text: 'Ambos campos son obligatorios!'//se puede modificar
        })
    }else {//para mensaje de campos cargados exitosamente
       /* swal({
            type: 'success',
            title: 'Correcto...',// se puede modificar
            text: 'Escribiste ambos campos!'//se puede modificar
        })*/

        //Ambos campos son correctos, mandar ejecutar Ajax

        //datos que se envia al servidor
        var datos = new FormData();//permite estructurar los llamados de Ajax, dondole una llave y un valor
        datos.append('usuario', usuario);
        datos.append('password', password);
        datos.append('accion', tipo);

                 // LOS 4 PASOS PARA AJAX
        // 1 - crear el llamado a Ajax
        var xhr = new XMLHttpRequest();

        // 2 - Abrir la conexion.
        xhr.open('POST','inc/modelos/modelo-admin.php', true);

        // 3 - retorno de datos
        xhr.onload = function(){
            if(this.status === 200){
                var respuesta = JSON.parse(xhr.responseText);//toma el string (datos)y los convierte a objetos para poder acceder a sus partes

                console.log(respuesta);
                //si la respuesta es correcta
                if(respuesta.respuesta === 'correcto'){
                    //si es un nuevo usuario
                    if(respuesta.tipo === 'crear'){
                        swal({
                            title: 'Usuario creado',
                            text: 'El usuario se creo correctamente',
                            type: 'success'
                        });
                    } else if(respuesta.tipo === 'login'){
                        swal({
                            title: 'Login Correcto',
                            text: 'Presiona OK para abrir el dashboard',
                            type: 'success'
                        })
                        .then(resultado => {
                            if(resultado.value) {
                                window.location.href = 'index.php';//redirecciona al index
                            }
                        })
                    }
                } else {
                    // Hubo un error
                    swal({
                        title: 'Error',
                        text: 'Hubo un error',
                        type: 'error'
                    })
                }
            }
        }

        // 4 - Enviar la peticion o FormData
        xhr.send(datos);
    }
}



