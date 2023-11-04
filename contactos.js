console.log("El archivo contactos.js se está ejecutando.");
import config from './config.js';

const endpoint = config.apiEndpoint;
// config.js
// Luego puedes usar la variable 'endpoint' en tu código

// Definir una lista de contactos (simulada como un arreglo)
let contactos = [];

// Función para agregar un nuevo contacto
function agregarContacto() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;

    if (nombre && apellido) {
        // Generar un ID único para el nuevo contacto (puedes utilizar una función más robusta en una aplicación real)
        const nuevoID = Date.now().toString();

        // Crear un objeto de contacto
        const nuevoContacto = {
            id: nuevoID,
            nombre: nombre,
            apellido: apellido,
        };

        // Agregar el nuevo contacto a la lista
        contactos.push(nuevoContacto);

        // Limpiar los campos de entrada
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";

        // Aquí llamamos a callAPI para enviar el nuevo contacto a la API
        callAPI('agregar', nuevoContacto);

        // Actualizar la lista de contactos en pantalla
        mostrarContactos();

        // Puedes guardar la lista de contactos en una base de datos o en el almacenamiento local aquí
    } else {
        alert("Por favor, completa los campos de nombre y apellido.");
    }
}

// Función para borrar un contacto por ID
function borrarContacto(id) {
    contactos = contactos.filter((contacto) => contacto.id !== id);
    mostrarContactos();
    // Puedes eliminar el contacto de la base de datos o el almacenamiento local aquí
}

// Función para mostrar todos los contactos en pantalla
function mostrarContactos() {
    const listaContactos = document.getElementById("listaContactos");
    listaContactos.innerHTML = "";

    contactos.forEach((contacto) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ID: ${contacto.id}<br>
            Nombre: ${contacto.nombre}<br>
            Apellido: ${contacto.apellido}<br>
            <button onclick="borrarContacto('${contacto.id}')">Borrar</button>
            <hr>
        `;
        listaContactos.appendChild(li);
    });
}

// Asociar la función de agregar contacto al botón "Agregar Contacto"
document.getElementById("agregarContacto").addEventListener("click", agregarContacto);

// Inicializar la lista de contactos al cargar la página
mostrarContactos();


