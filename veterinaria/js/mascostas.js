const listaMascotas = document.getElementById('lista-mascotas');
const nombre = document.getElementById('tipo');
const tipo = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const guardar = document.getElementById('btn-guardar');

let mascotas = [
    {
        tipo: "Gato",
        nombre: "Manchas",
        dueno: "Esteban"
    },
    {
        tipo: "Perro",
        nombre: "Manchasadfsads",
        dueno: "Estebaasn"
    }
];

function listarMasctoras() {
    const htmlMascotas = mascotas.map((mascotas, index) => `<tr>
    <th scope="row">${index}</th>
        <td>${mascotas.tipo}</td>
        <td>${mascotas.nombre}</td>
        <td>${mascotas.dueno}</td>
        <td>
        <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="fa fa-trash"></i></button>
        </td>
    </tr>
    `).join("");
    listaMascotas.innerHTML = htmlMascotas;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=> {
    botonEditar.onclick = editar(index)
   });
   Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=> {
    botonEliminar.onclick = eliminar(index);
   })
}

function enviarDatos(e){
    e.preventDefault();
    const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueno: dueno.value
    };
    const accion = guardar.innerHTML;
    switch(accion) {
        case 'Editar':
            mascotas[indice.value] = datos;
            break;
        default:
            mascotas.push(datos);
            break;
    }
    listarMasctoras();
    resetModal();
}

function editar(index){
    return function handler(){
        guardar.innerHTML = 'Editar';
        const mascota = mascotas[index];
        nombre.value = mascota.nombre;
        dueno.value = mascota.dueno;
        tipo.value = mascota.tipo;
        indice.value = index;
    }
}

function resetModal() {
    nombre.value = '';
    dueno.value = '';
    tipo.value = '';
    indice.value = '';
    guardar.innerHTML = 'Crear';
}

function eliminar(index) {
    return function clickEliminar() {
        console.log('index', index)
        mascotas = mascotas.filter((mascota, indiceMascota) => indiceMascota !== index);
        listarMasctoras();
    }
}
    

listarMasctoras();
form.onsubmit = enviarDatos;
guardar.onclick = enviarDatos;