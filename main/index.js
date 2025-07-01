document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica del Menú Hamburguesa para Móvil ---
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

// --- Lógica del Efecto Hover en Imágenes (VERSIÓN MEJORADA CON CSS) ---
const productImageContainers = document.querySelectorAll('.product-image-container');

productImageContainers.forEach(container => {
    const img = container.querySelector('.product-image');
    const hoverSrc = img.dataset.hover;

    if (hoverSrc) {
        // Establecemos la imagen de hover como un fondo en el pseudo-elemento ::before
        container.style.setProperty('--hover-image', `url(${hoverSrc})`);

        // Necesitamos añadir la regla CSS dinámicamente ya que no podemos
        // seleccionar ::before directamente en JS.
        // Lo hacemos asignando la URL a una variable CSS (--hover-image).
    }
});
    // --- NUEVO: Lógica Condicional para el Carrusel ---

    const track = document.getElementById('carouselTrack');
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    let carouselInitialized = false;

    // Función que INICIA el carrusel
    const initCarousel = () => {
        if (carouselInitialized) return; // Si ya está iniciado, no hagas nada

        const cards = Array.from(track.children);
        let cardWidth = cards.length > 0 ? cards[0].getBoundingClientRect().width : 0;
        let gap = 20;
        let currentIndex = 0;

        const moveToCard = (targetIndex) => {
            const amountToMove = (cardWidth + gap) * targetIndex;
            track.style.transform = `translateX(-${amountToMove}px)`;
            currentIndex = targetIndex;
            updateArrows();
        };

        const updateArrows = () => {
            if (!prevButton || !nextButton) return;
            prevButton.disabled = currentIndex === 0;
            
            const trackContainerWidth = track.parentElement.offsetWidth;
            const visibleCards = Math.floor(trackContainerWidth / (cardWidth + gap));
            
            nextButton.disabled = currentIndex >= cards.length - visibleCards;
        };
        
        // Asignamos los eventos a los botones
        nextButton.addEventListener('click', () => moveToCard(currentIndex + 1));
        prevButton.addEventListener('click', () => moveToCard(currentIndex - 1));

        // Listener para reajustar en caso de cambio de tamaño EN MODO CARRUSEL
        window.addEventListener('resize', () => {
             // Solo recalcula si seguimos en modo carrusel
            if (window.matchMedia("(max-width: 1024px)").matches) {
                cardWidth = cards[0].getBoundingClientRect().width;
                moveToCard(currentIndex);
            }
        });

        updateArrows();
        carouselInitialized = true;
        console.log("Carrusel Inicializado");
    };
    
    // Función que DESACTIVA el carrusel (resetea estilos)
    const destroyCarousel = () => {
        track.style.transform = 'none'; // Resetea la posición del track
        // No necesitamos quitar los event listeners porque estarán dentro del scope de initCarousel
        // y el garbage collector eventualmente los limpiará.
        // Además, como las flechas están ocultas con CSS, no se pueden clickear.
        carouselInitialized = false;
        console.log("Carrusel Destruido");
    };

    // --- El Controlador Principal ---
    const handleCarousel = () => {
        // Comprueba si la pantalla es "pequeña" (<= 1024px)
        if (window.matchMedia("(max-width: 1024px)").matches) {
            initCarousel();
        } else {
            destroyCarousel();
        }
    };
    
    // Ejecuta el controlador al cargar la página
    handleCarousel();
    
    // Y también cada vez que la ventana cambie de tamaño
    window.addEventListener('resize', handleCarousel);

});