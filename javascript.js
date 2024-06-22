  // Llamar a la función para generar todas las tarjetas cuando el DOM esté cargado
  document.addEventListener('DOMContentLoaded', function(){

    generarTarjetas(bicicletas)
    updateRange();
    
});

const bicicletas = [
    {
      id: 0,
      modelo: 'Mountain Pro',
      img: '../images/bici-roja.jpg',
      color: 'Rojo',
      precio: '$770.000',
      genero: 'Hombre',
      descripcion: 'Bicicleta de montaña con suspensión avanzada para terrenos difíciles.'
    },
    {
      id: 1,
      modelo: 'City Cruiser',
      img: '../images/bici-azul.jpg',
      color: 'Azul',
      precio: '$274.990',
      genero: 'Mujer',
      descripcion: 'Bicicleta urbana perfecta para paseos cómodos por la ciudad.'
    },
    {
      id: 2,
      modelo: 'Road Master',
      img: '../images/bici-negro.jpg',
      color: 'Negro',
      precio: '$199.990',
      genero: 'Hombre',
      descripcion: 'Bicicleta de carretera ligera y aerodinámica para alta velocidad.'
    },
    {
      id: 3,
      modelo: 'Eco Friendly',
      img: '../images/bici-verde.jpg',
      color: 'Verde',
      precio: '$490.000',
      genero: 'Mujer',
      descripcion: 'Bicicleta eléctrica con asistencia al pedaleo, ideal para largas distancias.'
    },
    {
      id: 4,
      modelo: 'Speedster',
      img: '../images/bici-blanca.jpg',
      color: 'Blanco',
      precio: '$330.000',
      genero: 'Hombre',
      descripcion: 'Bicicleta de carreras con cuadro de carbono y componentes de alta gama.'
    },
    {
      id: 5,
      modelo: 'Comfort Ride',
      img: '../images/bici-amarilla.jpg',
      color: 'Amarillo',
      precio: '$690.000',
      genero: 'Mujer',
      descripcion: 'Bicicleta de paseo con asiento cómodo y cesta delantera.'
    }
  ];
  
// Función para generar el contenido de las tarjetas
function generarTarjetas(filtradas) {
    const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
    contenedorTarjetas.innerHTML = ''; // Limpiar cualquier contenido previo

    filtradas.forEach(bicicleta => {
        const tarjeta = `
            <div class="col-3 card card-bici mx-2 mb-2">
                <img src="${bicicleta.img}" class="card-img-top" alt="${bicicleta.modelo}">
                <div class="card-body">
                    <h5 class="card-title text-center">${bicicleta.modelo}</h5>
                    <p class="card-text">${bicicleta.descripcion}</p>
                </div>
                <div class="card-footer">
                    <div class="price-container">
                        <a class="btn btn-primary alargar">${bicicleta.precio}</a>
                        <button type="button" onclick="mostrarModal()" class="btn btn-primary mas">+</button>
                    
                    </div>
                    <button type="button" onclick="infoSegunId(${bicicleta.id})" class="btn btn-primary extender" data-bs-toggle="modal" data-bs-target="#exampleModal">Mas información</button>
                </div>
            </div>
        `;
        contenedorTarjetas.innerHTML += tarjeta;
    });
}

// Función para filtrar bicicletas según los checkboxes seleccionados
function filtrarBicicletas() {
    const coloresSeleccionados = Array.from(document.querySelectorAll('input[type=checkbox][id^="color"]:checked')).map(cb => cb.value);
    const generosSeleccionados = Array.from(document.querySelectorAll('input[type=checkbox][id^="genero"]:checked')).map(cb => cb.value);
    const minPrecio = parseInt(document.getElementById('rangeMin').value);
    const maxPrecio = parseInt(document.getElementById('rangeMax').value);

    const filtradas = bicicletas.filter(bicicleta => {
        const coincideColor = coloresSeleccionados.length === 0 || coloresSeleccionados.includes(bicicleta.color);
        const coincideGenero = generosSeleccionados.length === 0 || generosSeleccionados.includes(bicicleta.genero);
        const estaEnRangoPrecio = parseInt(bicicleta.precio.replace('$', '').replace('.', '')) >= minPrecio &&
                                  parseInt(bicicleta.precio.replace('$', '').replace('.', '')) <= maxPrecio;
        return coincideColor && coincideGenero && estaEnRangoPrecio;
    });

    generarTarjetas(filtradas);
}

// Función para manejar la búsqueda por modelo
function buscarBicicletaPorModelo() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

    if (searchTerm === '') {
        generarTarjetas(bicicletas);
        return;
    }

    const filtradas = bicicletas.filter(bicicleta => bicicleta.modelo.toLowerCase().includes(searchTerm));
    generarTarjetas(filtradas);
}

