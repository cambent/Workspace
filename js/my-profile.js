//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const usernav= document.getElementById ("usuario") 
const close = document.getElementById ("close")

if (username !=null){
usernav.innerHTML ='<a class="py-2 d-none d-md-inline-block" href="#" id = "usuario">' + username [0], usuario + '</a>' ;
}

else {
    '<a href ="index.html class="py-2 d-none d-md-inline-block" href="#" id = "usuario"> Iniciar sesión </a>';
}
document.addEventListener("DOMContentLoaded", function (e) {

guardarTodo();

});

function guardarTodo(){

    let nombre=document.getElementById("nombre").value;
    let apellido=document.getElementById("apellido").value;
    let edad=document.getElementById("edad").value;
    let correo=document.getElementById("correo").value;
    let direccion=document.getElementById("direccion").value;

    let datos={"nombre": nombre, "apellido": apellido, "edad": edad, "correo": correo, "direccion": direccion}
    localStorage.setItem('Datos', JSON.stringify(datos));

    
var dpersonales= JSON.parse(localStorage.getItem('Datos'));
document.getElementById("mostrarnombre").value=dpersonales.nombre;
document.getElementById("mostrarapellido").value=dpersonales.apellido;
document.getElementById("mostraredad").value=dpersonales.edad;
document.getElementById("mostrarcorreo").value=dpersonales.correo;
document.getElementById("mostrardireccion").value=dpersonales.direccion;
}
