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