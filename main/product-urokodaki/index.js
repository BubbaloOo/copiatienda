document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica del Menú Hamburguesa para Móvil ---
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });});
    
    document.addEventListener('DOMContentLoaded', () => { 

    // --- Lógica del Menú Hamburguesa para Móvil (Tu código original) --- 
    const hamburger = document.getElementById('hamburger-menu'); 
    const nav = document.getElementById('main-nav'); 

    hamburger.addEventListener('click', () => { 
        nav.classList.toggle('active'); 
    });

    // --- INICIO: NUEVA LÓGICA PARA EL CARRUSEL DE IMÁGENES ---

    // 1. Seleccionar todos los elementos necesarios del carrusel
    const imagenGrande = document.getElementById('imagen-grande');
    const miniaturas = document.querySelectorAll('.miniatura');
    const puntos = document.querySelectorAll('.punto');

    // 2. Crear una función para cambiar la imagen y actualizar los indicadores
    const cambiarImagenActiva = (indice) => {
        // Validar que el índice exista para evitar errores
        if (!miniaturas[indice] || !puntos[indice]) {
            console.error("El índice de la imagen o del punto no existe:", indice);
            return;
        }

        // Cambiar la imagen principal
        const nuevaImagenSrc = miniaturas[indice].getAttribute('data-grande');
        imagenGrande.src = nuevaImagenSrc;

        // Actualizar la clase activa en las miniaturas
        miniaturas.forEach((miniatura, i) => {
            if (i === indice) {
                miniatura.classList.add('miniatura-activa');
            } else {
                miniatura.classList.remove('miniatura-activa');
            }
        });

        // Actualizar la clase activa en los puntos de navegación
        puntos.forEach((punto, i) => {
            if (i === indice) {
                punto.classList.add('punto-activo');
            } else {
                punto.classList.remove('punto-activo');
            }
        });
    };

    // 3. Añadir eventos 'click' a cada miniatura
    miniaturas.forEach((miniatura, indice) => {
        miniatura.addEventListener('click', () => {
            cambiarImagenActiva(indice);
        });
    });

    // 4. Añadir eventos 'click' a cada punto de navegación
    puntos.forEach((punto, indice) => {
        punto.addEventListener('click', () => {
            cambiarImagenActiva(indice);
        });
    });

    // --- FIN DE LA LÓGICA DEL CARRUSEL ---
});

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica del Menú Hamburguesa para Móvil ---
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });});
    document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const imagenPrincipalContenedor = document.querySelector('.imagen-principal');
    const imagenGrande = document.getElementById('imagen-grande');
    const miniaturas = document.querySelectorAll('.miniatura');
    const galeriaContenedor = document.querySelector('.galeria-producto');

    // Array con las URLs de las imágenes grandes
    const sourcesImagenesGrandes = Array.from(miniaturas).map(min => min.dataset.grande);
    let indiceActual = 0;
    let carruselActivo = false;

    // --- CREACIÓN DINÁMICA DE LOS CONTROLES DEL CARRUSEL ---
    // No tocamos el HTML, los creamos y añadimos con JS.

    // Botón Anterior
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&#10094;'; // Flecha izquierda
    prevBtn.id = 'prev-btn';
    prevBtn.classList.add('carousel-btn');
    imagenPrincipalContenedor.appendChild(prevBtn);

    // Botón Siguiente
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&#10095;'; // Flecha derecha
    nextBtn.id = 'next-btn';
    nextBtn.classList.add('carousel-btn');
    imagenPrincipalContenedor.appendChild(nextBtn);

    // Contador de imágenes
    const contador = document.createElement('div');
    contador.id = 'contador-carrusel';
    contador.classList.add('carousel-contador');
    imagenPrincipalContenedor.appendChild(contador);


    // --- FUNCIONES DEL CARRUSEL ---

    function actualizarCarrusel() {
        // Cambiar la imagen principal
        imagenGrande.src = sourcesImagenesGrandes[indiceActual];
        // Actualizar el contador
        contador.textContent = `${indiceActual + 1} / ${sourcesImagenesGrandes.length}`;
        // Actualizar la miniatura activa (para la vista de escritorio)
        actualizarMiniaturaActiva();
    }

    function mostrarSiguiente() {
        indiceActual = (indiceActual + 1) % sourcesImagenesGrandes.length;
        actualizarCarrusel();
    }

    function mostrarAnterior() {
        indiceActual = (indiceActual - 1 + sourcesImagenesGrandes.length) % sourcesImagenesGrandes.length;
        actualizarCarrusel();
    }

    function actualizarMiniaturaActiva() {
        miniaturas.forEach((min, index) => {
            if (index === indiceActual) {
                min.classList.add('miniatura-activa');
            } else {
                min.classList.remove('miniatura-activa');
            }
        });
    }


    // --- LÓGICA RESPONSIVE ---

    const mediaQuery = window.matchMedia('(max-width: 1090px)');

    function manejarCambioDePantalla(e) {
        if (e.matches) {
            // PANTALLA PEQUEÑA (< 1090px): Activar Carrusel
            carruselActivo = true;
            galeriaContenedor.classList.add('carrusel-activo');

            // Añadir eventos a los botones
            nextBtn.addEventListener('click', mostrarSiguiente);
            prevBtn.addEventListener('click', mostrarAnterior);

            // Aseguramos que el estado inicial es correcto
            actualizarCarrusel();

        } else {
            // PANTALLA GRANDE (> 1090px): Desactivar Carrusel
            carruselActivo = false;
            galeriaContenedor.classList.remove('carrusel-activo');

            // Quitar eventos para evitar duplicados si se redimensiona varias veces
            nextBtn.removeEventListener('click', mostrarSiguiente);
            prevBtn.removeEventListener('click', mostrarAnterior);
        }
    }

    // --- INICIALIZACIÓN Y EVENTOS ---

    // Evento para cuando un usuario hace clic en una miniatura (funciona en escritorio)
    miniaturas.forEach((miniatura, index) => {
        miniatura.addEventListener('click', () => {
            if (!carruselActivo) { // Solo funciona si el carrusel NO está activo
                indiceActual = index;
                actualizarCarrusel();
            }
        });
    });

    // Llama a la función una vez para establecer el estado inicial al cargar la página
    manejarCambioDePantalla(mediaQuery);

    // Y añade un listener para que reaccione si el usuario redimensiona la ventana
    mediaQuery.addEventListener('change', manejarCambioDePantalla);

    // Inicializa la galería
    actualizarCarrusel();
});

const btn = document.getElementById('toggle-btn');
const content = document.querySelector('.history-content');

btn.addEventListener('click', () => {
  content.classList.toggle('collapsed');
  btn.textContent = content.classList.contains('collapsed')
    ? 'See short story'
    : 'Hide Story';
});
