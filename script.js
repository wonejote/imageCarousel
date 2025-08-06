const frame = document.querySelector(".frame");
const carousel = document.querySelector(".carousel");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");



function mover() {
    
    const total = 5; 
    carousel.addEventListener("transitionend", () => {
        if (i === total - 1 || i >= total) {
            carousel.style.transition = "none"; // sin animación
            i = 0; // saltamos a la imagen real 1
            carousel.style.transform = `translateX(0px)`;
            carousel.offsetHeight; // forzar reflow
            carousel.style.transition = "transform 1s"; // restaurar animación
        }
    });

    return function moverAux() {
        i++;
        let valor = -500 * i;
        carousel.style.transform = `translateX(${valor}px)`;
    };
}
let i = 0;
function moverManual(dir) {
    const total = 6; // 4 imágenes reales + 2 clones

    // añadir el listener de transición una sola vez
    if (!carousel._listenerAdded) {
        carousel._listenerAdded = true;

        carousel.addEventListener('transitionend', () => {
            // liberar bloqueo al terminar cualquier transición
            carousel._isAnimating = false;

            // si llegamos a la copia final (último índice), saltar a la primera real (índice 1)
            if (i === total - 1) {
                carousel.style.transition = 'none';
                i = 1;
                carousel.style.transform = `translateX(${-500 * i}px)`;
                carousel.offsetHeight; // forzar reflow
                carousel.style.transition = 'transform 1s';
            }

            // si llegamos a la copia inicial (índice 0), saltar al último slide real (total-2)
            if (i === 0) {
                carousel.style.transition = 'none';
                i = total - 2;
                carousel.style.transform = `translateX(${-500 * i}px)`;
                carousel.offsetHeight; // forzar reflow
                carousel.style.transition = 'transform 1s';
            }
        });
    }

    return function moverAux() {
        // evitar llamadas concurrentes mientras hay animación en curso
        if (carousel._isAnimating) return;

        // marcar que iniciamos una animación
        carousel._isAnimating = true;

        // actualizar índice según la dirección
        i += (dir === 1 ? 1 : -1);

        // seguridad mínima: evitar índices absurdos antes de aplicar transform
        if (i < 0) i = 0;
        if (i > total - 1) i = total - 1;
        

        // aplicar movimiento (la transición debe estar definida en CSS)
        let valor = -500 * i;
        console.log(valor);
        carousel.style.transform = `translateX(${valor}px)`;
        iluminarPunto(valor);
    };
}

function iluminarPunto(valor) {
    // limpiar todos primero
    document.getElementById('uno').style.color = '';
    document.getElementById('dos').style.color = '';
    document.getElementById('tres').style.color = '';
    document.getElementById('cuatro').style.color = '';

    // encender solo el que corresponde
    switch (valor) {
        case 0:
            document.getElementById('uno').style.color = 'red';
            break;
        case -500:
            document.getElementById('dos').style.color = 'red';
            break;
        case -1000:
            document.getElementById('tres').style.color = 'red';
            break;
        case -1500:
            document.getElementById('cuatro').style.color = 'red';
            break;
        case -2000:
            document.getElementById('uno').style.color = 'red';
            break;
        case -2500:
            document.getElementById('dos').style.color = 'red';
            break;
        default:
            // opcional: no hacer nada si i no está en 1..4
            break;
    }
}

next.addEventListener("click",moverManual(1));
prev.addEventListener("click",moverManual(-1));

//setInterval(mover(), 5000);
