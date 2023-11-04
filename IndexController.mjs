console.log("El archivo IndexController.js se está ejecutando.");
import {endpoint} from './config.mjs';

function callAPI(operation, name, surname, id_delete){
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  const data = {
    operation: operation,
    name: name,
    surname: surname,
    id_delete: id_delete // Asigna un valor a id_delete
  };
//using built in JSON utility package turn object to string and store in a variable
var bodyJson = JSON.stringify({
  "operation" : "insert",
  "data": {
      "name": name,
      "surname": surname
      //"id_delete": id_delete
  }
});
//create a JSON object with parameters for API call and store in a variable
var requestOptions = {
  method: 'POST',
  headers: headers,
  body: bodyJson,
  redirect: 'follow'
};
console.log('endpoint: ' + endpoint);
console.log(JSON.stringify(requestOptions));

// Realizar la llamada a la API con las opciones de solicitud y usar promesas para obtener la respuesta
fetch(endpoint, requestOptions)
.then(response => response.text())
.then(result => {
  console.log('Respuesta:', result);

  try {
    const data = JSON.parse(result);

    if (data.message && data.message.Items) {
      // Procede con el procesamiento de los elementos
      const items = data.message.Items;
      var lineHTML = "<ul>";
      items.forEach(function(element) {
        lineHTML += '<li>Id: ' + element.id + ', Name: ' + element.name + ', Surname: ' + element.surname + '</li>';
      });
      lineHTML += '</ul>';
      document.getElementById('items').innerHTML = lineHTML;
    } else {
      // Maneja la respuesta inesperada
      console.log('La respuesta no contiene los datos esperados.');
    }
  } catch (error) {
    // Maneja errores al analizar la respuesta JSON
    console.log('Error al analizar la respuesta JSON:', error);
  }
})
.catch(error => {
  console.log('Error:', error);
  document.getElementById('response').innerHTML = '<h6>' + error + '</h6>';
});

}

function agregarContacto() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;

  if (nombre.trim() !== "" && apellido.trim() !== "") {
      // Generar un ID único para el nuevo contacto (puedes utilizar una función más robusta en una aplicación real)
      const nuevoID = `${nombre}-${apellido}`;

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
      callAPI('agregar', nuevoContacto.nombre, nuevoContacto.apellido);

      mostrarContactos();
    } else {
      alert("Por favor, completa los campos de nombre y apellido.");
  }
}
// Asociar la función de agregar contacto al botón "Agregar Contacto"
document.getElementById("agregarContacto").addEventListener("click", agregarContacto);

// Función para borrar un contacto por ID
function borrarContacto(id) {
  contactos = contactos.filter((contacto) => contacto.id !== id);
  mostrarContactos();
  // Puedes eliminar el contacto de la base de datos o el almacenamiento local aquí
}

function mostrarContactos() {
  const listaContactos = document.getElementById("listaContactos");

  // Verifica si hay contactos
  if (contactos.length === 0) {
      // Si no hay contactos, no cambies el contenido del elemento
      return;
  }

  // Itera a través de tus contactos y crea elementos para cada uno
  contactos.forEach((contacto) => {
      const li = document.createElement("li");
      li.innerHTML = `
          ID: ${contacto.id}<br>
          Nombre: ${contacto.nombre}<br>
          Apellido: ${contacto.apellido}<br>
          <button onclick="borrarContacto('${contacto.id}')">Borrar</button>
          <hr>
      `;

      // Agrega el nuevo elemento a la lista
      listaContactos.appendChild(li);
  });
}





