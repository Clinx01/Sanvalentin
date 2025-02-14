document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar elementos del DOM
    const envoltura = document.querySelector(".envoltura-sobre");
    const carta = document.querySelector(".carta");
    const modalSi = document.getElementById("modalSi");
    const modalNo = document.getElementById("modalNo");
    const btnSi = document.getElementById("btnSi");
    const btnNo = document.getElementById("btnNo");
    const closeButtons = document.querySelectorAll(".close");
    const contadorBesos = document.getElementById("contadorBesos");

    // Inicializar el contador
    let contador = 0;

    // Función para actualizar el mensaje en el modal "SI"
    function actualizarMensaje() {
        contadorBesos.textContent = contador;
    }

    // Función para crear la lluvia de corazones
    function crearLluviaDeCorazones() {
        const numCorazones = 250; // Número de corazones a crear

        for (let i = 0; i < numCorazones; i++) {
            const corazon = document.createElement("div");
            corazon.innerHTML = "❤️"; // Emoji de corazón
            corazon.classList.add("corazon-lluvia");

            // Posición horizontal aleatoria
            corazon.style.left = Math.random() * 100 + "vw";

            // Retraso aleatorio para que no caigan todos al mismo tiempo
            corazon.style.animationDelay = Math.random() * 5 + "s";

            // Tamaño aleatorio
            const tamaño = Math.random() * 20 + 10; // Entre 10px y 30px
            corazon.style.fontSize = tamaño + "px";

            // Agregar el corazón al cuerpo del documento
            document.body.appendChild(corazon);

            // Eliminar el corazón después de que termine la animación
            setTimeout(() => {
                corazon.remove();
            }, 5000); // 5 segundos (duración de la animación)
        }
    }

    // Abrir modal "SI", aumentar el contador y activar la lluvia de corazones
    btnSi.addEventListener("click", function () {
        contador++; // Aumentar el contador
        actualizarMensaje(); // Actualizar el mensaje
        modalSi.style.display = "flex"; // Mostrar el modal
        crearLluviaDeCorazones(); // Activar la lluvia de corazones
    });

    // Abrir modal "NO" y disminuir el contador (si es mayor que 0)
    btnNo.addEventListener("click", function () {
        if (contador > 0) {
            contador--; // Disminuir el contador
            actualizarMensaje(); // Actualizar el mensaje
        }
        modalNo.style.display = "flex"; // Mostrar el modal
    });

    // Cerrar modales al hacer clic en la "X"
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            modalSi.style.display = "none";
            modalNo.style.display = "none";

            // Eliminar todos los corazones
            const corazones = document.querySelectorAll(".corazon-lluvia");
            corazones.forEach(corazon => corazon.remove());
        });
    });

    // Cerrar modales al hacer clic fuera del contenido
    window.addEventListener("click", function (e) {
        if (e.target === modalSi) {
            modalSi.style.display = "none";

            // Eliminar todos los corazones
            const corazones = document.querySelectorAll(".corazon-lluvia");
            corazones.forEach(corazon => corazon.remove());
        }
        if (e.target === modalNo) {
            modalNo.style.display = "none";
        }
    });

    // Lógica para abrir y cerrar el sobre y la carta
    document.addEventListener("click", (e) => {
        if (e.target.matches(".sobre") ||
            e.target.matches(".solapa-derecha") ||
            e.target.matches(".solapa-izquierda") ||
            e.target.matches(".corazon")) {
            envoltura.classList.toggle("abierto");
        } else if (e.target.matches(".sobre *")) {
            if (!carta.classList.contains("abierta")) {
                carta.classList.add("mostrar-carta");

                setTimeout(() => {
                    carta.classList.remove("mostrar-carta");
                    carta.classList.add("abierta");
                }, 500);
                envoltura.classList.add("desactivar-sobre");
            } else {
                carta.classList.add("cerrando-carta");
                envoltura.classList.remove("desactivar-sobre");

                setTimeout(() => {
                    carta.classList.remove("cerrando-carta");
                    carta.classList.remove("abierta");
                }, 500);
            }
        }
    });
});