// Eventos
document.getElementById('searchButton').addEventListener('click', buscarBicicletaPorModelo);
document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        buscarBicicletaPorModelo();
    }
});

// Rango de precios
function updateRange() {
    var minVal = parseInt(document.getElementById('rangeMin').value);
    var maxVal = parseInt(document.getElementById('rangeMax').value);

    if (minVal > maxVal - 1) {
        if (event.target.id === 'rangeMin') {
            document.getElementById('rangeMin').value = maxVal - 1;
            minVal = maxVal - 1;
        } else {
            document.getElementById('rangeMax').value = minVal + 1;
            maxVal = minVal + 1;
        }
    }

    document.getElementById('minValue').textContent = '$' + minVal.toLocaleString();
    document.getElementById('maxValue').textContent = '$' + maxVal.toLocaleString();
}

// Evento para actualizar al mover los sliders
document.getElementById('rangeMin').addEventListener('input', updateRange);
document.getElementById('rangeMax').addEventListener('input', updateRange);

function limpiarFiltros() {
    // Desactivar todos los checkboxes de color
    document.querySelectorAll('input[type=checkbox][id^="color"]').forEach(cb => cb.checked = false);

    // Desactivar todos los checkboxes de género
    document.querySelectorAll('input[type=checkbox][id^="genero"]').forEach(cb => cb.checked = false);

    // Limpiar valores de rango de precio
    document.getElementById('rangeMin').value = 0;
    document.getElementById('rangeMax').value = 1000000;

    // Filtrar bicicletas (si es necesario)
    const coloresSeleccionados = [];
    const generosSeleccionados = [];
    const minPrecio = NaN; // No se utilizarán para filtrar ya que se han desactivado
    const maxPrecio = NaN; // No se utilizarán para filtrar ya que se han desactivado
    
    document.getElementById("minValue").textContent="$0";
    document.getElementById("maxValue").textContent="$1.000.000";

    const filtradas = bicicletas.filter(bicicleta => {
        const coincideColor = coloresSeleccionados.length === 0 || coloresSeleccionados.includes(bicicleta.color);
        const coincideGenero = generosSeleccionados.length === 0 || generosSeleccionados.includes(bicicleta.genero);
        const estaEnRangoPrecio = true; // Siempre verdadero porque no estamos filtrando por precio
        return coincideColor && coincideGenero && estaEnRangoPrecio;

    });
    filtrarBicicletas();

    // Aquí puedes agregar código para actualizar la UI con las bicicletas filtradas si es necesario
}



function mostrarModal(){

    const contenedor = document.getElementById("mostrarModal")
    contenedor.innerHTML='';
    const informacion = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                
                <!--CCARRUSEL-->

                <div id="carouselExampleIndicators" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../images/bici-roja.jpg" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../images/plano_detalle_1.jpg" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../images/plano_detalle_2.jpg" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../images/plano_detalle_3.jpg" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../images/plano_detalle_4.jpg" class="d-block w-100" alt="...">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                    </button>
                </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
            </div>
        </div>`
    contenedor.innerHTML += informacion;
}

function modalito(){
    const contenedorModelo = document.getElementById("modalito")
    contenedorModelo.innerHTML = '';

}

function infoSegunId(thisId){

    const contenedorModelo = document.getElementById("biciModelo");
    contenedorModelo.innerHTML = '';
    const contenedorImagen = document.getElementById("imagenBici")
    contenedorImagen.innerHTML='';
    const contenedorDescripcion= document.getElementById("descripcionBici");
    contenedorDescripcion.innerHTML='';
    const contenedorPrecio= document.getElementById("precioBici");
    contenedorPrecio.innerText='';



    let modelo = '';
    let precio = '';
    let descripcion = '';
    let color = '';
    let genero = '';
    let imagen = '';

    for (let index = 0; index < bicicletas.length; index++) {
        if (bicicletas[index].id == thisId){
            modelo = bicicletas[index].modelo;
            precio = bicicletas[index].precio;
            descripcion = bicicletas[index].descripcion;
            color = bicicletas[index].color;
            genero = bicicletas[index].genero;
            imagen = bicicletas[index].img;
            break;

        }
    }

    contenedorModelo.innerHTML = `<h1 class="modal-title fs-5" id="exampleModalLabel">${modelo}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`
    
    contenedorImagen.innerHTML = `<img src="${imagen}" class="d-block w-100" alt="...">`

    contenedorDescripcion.innerHTML = `<h4>${descripcion}</h4>`;

    contenedorPrecio.innerHTML = `<h1>${precio}</h1>`
}