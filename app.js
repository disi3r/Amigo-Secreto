// Variables globales
let listaNombres = []; // Array para almacenar los nombres ingresados

// Función para añadir un nombre a la lista
function agregarAmigo() {
    // Obtener el valor del input donde el usuario ingresa el nombre
    let inputNombre = document.getElementById("amigo").value.trim();

    // Validar que el nombre no esté vacío
    if (inputNombre === "") {
        alert("Por favor, digite un nombre válido.");
        return;
    }

    // Verificar si el nombre ya fue añadido
    if (listaNombres.includes(inputNombre)) {
        alert("Este nombre ya ha sido añadido. Por favor, ingrese otro.");
        return;
    }

    // Añadir el nombre al array
    listaNombres.push(inputNombre);

    // Limpiar el input después de añadir el nombre
    document.getElementById("amigo").value = "";

    // Actualizar la lista visible en la página
    actualizarLista();
}

// Función para actualizar la lista visible en la página
function actualizarLista() {
    let listaHTML = document.getElementById("listaAmigos");
    listaHTML.innerHTML = ""; // Limpiar la lista actual

    // Recorrer el array y mostrar cada nombre en la lista
    listaNombres.forEach((nombre) => {
        let li = document.createElement("li");
        li.textContent = nombre;
        listaHTML.appendChild(li);
    });
}

// Función para realizar el sorteo de Amigo Secreto
function sortearAmigo() {
    // Validar que haya al menos 2 nombres para realizar el sorteo
    if (listaNombres.length < 2) {
        alert("Debe haber al menos 2 nombres en la lista para realizar el sorteo.");
        return;
    }

    // Crear una copia del array original para evitar modificarlo directamente
    let listaCopia = [...listaNombres];

    // Crear un objeto para almacenar las parejas de Amigo Secreto
    let sorteos = {};

    // Iterar sobre cada nombre en la lista original
    listaNombres.forEach((nombre) => {
        // Elegir un nombre aleatorio de la copia
        let indiceAleatorio = Math.floor(Math.random() * listaCopia.length);
        let amigoSecreto = listaCopia[indiceAleatorio];

        // Validar que el nombre seleccionado no sea igual al nombre actual
        while (amigoSecreto === nombre) {
            indiceAleatorio = Math.floor(Math.random() * listaCopia.length);
            amigoSecreto = listaCopia[indiceAleatorio];
        }

        // Asignar el amigo secreto al nombre actual
        sorteos[nombre] = amigoSecreto;

        // Eliminar el nombre asignado de la copia para evitar repeticiones
        listaCopia.splice(indiceAleatorio, 1);
    });

    // Mostrar los resultados del sorteo
    mostrarResultados(sorteos);
}

// Función para mostrar los resultados del sorteo
function mostrarResultados(sorteos) {
    let resultadoHTML = document.getElementById("resultado");
    resultadoHTML.innerHTML = ""; // Limpiar resultados anteriores

    // Construir la lista de resultados
    for (let nombre in sorteos) {
        let li = document.createElement("li");
        li.textContent = `${nombre} -> ${sorteos[nombre]}`;
        resultadoHTML.appendChild(li);
    }
}