/*
.carousel:hover{
    transform: translateX(-500px);
    transition: 1s;
}
*/

const frame = document.querySelector(".frame");
const carousel = document.querySelector(".carousel");
let i = 0;

function mover() {
    i++;
    if (i >= 4) {
        // Paso 1: quitar transición
        carousel.style.transition = "none";
        // Paso 2: saltar a la primera posición sin animación
        carousel.style.transform = "translateX(0px)";
        // Paso 3: forzar reflow
        carousel.offsetHeight; // esto hace que el navegador "pinte" el cambio
        // Paso 4: volver a la segunda imagen con transición activada
        carousel.style.transition = "transform 1s";
        i = 1; // porque vamos realmente a la segunda imagen
    }
    let valor = -500 * i;
    carousel.style.transform = `translateX(${valor}px)`;
}

window.addEventListener("click", mover);
