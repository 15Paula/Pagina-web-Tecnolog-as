document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("cookieOverlay");
    
    // Si no existe el elemento en esta página, no hacemos nada
    if (!overlay) return;

    const btnAceptar = document.getElementById("btnAceptar");
    const btnRechazar = document.getElementById("btnRechazar");

    // 1. Verificar si ya existe una decisión guardada
    const decision = localStorage.getItem("cookiesAccepted");

    // 2. Si NO hay decisión, mostramos el bloqueo
    if (!decision) {
        overlay.style.display = "flex";          
        document.body.style.overflow = "hidden"; // Bloquea el scroll
    } else {
        overlay.style.display = "none";          
        document.body.style.overflow = "auto";   
    }

    // Función para guardar la decisión y desbloquear la pantalla
    const cerrarOverlay = (valor) => {
        localStorage.setItem("cookiesAccepted", valor);
        
        // Efecto de desvanecimiento
        overlay.style.opacity = "0";
        
        setTimeout(() => {
            overlay.style.display = "none";
            document.body.style.overflow = "auto"; // Reactiva el scroll
        }, 300);
    };

    // 3. Asignar eventos a los botones
    if (btnAceptar) {
        btnAceptar.addEventListener("click", () => cerrarOverlay("true"));
    }
    
    if (btnRechazar) {
        btnRechazar.addEventListener("click", () => cerrarOverlay("false"));
    }
});